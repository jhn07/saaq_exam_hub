"use client"

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { Header } from "@/components/header";
import { CustomCard } from "@/components/custom-card";
import { FAQItem } from "@/components/faq-item";
import { ReviewItem } from "@/components/review-item";
import { ContactForm } from "@/components/contact-form";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon, MailIcon, FacebookIcon, InstagramIcon, YoutubeIcon, TwitterIcon } from 'lucide-react';

import { faqData } from "@/lib/faq-data";
import { userReviews } from "@/lib/user-reviews";
import { featuresData } from "@/lib/features-data";
import { cn } from "@/lib/utils";
import { ColorType } from "@/types";
import { DownloadButton } from "@/components/download-button";



const ScrollDownButton = ({ targetId }: { targetId: string }) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      aria-label="Scroll to next section"
    >
      <ChevronDownIcon className="w-10 h-10 text-gray-600" />
    </button>
  );
};

export default function Home() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      sectionsRef.current.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          } else {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Main Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Welcome to the</h1>
          <h2 className="text-4xl font-bold text-yellow-500 mb-4">
            Quebec Driving Test Practice App
          </h2>
          <p className="text-lg text-gray-600 mb-8">Practice your driving skills with our comprehensive test preparation app.</p>
          <DownloadButton className="w-64 h-14 text-lg" />
        </div>

        {/* Screenshots */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
          <div className="relative aspect-[330/717] w-full max-w-[330px] mx-auto hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-500/50 hover:rounded-2xl hover:cursor-pointer">
            <Image
              src="/images/Screenshot-1.png"
              alt="Choose your difficulty level"
              fill
              className="rounded-2xl shadow-xl object-contain"
            />
          </div>
          <div className="relative aspect-[330/717] w-full max-w-[330px] mx-auto hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-500/50 hover:rounded-2xl hover:cursor-pointer">
            <Image
              src="/images/Screenshot-2.png"
              alt="400+ updated driving tests"
              fill
              className="rounded-2xl shadow-xl object-contain"
            />
          </div>
          <div className="relative aspect-[330/717] w-full max-w-[330px] mx-auto hidden lg:block hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-500/50 hover:rounded-2xl hover:cursor-pointer">
            <Image
              src="/images/Screenshot-3.png"
              alt="Real exam experience"
              fill
              className="rounded-2xl shadow-xl object-contain"
            />
          </div>
          <div className="relative aspect-[330/717] w-full max-w-[330px] mx-auto hidden lg:block hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-500/50 hover:rounded-2xl hover:cursor-pointer">
            <Image
              src="/images/Screenshot-4.png"
              alt="Track your progress"
              fill
              className="rounded-2xl shadow-xl object-contain"
            />
          </div>
        </div>

      </section>

      {/* Features Section - done */}
      <section id="features" ref={setRef(1)} className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Question Bank */}
            {featuresData.map((feature) => (
              <CustomCard key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon as React.ElementType}
                color={feature.color as ColorType} />
            ))}
          </div>
        </div>
        <ScrollDownButton targetId="reviews" />
      </section>

      {/* Reviews Section - done */}
      <section id="reviews" ref={setRef(2)} className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out">
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex items-center justify-between mb-8",
            userReviews.length > 5 ? "justify-between" : "justify-center"
          )}>
            <h2 className="text-4xl font-bold">User Reviews</h2>
            {userReviews.length > 5 && (
              <Link href="/all-reviews" className="text-gray-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">See all reviews</Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Отзыв 1 */}
            {userReviews.slice(0, 5).map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
            <div className="flex flex-col items-center justify-center">
              <Button variant="outline" className="font-medium p-4 group">
                Leave a Review {" "}
                <MailIcon className="hidden w-5 h-5 ml-2 group-hover:block group-hover:text-yellow-500 transition-all duration-500 ease-in-out" />
              </Button>
            </div>
          </div>
        </div>
        <ScrollDownButton targetId="faq" />
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={setRef(3)} className="min-h-screen py-32 flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"> {/* Увеличили отступ снизу */}
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about the app and exam preparation</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqData.map((item) => (
              <FAQItem
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                isIcon={item.isIcon}
              />
            ))}
          </div>
        </div>
        <ScrollDownButton targetId="contact" />
      </section>

      {/* Contact Section */}
      <section id="contact" ref={setRef(4)} className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out">
        <div className="w-full max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12">
            <p className="text-center text-gray-600 mb-8">
              Have a question or want to work together? Send us a message!
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer Section - done */}
      <footer className="py-8 bg-gray-100/50 backdrop-blur-sm shadow-md">
        <p className="text-center text-gray-600">
          © 2025 Quebec Driving Test Practice App. All rights reserved.
        </p>
        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="https://www.facebook.com/profile.php?id=100093188888888" target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="w-6 h-6 text-black/85 hover:scale-110 transition-all duration-300 ease-in-out hover:text-blue-500" />
          </Link>
          <Link href="https://www.instagram.com/profile.php?id=100093188888888" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="w-6 h-6 text-black/85 hover:scale-110 transition-all duration-300 ease-in-out hover:text-pink-500" />
          </Link>
          <Link href="https://x.com/profile.php?id=100093188888888" target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="w-6 h-6 text-black/85 hover:scale-110 transition-all duration-300 ease-in-out hover:text-blue-500" />
          </Link>
          <Link href="https://www.youtube.com/profile.php?id=100093188888888" target="_blank" rel="noopener noreferrer">
            <YoutubeIcon className="w-6 h-6 text-black/85 hover:scale-110 transition-all duration-300 ease-in-out hover:text-red-500" />
          </Link>
        </div>
      </footer>
    </div>
  )
}

