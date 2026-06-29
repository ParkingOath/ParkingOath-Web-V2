import * as React from "react";
import Link from "next/link";
import NextImage from "next/image";
import logo from "@/assets/icon/Vector.png";
import { FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { Container } from "./Container";
import { Text } from "./Text";
import { cn } from "./utils";

export type FooterLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: FooterLink[];
  copyright?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it Works", href: "/#how-it-works" },
      { label: "FAQ's", href: "/faqs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Blog", href: "/blog" },
      { label: "Get in Touch", href: "/contact" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "Trust & Safety", href: "/trust-safety" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const defaultSocialLinks: FooterLink[] = [
  { label: "X", href: "https://x.com", icon: <FaXTwitter size={18} /> },
  { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram size={18} /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedinIn size={18} /> },
];

export function Footer({
  brand,
  description =
  "We consider various parking options, such as driveways, lots, garages, and carports, provided they are secure and easily accessible.",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  copyright = "©2026 ParkingOath. All Rights Reserved.",
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn("border-t border-slate-200 bg-white", className)}
      {...props}
    >
      <Container reveal={false} className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            {brand ?? (
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                  <NextImage
                    src={logo}
                    alt="ParkingOath"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-black">
                  ParkingOath
                </span>
              </div>
            )}
            <Text className="max-w-md">{description}</Text>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#334155] transition-all hover:border-brand hover:bg-brand hover:text-white"
                >
                  {link.icon ?? link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <p className="text-sm font-semibold text-black">
                  {section.title}
                </p>
                <div className="flex flex-col gap-3 text-sm text-[#475569]">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="transition-colors hover:text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-[#64748b]">
          {copyright}
        </div>
      </Container>
    </footer>
  );
}
