import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Quebec Driving Test Practice | Prepare for the SAAQ Exam',
  description: 'Prepare for the SAAQ test with the Quebec Driving Test Practice app. Practice real questions, track your progress, and pass the exam on your first try!',
  keywords: ['Quebec Driving Test Practice', 'SAAQ', 'test', 'exam', 'preparation', 'Quebec', 'driver license', 'mobile app'],
  authors: [{ name: 'Your name or company name' }],
  openGraph: {
    title: 'Quebec Driving Test Practice | Your Path to Successfully Passing the SAAQ Exam',
    description: 'Prepare for the SAAQ test with the Quebec Driving Test Practice app. Over 1,000 questions, practice mode, and exam simulation.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Quebec Driving Test Practice App Preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quebec Driving Test Practice | Prepare for the SAAQ Exam',
    description: 'Get ready for the SAAQ test with the Quebec Driving Test Practice app. Pass the exam on your first try!',
    images: ['/images/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
