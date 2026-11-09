"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ActionLink from "@/components/home/ActionLink";
import SectionBadge from "@/components/home/SectionBadge";
import SellerSection from "@/components/product/SellerSection";
import { products } from "@/data/products";

const questions = [
  { question: "What brings you to color eyes?", type: "largeImage", options: [
    { label: "Vision Correction", description: "I need lenses to correct my vision", image: "/assets/find-my-product/q1-vision.png", crop: "left-0 top-[-29.5%] h-[175%] w-full" },
    { label: "Cosmetic Use", description: "I want to change or enhance my eye colour.", image: "/assets/find-my-product/q1-cosmetic.png", crop: "left-[.13%] top-[-22.68%] h-[233.33%] w-full" },
    { label: "Both Vision + Colour", description: "I want vision correction and a new look.", image: "/assets/find-my-product/q1-both.png", crop: "left-0 top-[-27.82%] h-[233.33%] w-full" },
    { label: "Professional Use", description: "For work, content creation or special purposes.", image: "/assets/find-my-product/q1-professional.png" },
  ] },
  { question: "What kind of look do you want?", type: "largeImage", options: [
    { label: "Natural Enhancement", description: "A subtle, natural-looking boost.", image: "/assets/find-my-product/q2-natural.png" },
    { label: "Noticeable Change", description: "A visible yet natural difference.", image: "/assets/find-my-product/q2-noticeable.png" },
    { label: "Bold Transformation", description: "A dramatic new look.", image: "/assets/find-my-product/q2-bold.png" },
    { label: "Occasion-Specific Look", description: "For events, photos or special moments.", image: "/assets/find-my-product/q2-occasion.png", crop: "left-[-.06%] top-[-15.68%] h-[155.56%] w-full" },
  ] },
  { question: "What is your natural eye colour?", type: "smallImage", options: [
    { label: "Dark Brown", image: "/assets/find-my-product/q3-dark-brown.png" },
    { label: "Medium Brown", image: "/assets/find-my-product/q3-medium-brown.png" },
    { label: "Light Brown", image: "/assets/find-my-product/q3-light-brown.png" },
    { label: "Grey", image: "/assets/find-my-product/q3-grey.png" },
    { label: "Not Sure", image: "/assets/find-my-product/q3-not-sure.png" },
  ] },
  { question: "Which shade family interests you?", type: "smallImage", options: [
    { label: "Brown", image: "/assets/find-my-product/q4-brown.png" },
    { label: "Grey", image: "/assets/find-my-product/q4-grey.png" },
    { label: "Hazel", image: "/assets/find-my-product/q4-hazel.png" },
    { label: "Green", image: "/assets/find-my-product/q4-green.png" },
    { label: "Blue", image: "/assets/find-my-product/q4-blue.png" },
  ] },
  { question: "How often will you wear them?", type: "icon", options: [
    { label: "Occasionally", description: "A few times a month", image: "/assets/find-my-product/q5-occasionally.svg" },
    { label: "Special Occasions", description: "Parties, weddings, etc", image: "/assets/find-my-product/q5-special.svg" },
    { label: "Few Times a Week", description: "2–4 days a week", image: "/assets/find-my-product/q5-week.svg" },
    { label: "Regular", description: "Almost everyday", image: "/assets/find-my-product/q5-regular.svg" },
  ] },
  { question: "Do you need power?", type: "power", options: [
    { label: "No Power / Plano", description: "For cosmetic use only", image: "/assets/find-my-product/q6-plano.svg" },
    { label: "Single-Vision Power", description: "I need vision correction", image: "/assets/find-my-product/q6-power.svg" },
    { label: "I’m Not Sure", description: "We recommend professional confirmation before first use.", image: "/assets/find-my-product/q6-unsure.svg" },
  ] },
];

function ProgressBar({ step }) {
  return <div className="flex h-5 w-[1020px] items-center gap-4 rounded-[10px] border border-[#1893ae] p-[3px] max-[1380px]:w-full max-[760px]:gap-2" aria-label={`Question ${step} of 6`}>
    {questions.map((_, index) => <span className={`h-[14px] flex-1 rounded-[10px] ${index < step ? "bg-[#1893ae]" : "bg-[#f5f5f5]"}`} key={index} />)}
  </div>;
}

