"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import ActionLink from "@/components/home/ActionLink";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import SectionBadge from "@/components/home/SectionBadge";
import SellerSection from "@/components/product/SellerSection";

const sphereValues = Array.from({ length: 81 }, (_, index) => ((index - 56) * 0.25).toFixed(2));
const cylinderValues = Array.from({ length: 25 }, (_, index) => (index * -0.25).toFixed(2));
const axisValues = Array.from({ length: 18 }, (_, index) => `${(index + 1) * 10}°`);

const lensCards = [
  { name: "AquaVeil Clear Lens", price: "₹2,999.00", href: "/products/celebration-clear-monthly" },
  { name: "AquaVeil Clear Lens", price: "₹2,999.00", href: "/products/celebration-clear-toric-monthly" },
  { name: "AquaVeil Clear Lens", price: "₹2,999.00", href: "/products/celebration-clear-38-toric-yearly" },
  { name: "AquaVeil Clear Lens", price: "₹2,999.00", href: "/products" },
];

function PowerSelect({ id, label, value, values, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1 text-base leading-6 text-[#232323] [font-family:var(--font-gabarito)]">
        {label} <span className="grid size-3 place-items-center rounded-full border border-[#555] text-[8px] leading-none" aria-hidden="true">i</span>
      </span>
      <select
        className="h-12 w-full cursor-pointer rounded bg-[#e5e5e5] px-[15px] text-sm font-medium text-[#444] outline-none focus:ring-2 focus:ring-[#1893ae]"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {values.map((item) => <option value={item} key={item}>{item}</option>)}
      </select>
    </label>
  );
}

function ProductCard({ product }) {
  return (
    <article className="flex min-w-0 flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-[#666]/20 bg-white">
        <Image className="object-cover" src="/assets/power-calculator/product.png" alt={product.name} fill sizes="(max-width: 700px) 84vw, (max-width: 1000px) 42vw, 307px" />
      </div>
      <div className="px-3 pt-4">
        <h3 className="text-base leading-6 font-medium text-[#232323] [font-family:var(--font-gabarito)]">{product.name}</h3>
        <p className="mt-1 text-xs leading-5 text-[#666]">For 6 month use only.</p>
        <p className="mt-3 text-xs leading-5 text-[#666]">Available Variants</p>
        <Image className="mt-2 h-[22px] w-[104px]" src="/assets/power-calculator/variants.svg" alt="Four available lens variants" width={104} height={22} />
        <p className="mt-3 text-xl leading-[30px] font-medium text-[#097890] [font-family:var(--font-gabarito)]">{product.price}</p>
      </div>
      <Link className="mt-[20px] grid h-11 place-items-center rounded bg-[#1893ae] text-base font-semibold text-white transition hover:bg-[#147b91]" href={product.href}>View Details</Link>
    </article>
  );
}

function convertedPower(value) {
  const spectaclePower = Number(value);
  const converted = spectaclePower / (1 - (0.012 * spectaclePower));
  return (Math.round(converted * 4) / 4).toFixed(2);
}

export default function PowerCalculatorPage() {
  const [prescriptionType, setPrescriptionType] = useState("Toric");
  const [leftEye, setLeftEye] = useState({ sphere: "-14.00", cylinder: "-2.25", axis: "130°" });
  const [rightEye, setRightEye] = useState({ sphere: "-13.75", cylinder: "-1.75", axis: "160°" });
  const [results, setResults] = useState({ left: "-9.50", right: "-10.00" });
  const resultsRef = useRef(null);

  const updateEye = (eye, field, value) => {
    const setter = eye === "left" ? setLeftEye : setRightEye;
    setter((current) => ({ ...current, [field]: value }));
  };

  const prescriptionFields = useMemo(() => [
    ["sphere", "Sphere (SPH)", sphereValues],
    ...(prescriptionType === "Spherical" ? [] : [["cylinder", "Cylinder (CYL)", cylinderValues], ["axis", "Axis (AXI)", axisValues]]),
  ], [prescriptionType]);

  const calculate = () => {
    setResults({ left: convertedPower(leftEye.sphere), right: convertedPower(rightEye.sphere) });
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  };

  return (
    <main className="overflow-hidden bg-white">
      <Header homePath="/" activePage="home" />

      <section className="relative mt-32 h-[444px] overflow-hidden" aria-labelledby="power-calculator-title">
        <video className="absolute inset-0 size-full object-cover" src="/assets/bg-sky.mp4" autoPlay loop muted playsInline aria-hidden="true" />
        <div className="absolute top-0 right-[-5px] h-[472px] w-[min(49.25vw,709px)] max-[780px]:right-[-130px] max-[780px]:w-[600px] max-[560px]:opacity-45">
          <Image className="object-cover object-top" src="/assets/power-calculator/hero-model.png" alt="Woman wearing ColorEyes contact lenses" fill priority sizes="(max-width: 780px) 600px, 49vw" />
        </div>
        <div className="relative z-10 mx-auto h-full w-[min(1280px,calc(100%-160px))] pt-[60px] max-[900px]:w-[calc(100%-80px)] max-[640px]:w-[calc(100%-32px)]">
          <SectionBadge>Your Perfect Lens Awaits</SectionBadge>
          <h1 className="mt-5 max-w-[423px] text-5xl leading-[56px] font-semibold text-white [font-family:var(--font-gabarito)] max-[640px]:max-w-[320px] max-[640px]:text-[38px] max-[640px]:leading-[44px]" id="power-calculator-title">Find The Right Lens<br />Power For You</h1>
          <p className="mt-4 max-w-[473px] text-base leading-6 text-white max-[640px]:max-w-[330px] max-[640px]:text-sm">Use our power calculator to convert your prescription into contact lens powers and get personalized recommendations.</p>
          <ActionLink className="mt-9" href="#prescription-calculator" variant="light">Start Calculating</ActionLink>
        </div>
      </section>

      <section className="mx-auto mt-[42px] min-h-[855px] w-[min(1120px,calc(100%-48px))] rounded-2xl bg-white px-8 pt-[60px] pb-[60px] shadow-[0_1px_16px_rgba(0,0,0,.1)] max-[760px]:w-[calc(100%-32px)] max-[760px]:px-5 max-[760px]:pt-10 max-[760px]:pb-10" id="prescription-calculator" aria-labelledby="prescription-heading">
        <h2 className="text-center text-[32px] leading-10 font-semibold capitalize text-[#232323] [font-family:var(--font-gabarito)] max-[640px]:text-2xl" id="prescription-heading">Please select your prescription type</h2>
        <div className="mt-[45px] flex items-center justify-center gap-10 max-[640px]:gap-4">
          {["Spherical", "Toric", "Multi-focal"].map((type) => (
            <button className={`flex items-center gap-3 text-[28px] leading-9 [font-family:var(--font-gabarito)] max-[640px]:gap-2 max-[640px]:text-base ${prescriptionType === type ? "font-medium text-[#1893ae]" : "text-[#666]"}`} onClick={() => setPrescriptionType(type)} type="button" key={type}>
              <span className={`size-5 rounded-full border ${prescriptionType === type ? "border-[5px] border-[#1893ae]" : "border-[#666]"}`} aria-hidden="true" /> {type}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-[47px] grid w-[658px] max-w-full grid-cols-2 gap-x-[60px] max-[640px]:grid-cols-1 max-[640px]:gap-y-10">
          {[{ key: "left", label: "Left Eye", value: leftEye }, { key: "right", label: "Right Eye", value: rightEye }].map((eye) => (
            <div key={eye.key}>
              <h3 className="mb-[37px] text-center text-xl leading-[30px] font-medium text-[#232323] [font-family:var(--font-gabarito)]">{eye.label}</h3>
              <div className="space-y-7">
                {prescriptionFields.map(([field, label, values], index) => (
                  <div className={index ? "border-t border-[#d0d0d0] pt-7" : ""} key={field}>
                    <PowerSelect id={`${eye.key}-${field}`} label={label} value={eye.value[field]} values={values} onChange={(value) => updateEye(eye.key, field, value)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex h-8 w-[658px] max-w-full items-center gap-3 rounded bg-[#f0f7ff] px-4 text-xs text-black max-[640px]:h-auto max-[640px]:py-2">
          <Image className="size-5 shrink-0" src="/assets/power-calculator/info.svg" alt="" width={20} height={20} aria-hidden="true" />
          Results are for reference only. Always seek advice from your eye care specialist before making decisions.
        </div>
        <button className="mx-auto mt-7 flex h-11 items-center gap-4 rounded-[29px] bg-[#1893ae] py-0 pr-[5px] pl-5 text-sm font-bold text-white" onClick={calculate} type="button">Continue <span className="grid size-[34px] place-items-center rounded-full bg-white" aria-hidden="true"><Image src="/assets/newsletter-arrow.svg" alt="" width={20} height={20} /></span></button>
      </section>

      <section className="mt-20 scroll-mt-28 bg-[#fafafa] px-[5.55vw] pt-[60px] pb-[41px] max-[640px]:mt-12" ref={resultsRef} aria-labelledby="matches-heading">
        <div className="mx-auto max-w-[1280px]">
          <SectionBadge>Your Best Matches</SectionBadge>
          <h2 className="mt-5 text-4xl leading-12 font-bold text-black [font-family:var(--font-gabarito)] max-[640px]:text-3xl" id="matches-heading">Picked Around Your Preferences</h2>
          <p className="mt-5 text-base leading-6 text-[#444]">We’ve selected the ColorEyes lenses that best match your power.</p>
          <div className="mt-8 flex items-center justify-between gap-6 max-[700px]:items-start">
            <div className="flex flex-wrap gap-3"><span className="rounded-full border border-[#666] px-4 py-2 text-sm font-semibold text-[#666]">Left Eye: {results.left}</span><span className="rounded-full border border-[#666] px-4 py-2 text-sm font-semibold text-[#666]">Right Eye: {results.right}</span></div>
            <button className="inline-flex shrink-0 items-center gap-3 rounded-full border border-white bg-[#1893ae] px-4 py-2 text-sm font-semibold text-white" onClick={() => document.querySelector("#prescription-calculator")?.scrollIntoView({ behavior: "smooth" })} type="button"><Image src="/assets/power-calculator/recalculate.svg" alt="" width={17} height={17} aria-hidden="true" /> <span className="max-[520px]:hidden">Recalculate Power</span></button>
          </div>
          <div className="mt-12 grid grid-cols-4 gap-5 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
            {lensCards.map((product, index) => <ProductCard product={product} key={`${product.href}-${index}`} />)}
          </div>
        </div>
      </section>

      <SellerSection product={{ selectedProductName: "Celebration Color Lenses", selectedProductSubtitle: "Premium Colored Contact Lenses" }} />
      <Footer homePath="/" />
    </main>
  );
}
