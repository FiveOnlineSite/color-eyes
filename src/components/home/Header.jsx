import Image from "next/image";
import Link from "next/link";

import ActionLink from "./ActionLink";

const links = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Our Brands", "#brands"],
  ["Eye Care", "#eye-care"],
  ["Find a Distributor", "#distributors"],
  ["Contact Us", "#contact"],
];

export default function Header() {
  return (
    <header className="absolute top-5 left-1/2 z-50 flex h-20 w-[min(1280px,calc(100%-112px))] -translate-x-1/2 items-center rounded-[54px] bg-white py-0 pr-2.5 pl-[38px] shadow-[0_2px_14px_rgba(0,0,0,0.1)] max-[1180px]:w-[calc(100%-48px)] max-[1180px]:pl-6 max-[900px]:h-[68px] max-[900px]:w-[calc(100%-32px)] max-[900px]:py-0 max-[900px]:pr-[7px] max-[900px]:pl-[18px]">
      <Link
        className="grid h-10 w-[147px] flex-[0_0_147px] place-items-center max-[900px]:w-[122px] max-[900px]:flex-[0_0_122px]"
        href="#home"
        aria-label="ColorEyes home"
      >
        <Image
          className="h-10 w-[147px] object-contain max-[900px]:w-[122px]"
          src="/assets/logo.png"
          alt="ColorEyes Eyecare Pvt. Ltd."
          width={147}
          height={40}
          priority
        />
      </Link>
      <nav
        className="mx-auto flex items-center gap-[26px] text-base font-medium text-[#444] [font-family:var(--font-manrope)] max-[1180px]:gap-4 max-[1180px]:text-[13px] max-[900px]:hidden"
        aria-label="Primary navigation"
      >
        {links.map(([label, href], index) => (
          <Link
            className={`relative py-7 whitespace-nowrap after:absolute after:right-0 after:bottom-[18px] after:left-0 after:h-px after:origin-center after:scale-x-40 after:bg-[#444] after:opacity-0 after:transition hover:after:scale-x-100 hover:after:opacity-100 ${index === 0 ? "font-bold after:scale-x-100 after:opacity-100" : ""}`}
            href={href}
            key={label}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex-[0_0_auto] max-[1180px]:[&>a]:text-[13px] max-[900px]:ml-auto max-[900px]:[&>a]:h-[46px] max-[900px]:[&>a]:pl-4 max-[900px]:[&>a>span:last-child]:size-10 max-[640px]:[&>a>span:first-child]:block max-[640px]:[&>a>span:first-child]:max-w-[62px] max-[640px]:[&>a>span:first-child]:overflow-hidden">
        <ActionLink href="#distributors">Become a Distributor</ActionLink>
      </div>
    </header>
  );
}