function QuestionOption({ option, selected, type, onSelect }) {
  const activeClass = selected ? "border-[#1893ae] ring-1 ring-[#1893ae]" : "border-[rgba(102,102,102,.5)] hover:border-[#1893ae]";

  if (type === "largeImage") return <button className={`relative h-[207px] w-[267px] overflow-hidden rounded-[4px] border-[.8px] bg-white p-0 text-center transition ${activeClass} max-[1380px]:w-full`} type="button" onClick={onSelect} aria-pressed={selected}>
    <span className="absolute inset-x-0 top-0 block h-[114px] overflow-hidden"><Image className={`absolute max-w-none ${option.crop ?? "inset-0 size-full object-cover"}`} src={option.image} alt="" width={266} height={114} /></span>
    <span className="absolute top-[126.2px] left-1/2 block -translate-x-1/2 font-[family-name:var(--font-gabarito)] text-base leading-6 font-medium whitespace-nowrap text-[#232323]">{option.label}</span>
    <span className="absolute top-[153.2px] left-1/2 block w-[171px] -translate-x-1/2 text-sm leading-5 text-[#444] [font-family:var(--font-manrope)]">{option.description}</span>
  </button>;

  if (type === "smallImage") return <button className={`relative h-[169px] w-[203px] overflow-hidden rounded-[4px] border-[.8px] bg-white p-0 text-center transition ${activeClass} max-[1380px]:w-full`} type="button" onClick={onSelect} aria-pressed={selected}>
    <span className="absolute inset-x-0 top-0 block h-[114px] overflow-hidden"><Image className="object-cover" src={option.image} alt="" fill sizes="203px" /></span>
    <span className="absolute top-[126.2px] left-1/2 block -translate-x-1/2 font-[family-name:var(--font-gabarito)] text-base leading-6 font-medium whitespace-nowrap text-[#232323]">{option.label}</span>
  </button>;

  const isPower = type === "power";
  return <button className={`${isPower ? "h-[130px]" : "h-[117px]"} ${isPower && option.label === "I’m Not Sure" ? "w-[237px]" : "w-[198px]"} rounded-[4px] border-[.8px] bg-white text-center transition ${activeClass} max-[1380px]:w-full`} type="button" onClick={onSelect} aria-pressed={selected}>
    <Image className={`mx-auto ${isPower ? "mt-[10px] size-7" : "mt-[14px] size-6"}`} src={option.image} alt="" width={isPower ? 28 : 24} height={isPower ? 28 : 24} />
    <span className="mt-1.5 block font-[family-name:var(--font-gabarito)] text-base leading-6 font-medium text-[#232323]">{option.label}</span>
    <span className={`mx-auto mt-2 block text-sm leading-5 text-[#444] [font-family:var(--font-manrope)] ${isPower && option.label === "I’m Not Sure" ? "w-[198px]" : "w-[160px]"}`}>{option.description}</span>
  </button>;
}

function QuestionPanel({ item, index, progress, selected, onSelect }) {
  const imageQuestion = item.type === "largeImage";
  const panelHeight = imageQuestion ? "h-[447px]" : "h-[410px]";
  const optionsClass = item.type === "largeImage"
    ? "left-1/2 grid w-[1114px] -translate-x-1/2 grid-cols-4 gap-[15px]"
    : item.type === "smallImage"
      ? `${index === 2 ? "left-[103px] w-[1074px]" : "left-[95px] w-[1079px]"} grid grid-cols-5 gap-[15px]`
      : item.type === "icon"
        ? "left-[95px] grid w-[855px] grid-cols-4 gap-[21px]"
        : "left-[95px] grid w-[675px] grid-cols-[198px_198px_237px] gap-[21px] max-[1380px]:grid-cols-3";

  return <fieldset className={`relative ${panelHeight} overflow-hidden rounded-2xl bg-white shadow-[0_1px_16px_rgba(0,0,0,.1)] max-[760px]:h-auto max-[760px]:p-5`}>
    <legend className="sr-only">{item.question}</legend>
    <div className="absolute top-[62px] left-[62px] max-[1380px]:right-[62px] max-[1380px]:w-auto max-[760px]:static"><ProgressBar step={progress} /></div>
    <h3 className="absolute top-[117px] left-[63px] font-[family-name:var(--font-gabarito)] text-xl leading-[30px] font-semibold text-[#232323] max-[760px]:static max-[760px]:mt-7"><span className="mr-3">Q{index + 1}.</span>{item.question}</h3>
    <div className={`absolute top-[179px] ${optionsClass} max-[1380px]:right-[7.5%] max-[1380px]:left-[7.5%] max-[1380px]:w-[85%] max-[1380px]:translate-x-0 max-[760px]:static max-[760px]:mt-6 max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-4 max-[480px]:grid-cols-1`}>
      {item.options.map((option) => <QuestionOption key={option.label} option={option} selected={selected === option.label} type={item.type} onSelect={() => onSelect(option.label)} />)}
    </div>
  </fieldset>;
}

