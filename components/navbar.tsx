"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/smartPantryIcon.png"
                alt="Smart Pantry Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <span className="text-xl font-semibold">Smart Pantry</span>
            </Link>
          </div>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/residents">
              <Button variant="ghost">Residents</Button>
            </Link>
            <Link href="/form">
              <Button variant="ghost">Submit Form</Button>
            </Link>
            <Link href="/feedback">
              <Button variant="ghost">Feedback</Button>
            </Link>
            <Link href="/recipe-maker">
              <Button variant="ghost">Recipe Maker</Button>
            </Link>
            <Button variant="destructive">Logout</Button>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="relative z-50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 pb-6 px-4 space-y-4">
          <Link href="/residents" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start text-lg">
              Residents
            </Button>
          </Link>
          <Link href="/form" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start text-lg">
              Submit Form
            </Button>
          </Link>
          <Link href="/feedback" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start text-lg">
              Feedback
            </Button>
          </Link>
          <Link href="/recipe-maker" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start text-lg">
              Recipe Maker
            </Button>
          </Link>
          <Button variant="destructive" className="w-full text-lg">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
} 