"use client";

import Image from "next/image";
import { useState } from "react";

import ActionLink from "@/components/home/ActionLink";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import SectionBadge from "@/components/home/SectionBadge";
import WaveHeadingText from "@/components/home/WaveHeadingText";

const partnerBenefits = [
  ["01", "A product range people ask for", "Offer clear, coloured, toric and specialty contact lenses designed for varied lifestyles and vision needs."],
  ["02", "A growing market opportunity", "Build your business in a category shaped by repeat demand, personal expression and everyday eye care."],
  ["03", "Brand support that stays close", "Work with a team that helps you represent the ColorEyes brand with confidence in your local market."],
  ["04", "Training for your team", "Access product knowledge and guidance to help your staff support customers with care and clarity."],
  ["05", "Marketing that helps you move", "Use ready-to-share product stories and promotional material to create visibility in your territory."],
  ["06", "Service you can rely on", "Get responsive partner support that helps keep planning, ordering and growth moving forward."],
];

const applicantTypes = [
  ["Optical distributors", "Established distributors looking to add a trusted contact-lens range to their portfolio."],
  ["Optical retailers", "Multi-store retailers and optical businesses ready to serve more customers locally."],
  ["Corporate suppliers", "Organisations with established channels in health, retail or consumer-product supply."],
  ["Beauty & salon networks", "Professional beauty networks that want to extend their offering with credible lens solutions."],
];

const faqs = [
  ["What investment is required to become a distributor?", "Investment is shaped by the territory, business model and opening order plan. Share your details and our team will discuss a practical starting point."],
  ["Which territories are available?", "Availability is reviewed based on your business location, current network and market opportunity. We will confirm this during the application review."],
  ["Is there a minimum order requirement?", "Opening and replenishment requirements are discussed according to your channel, territory and proposed partnership plan."],
  ["Will ColorEyes provide training and marketing support?", "Yes. Approved partners receive product guidance along with brand and marketing support to help launch and grow the range."],
  ["How long does approval take?", "After we receive a complete application, our team reviews it and contacts suitable applicants with the next steps."],
];

function TextField({ label, id, type = "text", required = false, placeholder, className = "" }) {
  return <label className={`block ${className}`} htmlFor={id}><span className="mb-2 block text-sm font-semibold text-[#222]">{label}{required ? " *" : ""}</span><input className="h-[52px] w-full rounded-lg border border-[#d3d8dc] bg-white px-4 text-sm text-[#222] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id={id} name={id} type={type} required={required} placeholder={placeholder} /></label>;
}

function SelectField({ label, id, children, required = false }) {
  return <label className="block" htmlFor={id}><span className="mb-2 block text-sm font-semibold text-[#222]">{label}{required ? " *" : ""}</span><select className="h-[52px] w-full rounded-lg border border-[#d3d8dc] bg-white px-4 text-sm text-[#555] outline-none transition focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id={id} name={id} defaultValue="" required={required}><option value="" disabled>Select an option</option>{children}</select></label>;
}

function ApplicantIcon({ title }) {
  const iconClass = "size-6";
  if (title === "Optical distributors") return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>;
  if (title === "Optical retailers") return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 10h16v10H4zM3 10l2-6h14l2 6M9 20v-5h6v5" /><path d="M4 10c0 1.5 2.1 2.7 4 1.3 1.9 1.4 4.1 1.4 6 0 1.9 1.4 4 .2 4-1.3" /></svg>;
  if (title === "Corporate suppliers") return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 20v-5h8v5M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" /></svg>;
  return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="4" /></svg>;
}

