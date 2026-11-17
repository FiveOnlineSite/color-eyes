"use client";

import Image from "next/image";
import { useState } from "react";

import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import SectionBadge from "@/components/home/SectionBadge";

const categories = ["Getting Started", "Contact Lenses", "Eye Care", "Orders & Support"];

const faqs = [
  {
    category: "Getting Started",
    question: "How do I choose the right contact lenses?",
    answer: "Start with an eye examination and speak with an eye care professional about your prescription, wearing schedule and lifestyle. They can help you choose a lens type that is comfortable and suitable for your eyes.",
  },
  {
    category: "Getting Started",
    question: "Can I wear contact lenses if I have never used them before?",
    answer: "Yes. Your eye care professional can guide you through your first fitting and show you how to insert, remove and care for your lenses with confidence.",
  },
  {
    category: "Getting Started",
    question: "Where can I buy ColorEyes lenses?",
    answer: "You can find an authorised ColorEyes distributor near you through our distributor finder. They can help with availability and product guidance.",
  },
  {
    category: "Contact Lenses",
    question: "How long can I wear my contact lenses each day?",
    answer: "Wear lenses only for the schedule recommended by your eye care professional and the product instructions. If your eyes feel dry, irritated or uncomfortable, remove the lenses and seek professional advice.",
  },
  {
    category: "Contact Lenses",
    question: "Can I sleep while wearing my contact lenses?",
    answer: "Unless your eye care professional has specifically prescribed lenses for overnight wear, remove your contact lenses before sleeping. Sleeping in lenses not designed for it can increase the risk of eye problems.",
  },
  {
    category: "Contact Lenses",
    question: "How should I store reusable contact lenses?",
    answer: "Wash and dry your hands, clean and disinfect lenses with the recommended solution, then store them in fresh solution in a clean lens case. Never reuse old solution or use water to rinse lenses or the case.",
  },
  {
    category: "Eye Care",
    question: "What should I do if my eyes feel uncomfortable while wearing lenses?",
    answer: "Remove your lenses straight away. If discomfort, redness, blurred vision or sensitivity to light continues, contact an eye care professional promptly before wearing lenses again.",
  },
  {
    category: "Eye Care",
    question: "How can I help keep my eyes comfortable during screen time?",
    answer: "Take regular breaks from close-up work, blink often and make sure your screen and room lighting feel comfortable. An eye examination is a good idea if you regularly notice tired or dry eyes.",
  },
  {
    category: "Eye Care",
    question: "Do coloured lenses need the same care as clear lenses?",
    answer: "Yes. Coloured contact lenses are medical devices and need the same fitting, hygiene and replacement routine as clear lenses. Only wear lenses prescribed or recommended for you.",
  },
  {
    category: "Orders & Support",
    question: "How can I find a distributor near me?",
    answer: "Visit our distributor finder and share your location details. We will help direct you to an authorised ColorEyes distributor in your area.",
  },
  {
    category: "Orders & Support",
    question: "I need help with a product or order. Who should I contact?",
    answer: "Our team is happy to help. Send us a message through the contact page with your question and any relevant product or order details.",
  },
];