const selectionLabels = ["Purpose", "Look", "Eyecolor", "Shade", "Wear Frequency", "Power"];
const selectionIcons = [
  "/assets/find-my-product/popup-purpose.svg",
  "/assets/find-my-product/popup-look.svg",
  "/assets/find-my-product/popup-eye-color.svg",
  "/assets/find-my-product/popup-shade.svg",
  "/assets/find-my-product/popup-wear-frequency.svg",
  "/assets/find-my-product/popup-power.svg",
];

export default function FindMyProductPage() {
  const [answers, setAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const completed = Object.keys(answers).length;
  const recommended = products.filter((product) => product.category === "Celebration").slice(4, 8);

  const selectAnswer = (index, value) => {
    setAnswers((current) => ({ ...current, [index]: value }));
    setShowResults(false);
    if (index === questions.length - 1) {
      setShowConfirmation(true);
    } else {
      setActiveQuestion(index + 1);
    }
  };

  const confirmAnswers = () => {
    setShowConfirmation(false);
    setShowResults(true);
    window.setTimeout(() => document.querySelector("#recommendations")?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  };

  const editAnswer = (index) => {
    setShowConfirmation(false);
    setShowResults(false);
    setActiveQuestion(index);
  };

  return (
    <main className="overflow-x-clip bg-[#fcfcfc]">
      <Header homePath="/" activePage="home" />

      <section className="relative mt-32 h-[444px] overflow-hidden" aria-labelledby="find-lens-title">
        <video className="absolute inset-0 size-full object-cover" src="/assets/bg-sky.mp4" autoPlay loop muted playsInline aria-hidden="true" />
        <div className="pointer-events-none absolute top-[9px] right-[14px] h-[561px] w-[624px] overflow-hidden max-[780px]:right-[-170px] max-[780px]:opacity-55 max-[560px]:right-[-280px]" aria-hidden="true">
          <Image className="absolute top-[-5.85%] left-[-60.11%] h-[118.78%] w-[160.06%] max-w-none" src="/assets/find-my-product/banner-model.png" alt="" width={999} height={667} priority />
        </div>
        <div className="relative z-10 mx-auto w-[min(1280px,89%)] pt-[60px]">
          <SectionBadge>Your Perfect Lens Awaits</SectionBadge>
          <h1 id="find-lens-title" className="mt-5 max-w-[440px] text-5xl leading-[56px] font-semibold text-white [font-family:var(--font-gabarito)] max-[640px]:max-w-[320px] max-[640px]:text-[38px] max-[640px]:leading-[44px]">Find The Lens<br />That Feels Like You</h1>
          <p className="mt-4 max-w-[403px] text-base leading-6 text-white [font-family:var(--font-manrope)] max-[640px]:max-w-[300px] max-[640px]:text-sm">Answer a few questions and discover ColorEyes lenses suited to your vision, style and everyday needs.</p>
          <ActionLink className="mt-9" href="#lens-finder" variant="light">Find My Lens</ActionLink>
        </div>
      </section>

      <section className="mx-auto mt-20 w-[min(1280px,89%)] max-[760px]:mt-12" id="lens-finder" aria-labelledby="lens-finder-title">
        <h2 id="lens-finder-title" className="sr-only">Find your ideal contact lenses</h2>
        <div aria-live="polite"><QuestionPanel item={questions[activeQuestion]} index={activeQuestion} progress={completed} selected={answers[activeQuestion]} onSelect={(value) => selectAnswer(activeQuestion, value)} /></div>
      </section>

      {showResults && <>
        <section className="mt-20 w-full scroll-mt-28 bg-white py-[60px] max-[760px]:mt-12 max-[760px]:py-12" id="recommendations" aria-labelledby="recommendations-title">
          <div className="mx-auto w-[min(1280px,89%)]">
            <SectionBadge>Your Lens Match</SectionBadge>
            <h2 id="recommendations-title" className="mt-5 text-4xl leading-10 font-semibold text-[#232323] [font-family:var(--font-gabarito)] max-[640px]:text-3xl">Picked Around Your Preferences</h2>
            <p className="mt-3 text-base text-[#444] [font-family:var(--font-manrope)]">Based on your choices, these lenses could be a great fit.</p>
            <div className="mt-8 grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">{recommended.map((product) => <article className="overflow-hidden rounded border border-black/10 bg-white" key={product.slug}><Link className="relative block aspect-square bg-[#f4f4f6]" href={`/products/${product.slug}`}><Image className="object-contain p-5" src={product.featuredImage} alt={product.name} fill sizes="(max-width: 560px) 90vw, (max-width: 900px) 45vw, 305px" /></Link><div className="p-4"><h3 className="font-[family-name:var(--font-gabarito)] text-lg font-medium text-[#232323]">{product.name}</h3><p className="mt-1 text-sm text-[#444] [font-family:var(--font-manrope)]">{product.productType}</p><p className="mt-3 font-semibold text-[#1893ae]">{product.price}</p><Link className="mt-4 inline-block border-b border-[#1893ae] text-sm font-semibold text-[#137286]" href={`/products/${product.slug}`}>View product</Link></div></article>)}</div>
          </div>
        </section>
        <SellerSection compactTop product={{ selectedProductName: "Celebration Color Lenses", selectedProductSubtitle: "Premium Colored Contact Lenses" }} />
        <Footer homePath="/" />
      </>}

      {showConfirmation && <div className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-black/45 px-3 py-3" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="w-[min(710px,100%)] rounded-2xl bg-white p-7 shadow-[0_1px_16px_rgba(0,0,0,.1)] max-[520px]:p-4">
          <SectionBadge>Your Selections</SectionBadge>
          <h2 className="mt-3 text-[32px] leading-10 font-bold text-black [font-family:var(--font-gabarito)] max-[520px]:text-[28px] max-[520px]:leading-9" id="confirm-title">Confirm Your Choices</h2>
          <p className="mt-3 text-sm leading-5 text-[#666] [font-family:var(--font-manrope)]">Review your preferences before we find the ColorEyes lenses that matches you best</p>
          <div className="mt-6 grid grid-cols-2 gap-3 max-[520px]:mt-5 max-[520px]:grid-cols-1 max-[520px]:gap-2">{questions.map((item, index) => <div className="flex h-16 items-center rounded-xl bg-[#fcfcfc] p-2 shadow-[0_1px_16px_rgba(0,0,0,.1)] max-[520px]:h-14 max-[520px]:py-1" key={item.question}>
            <Image className="size-12 shrink-0" src={selectionIcons[index]} alt="" width={48} height={48} />
            <span className="ml-2.5 min-w-0 flex-1"><span className="block text-xs leading-[18px] text-[#232323] [font-family:var(--font-manrope)]">{selectionLabels[index]}</span><strong className="block truncate font-[family-name:var(--font-gabarito)] text-[15px] leading-5 font-semibold text-black">{answers[index]?.replace("Colour", "Color").replace("Single-Vision", "Single Vision")}</strong></span>
            <button className="ml-2 grid size-9 shrink-0 place-items-center transition hover:opacity-70" type="button" onClick={() => editAnswer(index)} aria-label={`Edit ${selectionLabels[index]}`}><Image src="/assets/find-my-product/popup-edit.svg" alt="" width={20} height={20} /></button>
          </div>)}</div>
          <button className="mt-6 h-10 w-full rounded-[4px] bg-[#1893ae] font-[family-name:var(--font-manrope)] text-sm font-semibold text-white transition hover:bg-[#137286] disabled:cursor-not-allowed disabled:opacity-50 max-[520px]:mt-5" type="button" onClick={confirmAnswers} disabled={completed !== questions.length}>Find My Matches</button>
        </div>
      </div>}
    </main>
  );
}
