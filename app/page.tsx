"use client"

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { userReviews } from "@/lib/user-reviews";
import { ReviewItem } from "@/components/review-item";
import { cn } from "@/lib/utils";
import { faqData } from "@/lib/faq-data";
import { FAQItem } from "@/components/faq-item";
import { MoveRightIcon, StarIcon, ChevronDownIcon, BookOpenIcon, ClockIcon, ChartLineIcon, LanguagesIcon, WifiOffIcon, MailIcon, FacebookIcon, InstagramIcon, YoutubeIcon, TwitterIcon, Loader } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { useFormSubmit } from "@/hooks/use-form-submit";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <nav>
            <ul className="flex space-x-4">
              <Link href="#features" className="text-gray-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">Features</Link>
              <Link href="#reviews" className="text-gray-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">Reviews</Link>
              <Link href="#faq" className="text-gray-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">FAQ</Link>
              <Link href="#contact" className="text-gray-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">Contact</Link>
              <Link href="https://www.privacypolicies.com/live/5d126c98-40e9-4366-9b76-5abb2b612373"
                target="_blank"
                className="text-gray-600 hover:underline hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">
                Privacy Policy
              </Link>
            </ul>
          </nav>
          <Button variant="outline" className="rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 ease-in-out group">
            Download App <MoveRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-all duration-500 ease-in-out group-hover:text-yellow-500" />
          </Button>
        </div>
      </div>
    </header>
  );
};

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
  const { formData, isLoading, errorForm, handleChange, handleSubmit, checkFormData } = useFormSubmit();

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
      <section ref={setRef(0)} className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out">
        <div id="main" className="text-center">
          <h1 className="text-4xl font-bold">Welcome to the</h1>
          <h2 className="text-4xl font-bold text-yellow-500 mb-4">Quebec Driving Test Practice App</h2>
          <p className="text-lg text-gray-600 mb-8">Practice your driving skills with our comprehensive test preparation app.</p>
          <Button variant="outline" className="w-64 h-14 text-lg font-medium rounded-full hover:bg-purple-500 hover:text-white transition-all duration-500 ease-in-out group">
            Download App
            <StarIcon className="w-5 h-5 ml-2 group-hover:animate-bounce transition-all duration-500 ease-in-out group-hover:text-yellow-500" />
          </Button>
        </div>
        <ScrollDownButton targetId="features" />
      </section>

      {/* Features Section - done */}
      <section id="features" ref={setRef(1)} className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* База вопросов */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BookOpenIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Up-to-date Question Bank</h3>
              <p className="text-gray-600">Access a comprehensive database of questions that closely match the actual SAAQ exam content</p>
            </div>

            {/* Режимы практики */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <ClockIcon className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dual Practice Modes</h3>
              <p className="text-gray-600">Choose between practice mode for learning and exam simulation for testing your readiness</p>
            </div>

            {/* Детальные объяснения */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpenIcon className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Explanations</h3>
              <p className="text-gray-600">Learn from comprehensive explanations for each answer to understand the material better</p>
            </div>

            {/* Статистика */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ChartLineIcon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your performance with detailed statistics and progress indicators</p>
            </div>

            {/* Русский интерфейс */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <LanguagesIcon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Russian Interface</h3>
              <p className="text-gray-600">Study comfortably with a fully Russian-localized user interface</p>
            </div>

            {/* Офлайн режим */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <WifiOffIcon className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Offline Access</h3>
              <p className="text-gray-600">Practice anywhere, anytime - no internet connection required</p>
            </div>
          </div>
        </div>
        <ScrollDownButton targetId="testimonials" />
      </section>

      {/* Reviews Section - done */}
      <section id="reviews" ref={setRef(2)} className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out">
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex items-center justify-between mb-8",
            userReviews.length > 5 ? "justify-between" : "justify-center"
          )}>
            <h2 className="text-4xl font-bold">Reviews</h2>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input type="email" placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea placeholder="Message" className="min-h-[120px]"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <div className="flex justify-center">
                <Button type="submit" className="w-[200px]" disabled={!checkFormData()}>
                  {isLoading
                    ? <Loader className="w-5 h-5 animate-spin" />
                    : "Send Message"}
                </Button>
              </div>
              <div className="flex justify-center mt-4">
                {errorForm && <p className="text-red-500 text-center">{errorForm}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section - done */}
      <footer className="py-8 bg-gray-100/50 backdrop-blur-sm shadow-md">
        <p className="text-center text-gray-600">
          © 2025 Quebec Driving Test Practice App. All rights reserved.
        </p>
        <Link href="/privacy-policy" className="mt-4 block text-center text-gray-600 hover:text-black hover:underline hover:scale-105 transition-all duration-300 ease-in-out">
          Privacy Policy
        </Link>
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