export default function DistributorApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  function submitApplication(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return <main className="overflow-x-clip bg-[#fcfcfc]">
    <Header homePath="/" activePage="none" />

    <section className="relative mt-32 h-[444px] overflow-hidden max-[900px]:mt-[112px] max-[640px]:h-[500px]" aria-labelledby="partner-hero-title">
      <video className="absolute inset-0 size-full object-cover" src="/assets/bg-sky.mp4" autoPlay loop muted playsInline aria-hidden="true" />
      <div className="absolute inset-0 bg-[#145a8d]/20" aria-hidden="true" />
      <div className="pointer-events-none absolute top-[9px] right-[14px] h-[561px] w-[624px] overflow-hidden max-[780px]:right-[-170px] max-[780px]:opacity-55 max-[560px]:right-[-280px]" aria-hidden="true"><Image className="absolute top-[-5.85%] left-[-60.11%] h-[118.78%] w-[160.06%] max-w-none" src="/assets/find-my-product/banner-model.png" alt="" width={999} height={667} priority /></div>
      <div className="relative z-10 mx-auto w-[min(1280px,89%)] pt-[60px] max-[640px]:pt-11">
        <SectionBadge>Grow With ColorEyes</SectionBadge>
        <h1 id="partner-hero-title" className="mt-5 max-w-[540px] text-5xl leading-[56px] font-semibold text-white [font-family:var(--font-gabarito)] max-[640px]:max-w-[330px] max-[640px]:text-[38px] max-[640px]:leading-[44px]">Build Your Business<br />With ColorEyes</h1>
        <p className="mt-4 max-w-[430px] text-base leading-6 text-white [font-family:var(--font-manrope)] max-[640px]:max-w-[300px] max-[640px]:text-sm">Partner with a contact-lens brand made for opportunity, reliable support and sustainable market growth.</p>
        <ActionLink className="mt-9" href="#application-form" variant="light">Apply Now</ActionLink>
      </div>
    </section>

    <section className="mx-auto grid w-[min(1280px,89%)] grid-cols-[minmax(0,1fr)_475px] items-center gap-20 py-[88px] max-[950px]:grid-cols-1 max-[950px]:gap-10 max-[640px]:py-14" aria-labelledby="partnership-intro-title">
      <div><SectionBadge>Partnership</SectionBadge><h2 id="partnership-intro-title" className="mt-6 max-w-[560px] text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Partner in Growth. <br/>Lead Your Market.</h2><p className="mt-5 max-w-[608px] text-base leading-7 text-[#444]">ColorEyes is building a dependable distribution network for high-quality contact lenses across India. We work with partners who understand their markets and want to create a stronger, more accessible lens business.</p><p className="mt-4 max-w-[608px] text-base leading-7 text-[#444]">From a versatile product portfolio to hands-on brand support, we give you the tools to bring better eye care and self-expression to customers in your territory.</p></div>
      <div className="relative h-[304px] overflow-hidden rounded-2xl bg-[#d8edf5] shadow-[0_2px_18px_rgba(9,65,79,.1)] max-[950px]:h-auto max-[950px]:aspect-[475/304]"><Image src="/assets/market-reach.png" alt="ColorEyes market reach" fill sizes="(max-width: 950px) 89vw, 475px" className="object-cover" /></div>
    </section>

    <section className="bg-[#eef8fb] py-[72px] max-[640px]:py-14" aria-labelledby="why-partner-title">
      <div className="mx-auto w-[min(1280px,89%)]"><div className="text-center"><SectionBadge>Why Partner With ColorEyes</SectionBadge><h2 id="why-partner-title" className="mt-6 text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10"><WaveHeadingText lines="More than a product. A partner for progress." /></h2><p className="mx-auto mt-4 max-w-[652px] text-base leading-7 text-[#444]">Everything you need to introduce, support and grow ColorEyes with confidence.</p></div><div className="mt-12 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">{partnerBenefits.map(([number, title, copy]) => <article className="min-h-[216px] rounded-2xl bg-white p-7 shadow-[0_1px_14px_rgba(6,83,102,.08)]" key={title}><span className="grid size-10 place-items-center rounded-full bg-[#e3f1fc] text-sm font-bold text-[#0a7187]">{number}</span><h3 className="mt-6 text-xl leading-7 font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#555]">{copy}</p></article>)}</div></div>
    </section>

    <section className="bg-[#14798f] py-[72px] text-white max-[640px]:py-14" aria-labelledby="who-can-apply-title">
      <div className="mx-auto w-[min(1280px,89%)]"><div className="text-center"><SectionBadge tone="white">Who Can Apply</SectionBadge><div className="mx-auto mt-6 max-w-[710px]"><h2 id="who-can-apply-title" className="text-4xl leading-[48px] font-semibold [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Bring your market knowledge. We&apos;ll bring the brand support.</h2><p className="mx-auto mt-5 max-w-[640px] text-base leading-7 text-white/90">We welcome business partners with local reach, a customer-first mindset and the capability to build a compliant, long-term distribution relationship.</p></div></div><div className="mt-12 grid grid-cols-4 gap-5 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">{applicantTypes.map(([title, copy]) => <article className="min-h-[230px] rounded-xl bg-white p-6 text-[#1d1d1d]" key={title}><span className="grid size-11 place-items-center rounded-full bg-[#e3f1fc] text-[#08778f]"><ApplicantIcon title={title} /></span><h3 className="mt-4 text-xl leading-7 font-semibold [font-family:var(--font-gabarito)]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#555]">{copy}</p></article>)}</div></div>
    </section>

    <section className="bg-[#fcfcfc] py-[88px] max-[640px]:py-14" id="application-form" aria-labelledby="application-form-title">
      <div className="mx-auto grid w-[min(1280px,89%)] grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] gap-20 max-[950px]:grid-cols-1 max-[950px]:gap-10"><div><SectionBadge>Application Form</SectionBadge><h2 id="application-form-title" className="mt-6 text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Tell us about your business</h2><p className="mt-5 text-base leading-7 text-[#444]">Share a few essentials so our partnership team can understand your business, territory and growth plans.</p><div className="mt-8 rounded-xl bg-[#e3f1fc] p-6"><p className="text-base font-semibold text-[#135d6e] [font-family:var(--font-gabarito)]">What happens next?</p><p className="mt-2 text-sm leading-6 text-[#38606a]">We review your application and contact suitable partners to discuss availability, onboarding and next steps.</p></div></div>
        <form className="rounded-2xl bg-white p-8 shadow-[0_2px_22px_rgba(9,65,79,.11)] max-[640px]:p-5" onSubmit={submitApplication}>{submitted && <p className="mb-6 rounded-lg bg-[#e3f5f8] px-4 py-3 text-sm leading-6 text-[#076177]" role="status">Thanks for your application. Our partnership team will review it and be in touch.</p>}<div className="grid grid-cols-2 gap-x-4 gap-y-5 max-[560px]:grid-cols-1"><TextField label="Company name" id="company" required placeholder="Your business name" /><TextField label="Contact name" id="contact-name" required placeholder="Your full name" /><TextField label="Business email" id="email" required type="email" placeholder="you@company.com" /><TextField label="Phone number" id="phone" required type="tel" placeholder="+91" /><TextField label="City" id="city" required placeholder="Your city" /><TextField label="State" id="state" required placeholder="Your state" /><SelectField label="Business type" id="business-type" required><option>Distributor</option><option>Optical retailer</option><option>Corporate supplier</option><option>Salon or beauty network</option><option>Other</option></SelectField><SelectField label="Years in operation" id="years" required><option>Less than 1 year</option><option>1–3 years</option><option>4–7 years</option><option>8+ years</option></SelectField><TextField label="Current distribution network" id="network" placeholder="Brands, stores or cities you serve" className="col-span-2 max-[560px]:col-span-1" /><TextField label="Preferred territory" id="territory" required placeholder="City, district or state" className="col-span-2 max-[560px]:col-span-1" /><label className="col-span-2 block max-[560px]:col-span-1" htmlFor="profile"><span className="mb-2 block text-sm font-semibold text-[#222]">Company profile or supporting document</span><input className="block w-full rounded-lg border border-dashed border-[#9ecbd6] bg-[#f7fcfd] px-4 py-3 text-sm text-[#555] file:mr-4 file:rounded-full file:border-0 file:bg-[#1893ae] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" id="profile" name="profile" type="file" accept=".pdf,.doc,.docx" /></label><label className="col-span-2 block max-[560px]:col-span-1" htmlFor="message"><span className="mb-2 block text-sm font-semibold text-[#222]">Anything else we should know?</span><textarea className="min-h-[112px] w-full resize-y rounded-lg border border-[#d3d8dc] px-4 py-3 text-sm outline-none placeholder:text-[#8a8a8a] focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="message" name="message" placeholder="Tell us about your business goals or market experience." /></label><div className="col-span-2 pt-1 max-[560px]:col-span-1"><button className="inline-flex h-[52px] cursor-pointer items-center rounded-full bg-[#1893ae] px-7 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#147f96] hover:shadow-[0_8px_20px_rgba(2,64,78,.16)]" type="submit">Submit Application</button></div></div></form></div>
    </section>

    <section className="bg-[#eef8fb] py-[72px] max-[640px]:py-14" aria-labelledby="business-faq-title"><div className="mx-auto grid w-[min(1280px,89%)] grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-10"><div><SectionBadge>Business FAQs</SectionBadge><h2 id="business-faq-title" className="mt-6 text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Frequently Asked Questions</h2><p className="mt-5 max-w-[420px] text-base leading-7 text-[#444]">Here are the details prospective partners most often want to know before applying.</p></div><div className="space-y-3">{faqs.map(([question, answer], index) => { const open = index === openFaq; return <article className="overflow-hidden rounded-xl border border-[#b8dce4] bg-white" key={question}><button aria-expanded={open} className="flex w-full cursor-pointer items-center justify-between gap-5 px-6 py-5 text-left text-lg leading-7 font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:px-5 max-[640px]:text-base" onClick={() => setOpenFaq(open ? -1 : index)} type="button"><span>{question}</span><span className={`grid size-7 shrink-0 place-items-center rounded-full bg-[#e3f1fc] text-xl leading-none text-[#08778f] transition-transform ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span></button>{open && <p className="px-6 pb-5 text-sm leading-6 text-[#555] max-[640px]:px-5">{answer}</p>}</article>; })}</div></div></section>
    <Footer homePath="/" />
  </main>;
}