function FaqItem({ item, index, isOpen, onToggle }) {
  const id = `faq-answer-${index}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#d8e7eb] bg-white transition-shadow hover:shadow-[0_8px_28px_rgba(9,65,79,.08)]">
      <h3>
        <button
          aria-controls={id}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between gap-6 px-7 py-6 text-left max-[640px]:gap-4 max-[640px]:px-5 max-[640px]:py-5"
          onClick={onToggle}
          type="button"
        >
          <span className="text-xl leading-8 font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-lg max-[640px]:leading-7">{item.question}</span>
          <span className={`grid size-8 shrink-0 place-items-center rounded-full bg-[#e3f1fc] text-2xl leading-none text-[#08778f] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
        </button>
      </h3>
      <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} id={id}>
        <div className="overflow-hidden">
          <p className="px-7 pb-6 text-base leading-7 text-[#4a4a4a] [font-family:var(--font-manrope)] max-[640px]:px-5 max-[640px]:pb-5 max-[640px]:text-sm max-[640px]:leading-6">{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

export default function FaqPage() {
  const [category, setCategory] = useState(categories[0]);
  const [openQuestion, setOpenQuestion] = useState(0);
  const visibleFaqs = faqs.filter((item) => item.category === category);

  function selectCategory(nextCategory) {
    setCategory(nextCategory);
    setOpenQuestion(0);
  }

  return (
    <main className="overflow-x-clip bg-[#fcfcfc]">
      <Header homePath="/" activePage="faq" />

      <section className="relative mt-32 h-[444px] overflow-hidden max-[900px]:mt-[112px] max-[640px]:h-[470px]" aria-labelledby="faq-hero-title">
        <video aria-hidden="true" autoPlay className="absolute inset-0 size-full object-cover" loop muted playsInline preload="metadata">
          <source src="/assets/bg-sky.mp4" type="video/mp4" />
        </video>
        <div aria-hidden="true" className="pointer-events-none absolute top-[9px] right-[14px] h-[561px] w-[624px] overflow-hidden max-[780px]:right-[-170px] max-[780px]:opacity-55 max-[560px]:right-[-280px]">
          <Image className="absolute top-[-5.85%] left-[-60.11%] h-[118.78%] w-[160.06%] max-w-none" src="/assets/find-my-product/banner-model.png" alt="" width={999} height={667} priority />
        </div>
        <div className="relative z-10 mx-auto w-[min(1280px,89%)] pt-[60px] max-[640px]:pt-11">
          <SectionBadge>HELP CENTRE</SectionBadge>
          <h1 id="faq-hero-title" className="mt-5 max-w-[570px] text-5xl leading-[56px] font-semibold text-white [font-family:var(--font-gabarito)] max-[640px]:max-w-[330px] max-[640px]:text-[38px] max-[640px]:leading-[44px]">Questions, clearly answered.</h1>
          <p className="mt-4 max-w-[530px] text-base leading-7 text-white [font-family:var(--font-manrope)] max-[640px]:max-w-[315px] max-[640px]:text-sm max-[640px]:leading-6">Everything you need to know about ColorEyes contact lenses, everyday care and getting the support you need.</p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1280px,89%)] grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] items-start gap-20 py-[88px] max-[1000px]:gap-12 max-[800px]:grid-cols-1 max-[640px]:py-14" aria-labelledby="faq-title">
        <div className="max-[800px]:max-w-[595px]">
          <SectionBadge>FREQUENTLY ASKED QUESTIONS</SectionBadge>
          <h2 id="faq-title" className="mt-6 text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Find answers by topic</h2>
          <p className="mt-4 max-w-[420px] text-base leading-7 text-[#4a4a4a]">Select a category to explore helpful guidance for your lenses, your eye care routine and our support services.</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-x-7 gap-y-2 border-b border-[#c9d6db] max-[640px]:flex-nowrap max-[640px]:overflow-x-auto max-[640px]:overscroll-x-contain" role="tablist" aria-label="FAQ category">
            {categories.map((item) => (
              <button
                aria-controls="faq-answers"
                aria-selected={category === item}
                className={`shrink-0 cursor-pointer border-b-[3px] px-2.5 py-3 text-base leading-6 font-semibold [font-family:var(--font-manrope)] transition-colors ${category === item ? "border-[#2c2f71] text-[#2c2f71]" : "border-transparent text-[#363636] hover:text-[#2c2f71]"}`}
                id={`faq-tab-${item.toLowerCase().replaceAll(" ", "-")}`}
                key={item}
                onClick={() => selectCategory(item)}
                role="tab"
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div aria-labelledby={`faq-tab-${category.toLowerCase().replaceAll(" ", "-")}`} className="mt-8 space-y-3" id="faq-answers" role="tabpanel">
            {visibleFaqs.map((item, index) => <FaqItem item={item} index={index} isOpen={openQuestion === index} key={item.question} onToggle={() => setOpenQuestion((open) => open === index ? -1 : index)} />)}
          </div>
        </div>
      </section>

      <ContactSection
        id="faq-support"
        badge="Still Need Help?"
        title="Let’s Find the Right Answer"
        mobileTitle={["Let’s Find the", "Right Answer"]}
        description="Couldn’t find what you were looking for? Our team is ready to help with your questions about products, eye care or orders."
        primaryAction={{ href: "/contact-us", label: "Contact Us" }}
        secondaryAction={{ href: "tel:+919876543210", label: "Talk to Our Team" }}
        overlap={false}
      />

      <Footer homePath="/" />
    </main>
  );
}
