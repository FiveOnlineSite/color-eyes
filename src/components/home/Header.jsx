"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ActionLink from "./ActionLink";

const links = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["FAQs", "/faqs"],
  ["Find a Distributor", "/find-my-distributor"],
  ["Contact Us", "/contact-us"],
];

const brands = [
  { name: "ClearThin", image: "/assets/plp/brand-clearthin.png" },
  { name: "Polylite", image: "/assets/plp/brand-polylite.png" },
  { name: "Celebration", image: "/assets/plp/brand-celebration.png" },
];

export default function Header({ logoSrc = "/assets/logo.webp", homePath = "", activePage = "home" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const linkHref = (href) => href.startsWith("/") ? href : `${homePath}${href}`;

  return (
    <header className="fixed top-5 left-1/2 z-[100] flex h-20 w-[min(1280px,calc(100%-112px))] -translate-x-1/2 items-center rounded-[54px] bg-white py-0 pr-2.5 pl-[38px] shadow-[0_2px_14px_rgba(0,0,0,0.1)] max-[1180px]:w-[calc(100%-48px)] max-[1180px]:pl-6 max-[900px]:h-[68px] max-[900px]:w-[calc(100%-32px)] max-[900px]:py-0 max-[900px]:pr-[7px] max-[900px]:pl-[18px]">
      <Link
        className="grid h-10 w-[147px] flex-[0_0_147px] place-items-center max-[900px]:w-[122px] max-[900px]:flex-[0_0_122px]"
        href={`${homePath}#home`}
        aria-label="ColorEyes home"
      >
        <Image
          className="h-auto w-[147px] object-contain max-[900px]:w-[122px]"
          src={logoSrc}
          alt="ColorEyes Eyecare Pvt. Ltd."
          width={160}
          height={44}
          preload
          unoptimized
        />
      </Link>
      <nav
        className="mx-auto flex items-center gap-[26px] text-base font-medium text-[#444] [font-family:var(--font-manrope)] max-[1180px]:gap-4 max-[1180px]:text-[13px] max-[900px]:hidden"
        aria-label="Primary navigation"
      >
        {links.slice(0, 2).map(([label, href]) => (
          <Link
            className={`relative py-7 whitespace-nowrap transition-colors after:absolute after:right-0 after:bottom-[16px] after:left-0 after:h-[3px] after:origin-center after:scale-x-40 after:rounded-full after:bg-[#1893ae] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:text-[#08778f] hover:after:scale-x-100 hover:after:opacity-100 ${(activePage === "home" && label === "Home") || (activePage === "about" && label === "About Us") ? "font-bold text-[#08778f] after:scale-x-100 after:opacity-100" : ""}`}
            href={linkHref(href)}
            key={label}
          >
            {label}
          </Link>
        ))}
        <div
          className="relative"
          onMouseEnter={() => setIsBrandsOpen(true)}
          onMouseLeave={() => setIsBrandsOpen(false)}
        >
          <button
            aria-controls="brands-navigation"
            aria-expanded={isBrandsOpen}
            className={`relative flex items-center gap-1 py-7 whitespace-nowrap transition-colors after:absolute after:right-0 after:bottom-[16px] after:left-0 after:h-[3px] after:origin-center after:rounded-full after:bg-[#1893ae] after:transition-all after:duration-300 after:ease-out hover:text-[#08778f] ${isBrandsOpen ? "font-bold text-[#08778f] after:scale-x-100 after:opacity-100" : "after:scale-x-40 after:opacity-0"}`}
            onClick={() => setIsBrandsOpen((open) => !open)}
            type="button"
          >
            Our Brands
          </button>
          <div
            className={`absolute top-[calc(100%-12px)] left-1/2 w-[440px] -translate-x-1/2 rounded-3xl bg-white p-3 shadow-[0_16px_36px_rgba(0,0,0,0.14)] transition-all duration-200 ${isBrandsOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
            id="brands-navigation"
          >
            <div className="grid grid-cols-3 gap-2">
              {brands.map((brand) => (
                <Link
                  className="group rounded-2xl p-3 text-center transition hover:bg-[#e3f1fc] focus-visible:bg-[#e3f1fc]"
                  href="/products"
                  key={brand.name}
                  onClick={() => setIsBrandsOpen(false)}
                >
                  <span className="grid h-20 place-items-center rounded-xl bg-[#f7fafc] p-2">
                    <Image className="h-auto max-h-12 w-full object-contain" src={brand.image} alt={`${brand.name} brand`} width={184} height={74} />
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-[#22384b] group-hover:text-[#08778f]">{brand.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {links.slice(2).map(([label, href]) => (
          <Link
            className={`relative py-7 whitespace-nowrap transition-colors after:absolute after:right-0 after:bottom-[16px] after:left-0 after:h-[3px] after:origin-center after:scale-x-40 after:rounded-full after:bg-[#1893ae] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:text-[#08778f] hover:after:scale-x-100 hover:after:opacity-100 ${(activePage === "faq" && label === "FAQs") || (activePage === "distributor" && label === "Find a Distributor") || (activePage === "contact" && label === "Contact Us") ? "font-bold text-[#08778f] after:scale-x-100 after:opacity-100" : ""}`}
            href={linkHref(href)}
            key={label}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-[0_0_auto] items-center gap-2 max-[1180px]:[&>a]:text-[13px] max-[900px]:ml-auto max-[900px]:[&>a]:h-[46px] max-[900px]:[&>a]:pl-4 max-[900px]:[&>a>span:last-child]:size-10 max-[640px]:[&>a>span:first-child]:hidden">
        <ActionLink className="max-[900px]:hidden" href="/become-a-distributor">Become a Distributor</ActionLink>
        <button
          aria-controls="mobile-primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="hidden size-11 place-items-center rounded-full bg-[#1893ae] text-white transition hover:bg-[#147b91] max-[900px]:grid"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span className="grid gap-1.5" aria-hidden="true">
            <i className={`block h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <i className={`block h-0.5 w-5 bg-current transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
            <i className={`block h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      <nav
        aria-label="Mobile primary navigation"
        className={`absolute top-[calc(100%+12px)] right-0 left-0 rounded-[28px] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-all duration-200 max-[900px]:grid min-[901px]:hidden ${isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
        id="mobile-primary-navigation"
      >
        {links.map(([label, href]) => (
          <Link
            className="rounded-2xl px-5 py-3 text-sm font-semibold text-[#22384b] transition hover:bg-[#e3f1fc]"
            href={linkHref(href)}
            key={label}
            onClick={() => setIsMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <div className="rounded-2xl bg-[#f7fafc] p-2">
          <p className="px-3 pt-1 pb-2 text-xs font-bold tracking-[0.12em] text-[#08778f] uppercase">Our Brands</p>
          <div className="grid grid-cols-3 gap-1">
            {brands.map((brand) => (
              <Link
                className="rounded-xl p-2 text-center transition hover:bg-[#e3f1fc]"
                href="/products"
                key={brand.name}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="grid h-12 place-items-center">
                  <Image className="h-auto max-h-8 w-full object-contain" src={brand.image} alt={`${brand.name} brand`} width={184} height={74} />
                </span>
                <span className="mt-1 block text-xs font-semibold text-[#22384b]">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <ActionLink
          className="mt-2 w-full justify-center pr-5 [&>span:last-child]:hidden"
          href="/become-a-distributor"
        >
          Become a Distributor
        </ActionLink>
      </nav>
    </header>
  );
}
