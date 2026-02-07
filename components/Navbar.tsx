"use client";

import * as React from "react";
import Link from "next/link";

import { buttonClasses } from "./Button";
import { Container } from "./Container";
import { cn } from "./utils";
import Image from "next/image";
import logo from "@/assets/icon/Vector.png";

export type NavLink = {
  label: string;
  href: string;
};

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  links?: NavLink[];
  cta?: NavLink;
}

const defaultLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Host", href: "/host" },
  { label: "Seeker", href: "/seeker" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({
  brand,
  links = defaultLinks,
  cta = { label: "Become a Host", href: "/early-access" },
  className,
  ...props
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-50",
        className
      )}
      {...props}
    >
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          {brand ?? (
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <Image
                  src={logo}
                  alt="ParkingOath"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-black">
                ParkingOath
              </span>
            </Link>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-lg font-medium text-[#475569] md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          {cta ? (
            <Link
              href={cta.href}
              className={buttonClasses({ variant: "primary", size: "lg" })}
            >
              {cta.label}
            </Link>
          ) : null}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-[#475569] hover:text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </Container>


      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <Container className="flex flex-col gap-4 py-6">
            <nav className="flex flex-col gap-4 text-lg font-medium text-[#475569]">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {cta ? (
              <div className="pt-2">
                <Link
                  href={cta.href}
                  className={buttonClasses({ variant: "primary", size: "md", className: "w-full justify-center" })}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </Container>
        </div>
      )}
    </header>
  );
}
