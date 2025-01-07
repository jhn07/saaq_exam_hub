"use server";

import { State } from "@/types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

// Secure the spam
const isSpamDetected = (message: string, email: string, name: string): boolean => {
  const normalizedMessage = message.toLowerCase();
  const normalizedEmail = email.toLowerCase();
  const normalizedName = name.toLowerCase();

  const contentPatterns = [
    /\b(viagra|casino|lottery|prize|winner|crypto|bitcoin|invest|loan|urgent|money)\b/i,
    /\b(act now|limited time|exclusive offer|best price|discount|free|guaranteed)\b/i,
    /\b(payment|bank|account|credit card|cash|money transfer)\b/i,
    /[!?]{2,}/,
    /[A-Z]{3,}/,
  ];

  const urlPatterns = [
    /(http|https|ftp):\/\/[^\s]+/i,
    /\[url[^\]]*\]/i,
    /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  ];

  const repeatingCharsPattern = /(.)\1{4,}/;

  let spamScore = 0;

  // Content patterns check
  contentPatterns.forEach(pattern => {
    if (pattern.test(normalizedMessage)) {
      spamScore += 1;
    }
  });

  // URL patterns check (increased weight)
  urlPatterns.forEach(pattern => {
    if (pattern.test(normalizedMessage)) {
      spamScore += 2;
    }
  });

  // Repeating characters check
  if (repeatingCharsPattern.test(message)) {
    spamScore += 1;
  }

  // Message length check
  if (message.length < 10 || message.length > 1000) {
    spamScore += 1;
  }

  // Word/character ratio check
  const words = message.split(/\s+/).length;
  const chars = message.length;
  if (chars / words > 15) {
    spamScore += 1;
  }

  // Word uniqueness check
  const uniqueWords = new Set(normalizedMessage.split(/\s+/));
  if (uniqueWords.size / words < 0.5) {
    spamScore += 1;
  }

  // Email pattern check
  const suspiciousEmailPatterns = [
    /\d{4,}/,
    /[a-zA-Z0-9]{10,}@/
  ];

  suspiciousEmailPatterns.forEach(pattern => {
    if (pattern.test(normalizedEmail)) {
      spamScore += 1;
    }
  });

  // Name check
  if (name.length < 3 || /\d/.test(name)) {
    spamScore += 1;
  }


  return spamScore >= 3;
};

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (state: State, formData: FormData): Promise<State> => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!email || !name || !message) {
      return { success: false, error: "All fields are required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    if (isSpamDetected(message, email, name)) {
      // Log the spam message
      console.warn("Spam detected: ", { name, email, message });
      return { success: false, error: "Spam detected" };
    }

    const { error } = await resend.emails.send({
      from: `Quebec Driving Test <onboarding@resend.dev>`,
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: `New message from: ${name}`,
      react: EmailTemplate({ name, message, email }) as React.ReactNode
    })

    if (error) {
      console.error("Error sending email: ", error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };

  } catch (error) {
    console.error("Unexpected error: ", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};