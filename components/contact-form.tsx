"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/actions/send-email";
import { SubmitButton } from "@/components/submit-button";
import { State } from "@/types";



export const ContactForm = () => {
  const [state, formAction] = useActionState<State, FormData>(sendEmail, {
    success: false,
    error: null,
  });
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      if (formRef.current) {
        formRef.current.reset();
      }
      setShowMessage(true);
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [state.success]);

  useEffect(() => {
    if (state.error) {
      setShowMessage(true);
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [state.error]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <Input type="text"
        placeholder="Name"
        name="name"
        required
      />
      <Input type="email"
        placeholder="Email"
        name="email"
        required
      />
      <Textarea
        className="min-h-[120px]"
        placeholder="Message"
        name="message"
        required
      />
      <div className="flex justify-center">
        <SubmitButton />
      </div>
      {showMessage && (
        <div className="flex flex-col items-center">
          {state.success && <p className="text-green-500">✅ Message sent successfully</p>}
          {state.error && <p className="text-red-500">❌ {state.error}</p>}
        </div>
      )}
    </form>
  )
}