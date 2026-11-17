"use client";

import Image from "next/image";
import { useState } from "react";

import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import SectionBadge from "@/components/home/SectionBadge";
import SellerSection from "@/components/product/SellerSection";

const contactDetails = [
  {
    icon: "map-pin.svg",
    label: "Visit our office",
    value: "A/3, 2nd Floor, Vishnu Apartment, Babhai Naka, L.T. Road, Borivali (West), Mumbai – 400092, India.",
  },
  {
    icon: "phone.svg",
    label: "Call us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: "mail.svg",
    label: "Email us",
    value: "admin@coloreyes.com",
    href: "mailto:admin@coloreyes.com",
  },
];

function Field({ label, id, type = "text", placeholder, required = false }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-semibold text-[#222] [font-family:var(--font-manrope)]">{label}</span>
      <input
        className="h-[52px] w-full rounded-lg border border-[#d3d8dc] bg-white px-4 text-sm text-[#222] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="overflow-x-clip bg-[#fcfcfc]">
      <Header homePath="/" activePage="contact" />

      <section className="relative mt-[120px] h-[408px] overflow-hidden bg-[#0863bd] max-[900px]:mt-[112px] max-[900px]:h-[460px]" aria-labelledby="contact-hero-title">
        <video aria-hidden="true" autoPlay className="absolute inset-0 size-full object-cover" loop muted playsInline preload="metadata">
          <source src="/assets/bg-sky.mp4" type="video/mp4" />
        </video>
        <div aria-hidden="true" className="absolute inset-0 bg-[#145a8d]/25" />
        <div aria-hidden="true" className="pointer-events-none absolute top-[-44px] right-[max(3vw,calc(50%-625px))] h-[516px] w-[576px] overflow-hidden max-[900px]:right-[-160px] max-[640px]:right-[-270px] max-[640px]:opacity-65">
          <Image className="absolute top-[-5.85%] left-[-60.11%] h-[118.78%] w-[160.06%] max-w-none" src="/assets/find-my-product/banner-model.png" alt="" width={999} height={667} priority />
        </div>
        <div className="relative z-10 mx-auto w-[min(1280px,89%)] pt-[67px] max-[640px]:pt-11">
          <SectionBadge>We&apos;re Here to Help</SectionBadge>
          <h1 id="contact-hero-title" className="mt-5 max-w-[510px] text-5xl leading-[56px] font-semibold text-white [font-family:var(--font-gabarito)] max-[640px]:max-w-[310px] max-[640px]:text-[38px] max-[640px]:leading-[44px]">Let&apos;s Start a Conversation</h1>
          <p className="mt-4 max-w-[454px] text-base leading-6 text-white [font-family:var(--font-manrope)] max-[640px]:max-w-[300px] max-[640px]:text-sm">Whether you have a product question, need support, or want to work with us, our team would love to hear from you.</p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1280px,89%)] grid-cols-[minmax(0,.84fr)_minmax(0,1.16fr)] gap-20 py-[88px] max-[1000px]:gap-10 max-[850px]:grid-cols-1 max-[640px]:py-14" aria-labelledby="contact-form-title">
        <div>
          <SectionBadge>Contact Details</SectionBadge>
          <h2 className="mt-6 max-w-[430px] text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">A clearer way to reach us</h2>
          <p className="mt-4 max-w-[436px] text-base leading-7 text-[#444]">Choose the option that suits you best. We&apos;ll make sure your question reaches the right member of our team.</p>
          <div className="mt-9 space-y-6">
            {contactDetails.map(({ icon, label, value, href }) => {
              const content = <><span className="block text-sm font-semibold text-[#1d1d1d]">{label}</span><span className="mt-1 block text-sm leading-6 text-[#555]">{value}</span></>;
              return (
                <div className="flex items-start gap-4" key={label}>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e3f1fc]"><Image src={`/assets/${icon}`} alt="" width={22} height={22} aria-hidden="true" /></span>
                  {href ? <a className="transition hover:text-[#08778f]" href={href}>{content}</a> : <div>{content}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-[0_2px_22px_rgba(9,65,79,.11)] max-[640px]:p-5">
          <h2 id="contact-form-title" className="sr-only">Contact form</h2>
          {submitted && <p className="rounded-lg bg-[#e3f5f8] px-4 py-3 text-sm leading-6 text-[#076177]" role="status">Thanks for reaching out. Your message has been received and our team will be in touch soon.</p>}
          <form className={`${submitted ? "mt-6" : ""} grid grid-cols-2 gap-x-4 gap-y-5 max-[560px]:grid-cols-1`} onSubmit={handleSubmit}>
            <Field label="Full name *" id="name" placeholder="Enter your name" required />
            <Field label="Email address *" id="email" type="email" placeholder="you@example.com" required />
            <Field label="Phone number" id="phone" type="tel" placeholder="+91" />
            <label className="block" htmlFor="topic">
              <span className="mb-2 block text-sm font-semibold text-[#222] [font-family:var(--font-manrope)]">I&apos;m contacting about</span>
              <span className="relative block">
                <select className="h-[52px] w-full appearance-none rounded-lg border border-[#d3d8dc] bg-white px-4 pr-11 text-sm text-[#555] outline-none transition focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="topic" name="topic" defaultValue="">
                  <option value="" disabled>Select a topic</option>
                  <option>Product enquiry</option>
                  <option>Retail or distributor partnership</option>
                  <option>Order support</option>
                  <option>General enquiry</option>
                </select>
                <svg aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[#08778f]" fill="none" viewBox="0 0 20 20">
                  <path d="m5.5 7.5 4.5 4.5 4.5-4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                </svg>
              </span>
            </label>
            <label className="col-span-2 block max-[560px]:col-span-1" htmlFor="message"><span className="mb-2 block text-sm font-semibold text-[#222] [font-family:var(--font-manrope)]">Your message *</span><textarea className="min-h-[126px] w-full resize-y rounded-lg border border-[#d3d8dc] bg-white px-4 py-3 text-sm text-[#222] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="message" name="message" placeholder="Write your message here..." required /></label>
            <div className="col-span-2 max-[560px]:col-span-1"><button className="inline-flex h-11 cursor-pointer items-center rounded-full bg-[#1893ae] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#147f96] hover:shadow-[0_8px_20px_rgba(2,64,78,.16)]" type="submit">Send Message</button></div>
          </form>
        </div>
      </section>

      <section className="bg-[#eef8fb] py-[72px] max-[640px]:py-14" aria-labelledby="office-location-title">
        <div className="mx-auto grid w-[min(1280px,89%)] grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <SectionBadge>Office Location</SectionBadge>
            <h2 id="office-location-title" className="mt-6 text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Come say hello in Mumbai</h2>
            <p className="mt-4 text-base leading-7 text-[#444]">Our team is based in Borivali (West), Mumbai. Plan your visit or use the map for directions to our office.</p>
          </div>
          <div className="h-[380px] overflow-hidden rounded-2xl bg-[#c9e0e8] shadow-[0_2px_18px_rgba(9,65,79,.11)] max-[640px]:h-[320px]">
            <iframe className="size-full border-0" title="Map showing the ColorEyes Mumbai office" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Vishnu%20Apartment%2C%20Babhai%20Naka%2C%20L.T.%20Road%2C%20Borivali%20West%2C%20Mumbai%20400092&output=embed" />
          </div>
        </div>
      </section>

      <SellerSection />
      <Footer homePath="/" />
    </main>
  );
}
