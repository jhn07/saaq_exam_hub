import { useState } from 'react';
import Link from "next/link";
import { DownloadButton } from "./download-button";
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const links = [
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "https://www.privacypolicies.com/live/5d126c98-40e9-4366-9b76-5abb2b612373" },
]

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-purple-600">
            Quebec Driving App
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.includes("https") ? "_blank" : "_self"}
                    className="text-gray-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-gray-600 hover:text-black"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          <DownloadButton className="hidden md:flex items-center px-3 py-2 text-sm font-medium" />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white">
          <ul className="flex flex-col p-4">
            {links.map((link) => (
              <li key={link.label} className="py-2">
                <Link
                  href={link.href}
                  target={link.href.includes("https") ? "_blank" : "_self"}
                  className="text-gray-600 hover:text-black block"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-2">
              <DownloadButton className="w-full" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

