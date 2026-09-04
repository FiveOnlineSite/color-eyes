import Image from "next/image";
import Link from "next/link";

import FooterWordmark from "./FooterWordmark";

const contactDetails = [
  ["map-pin.svg", "A/3. 2nd Floor, Vishnu Apartment, Babhai Naka, L.T Road, Borivali (West), Mumbai - 400092, India."],
  ["phone.svg", "+91 9876543210"],
  ["mail.svg", "admin@vibhutiinsurance.com"],
];

const columnClasses =
  "flex flex-col items-start text-sm leading-6 text-[#444] [font-family:var(--font-manrope)]";

const headingClasses =
  "mb-2.5 min-w-[85px] border-b-[1.4px] border-[#111] pb-2 text-base leading-7 font-normal text-[#020202] [font-family:var(--font-gabarito)]";

export default function Footer() {
  return (
    <footer className="relative -mt-[167px] h-[963px] overflow-hidden bg-[#f7f7f7] px-[7vw] pt-[298px] max-[900px]:h-auto max-[900px]:min-h-[990px] max-[900px]:px-10 max-[640px]:-mt-[90px] max-[640px]:min-h-[1370px] max-[640px]:px-6 max-[640px]:pt-[180px]">
      <div className="grid w-full grid-cols-[1.3fr_.65fr_.65fr_1.15fr] gap-[clamp(48px,8vw,164px)] max-[1180px]:gap-14 max-[900px]:grid-cols-2 max-[900px]:gap-x-14 max-[900px]:gap-y-[54px] max-[640px]:grid-cols-1 max-[640px]:gap-[42px]">
        <section className={columnClasses}>
          <h2 className={headingClasses}>Contact Details</h2>
          <div>
            {contactDetails.map(([icon, copy], index) => (
              <p
                className={`mb-4 flex items-start gap-3.5 ${index === 0 ? "w-[282px] max-[640px]:w-full" : ""}`}
                key={icon}
              >
                <Image
                  className="mt-0.5 size-5 flex-[0_0_20px]"
                  src={`/assets/${icon}`}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
                <span>{copy}</span>
              </p>
            ))}
          </div>
          <h2 className={`${headingClasses} mt-3 min-w-[78px]`}>Follow Us</h2>
          <div className="flex gap-2">
            {["facebook.svg", "instagram.svg", "linkedin.svg"].map((icon) => (
              <Link href="#" aria-label={icon.replace(".svg", "")} key={icon}>
                <Image src={`/assets/${icon}`} alt="" width={24} height={24} />
              </Link>
            ))}
          </div>
        </section>
        <section className={`${columnClasses} [&>a]:mb-2`}>
          <h2 className={headingClasses}>Quick Link</h2>
          <Link href="#home">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#eye-care">FAQs</Link>
          <Link href="#contact">Contact Us</Link>
        </section>
        <section className={`${columnClasses} [&>a]:mb-2`}>
          <h2 className={headingClasses}>Brands</h2>
          <Link href="#brands">Celebration</Link>
          <Link href="#brands">Polylite</Link>
          <Link href="#brands">Clear Thin</Link>
        </section>
        <section className={`${columnClasses} max-w-[296px] max-[640px]:w-full max-[640px]:max-w-none`}>
          <h2 className={`${headingClasses} min-w-[154px]`}>Newsletter Sign-up</h2>
          <p className="mb-2.5">Want to know what we are upto? Sign-up for the newsletter and join our tribe</p>
          <form className="flex w-full flex-col items-start">
            <label className="sr-only" htmlFor="newsletter-email">Enter your email address</label>
            <input
              className="h-11 w-full rounded-lg border-0 bg-[#ebebeb] px-[13px] text-xs text-[#333] outline-none"
              id="newsletter-email"
              type="email"
              placeholder="Enter your email address"
            />
            <button
              className="mt-5 flex h-11 cursor-pointer items-center gap-[19px] rounded-[29px] border-0 bg-[#1893ae] py-0 pr-[7px] pl-[29px] font-bold text-white"
              type="submit"
            >
              Subscribe
              <span className="grid size-[30px] place-items-center rounded-full bg-white">
                <Image src="/assets/newsletter-arrow.svg" alt="" width={20} height={20} />
              </span>
            </button>
          </form>
        </section>
      </div>
      <FooterWordmark />
      <p className="absolute right-[7vw] bottom-[35px] left-[7vw] m-0 border-t border-[#999] pt-5 text-center text-sm leading-5 text-[#111] [font-family:var(--font-manrope)] max-[640px]:right-6 max-[640px]:left-6">
        ColorEyes&nbsp; 2026. All rights reserved
      </p>
    </footer>
  );
}
