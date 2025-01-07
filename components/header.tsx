import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRightIcon } from "lucide-react";
import { DownloadButton } from "./download-button";


const links = [
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "https://www.privacypolicies.com/live/5d126c98-40e9-4366-9b76-5abb2b612373" },
]

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <nav>
            <ul className="flex space-x-4">

              {links.map((link) => (
                <Link href={link.href}
                  key={link.label}
                  target={link.href.includes("https") ? "_blank" : "_self"}
                  className="text-gray-600 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  {link.label}
                </Link>
              ))}

            </ul>
          </nav>
          <DownloadButton className="font-medium" />
        </div>
      </div>
    </header>
  );
};