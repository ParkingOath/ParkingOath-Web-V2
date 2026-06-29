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
  brandHref?: string;
  links?: NavLink[];
  cta?: NavLink | null;
  secondaryCta?: NavLink | null;
}

const defaultLinks: NavLink[] = [
  { label: "Drivers", href: "/drivers" },
  { label: "Hosts", href: "/hosts" },
  { label: "Ambassadors", href: "/ambassadors" },
  { label: "About", href: "/about" },
  { label: "Newsroom", href: "/newsroom" },
];

export function Navbar({
  brand,
  brandHref = "/",
  links = defaultLinks,
  cta = { label: "Find parking", href: "/early-access" },
  secondaryCta = { label: "List your space", href: "/hosts#early-access-form" },
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
      <Container reveal={false} className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          {brand ?? (
            <Link
              href={brandHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
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
        <div className="hidden items-center gap-3 md:flex">
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className={buttonClasses({ variant: "secondary", size: "lg" })}
            >
              {secondaryCta.label}
            </Link>
          ) : null}
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
          <Container reveal={false} className="flex flex-col gap-4 py-6">
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
            {cta || secondaryCta ? (
              <div className="flex flex-col gap-3 pt-2">
                {cta ? (
                  <Link
                    href={cta.href}
                    className={buttonClasses({ variant: "primary", size: "md", className: "w-full justify-center" })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cta.label}
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className={buttonClasses({ variant: "secondary", size: "md", className: "w-full justify-center" })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </Container>
        </div>
      )}
    </header>
  );
}
