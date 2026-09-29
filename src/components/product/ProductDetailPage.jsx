"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import WaveHeadingText from "@/components/home/WaveHeadingText";

const PDP_ASSET = "/assets/pdp";

const careCards = [
  ["98-828-imgGroup.svg", "Clean Hands First", "Wash and dry your hands thoroughly before touching your lenses.", true],
  ["98-828-imgFrame129.svg", "Insert Carefully", "Check that the lens is clean, undamaged and positioned correctly before placing it on your eye."],
  ["98-828-imgFrame130.svg", "Wear Responsibly", "Follow the recommended wear time and avoid wearing lenses longer than advised."],
  ["98-828-imgFrame131.svg", "Remove Gently", "Take your lenses out with clean hands and avoid pulling or rubbing the eye."],
  ["98-828-imgFrame132.svg", "Store Properly", "Use the recommended lens solution and keep reusable lenses in a clean case."],
  ["98-828-imgGroup1.svg", "Replace on Time", "Follow the prescribed replacement schedule for daily, monthly or yearly lenses.", true],
];

const lensTerms = [
  ["98-922-imgCalendar2Line.svg", "Weekly / Monthly", "Daily lenses are single-use, while monthly lenses can be worn repeatedly for up to 30 days with proper care."],
  ["power", "Power", "Shows the lens's vision-correction strength, typically in values like -2.00 or +1.50, matching your prescription."],
  ["diameter", "Diameter (DIA)", "The total width of the contact lens in millimetres. It affects how the lens sits on your eye and overall fit."],
  ["98-922-imgFrame99.svg", "Base Curve (BC)", "The right base curve helps the lens sit comfortably and remain stable."],
  ["98-922-imgCarbonRainDrop.svg", "Color Intensity", "Lower intensity gives a more natural enhancement; higher intensity creates a more noticeable look."],
  ["98-922-imgSparkling2Line.svg", "Care Tips", "Refers to what the lens is made from. Material can affect softness, hydration, oxygen flow and overall wearing comfort."],
];

const sellers = [
  ["VP", "Vision Point Opticals", "Linking Road, Bandra West", "Mon - Sat 10:30 AM to 7:30 PM"],
  ["ES", "Eye Style Studio", "RTO, Andheri West", "Mon - Fri 10:30 AM to 7:30 PM"],
  ["CV", "Clear View Optics", "Airport Road, Andheri East", "Mon - Fri 10:00 AM to 7:30 PM"],
];

function Asset({ file, alt, ...props }) {
  const src = file.startsWith("/") ? file : `${PDP_ASSET}/${file}`;
  return <Image src={src} alt={alt} {...props} />;
}

function SectionBadge({ children, white = false, asset = "98-828-imgImage.png" }) {
  return (
    <div className={`inline-flex h-10 items-center gap-2.5 rounded-full px-4 py-2 font-[family-name:var(--font-manrope)] text-sm leading-5 font-semibold text-black ${white ? "bg-white" : "bg-[#e3f1fc]"}`}>
      <Asset className="size-5 animate-[spin_4s_linear_infinite] object-cover will-change-transform motion-reduce:animate-none" file={asset} alt="" width={20} height={20} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function RoundAction({ children, href = "#", arrow = "98-828-imgImageArrowBlackIconSvgBlack.svg" }) {
  return (
    <Link className="inline-flex h-[52px] items-center gap-3 rounded-full bg-[#1893ae] py-1 pr-1 pl-5 font-[family-name:var(--font-manrope)] text-base font-semibold text-white" href={href}>
      {children}
      <span className="grid size-[46px] place-items-center rounded-full bg-white"><Asset file={arrow} alt="" width={18} height={18} aria-hidden="true" /></span>
    </Link>
  );
}

function ProductHero({ product }) {
  return (
    <section className="relative h-[546px] overflow-hidden bg-white max-[850px]:h-auto">
      <Swiper
        a11y={{ enabled: true }}
        autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="pdp-product-gallery h-[546px] w-full overflow-hidden max-[850px]:h-[420px] [&_.swiper-pagination]:bottom-2! [&_.swiper-pagination]:left-0! [&_.swiper-pagination]:flex [&_.swiper-pagination]:w-[calc(100%-74px)]! [&_.swiper-pagination]:justify-center [&_.swiper-pagination]:gap-1.5 [&_.swiper-pagination]:py-3 max-[850px]:[&_.swiper-pagination]:w-full! [&_.swiper-pagination-bullet]:m-0! [&_.swiper-pagination-bullet]:size-2! [&_.swiper-pagination-bullet]:bg-[#666b7b]! [&_.swiper-pagination-bullet]:opacity-100! [&_.swiper-pagination-bullet-active]:bg-white!"
        grabCursor
        keyboard={{ enabled: true }}
        loop
        modules={[A11y, Autoplay, Keyboard, Pagination]}
        pagination={{ clickable: true }}
        slidesPerView="auto"
        speed={700}
      >
        {product.galleryImages.map(([file, alt], index) => (
          <SwiperSlide className="relative h-full! w-[554px]! border-r-4 border-white max-[850px]:w-[82vw]!" key={file}>
            <Asset file={file} className="object-cover" alt={alt} fill preload={index === 0} sizes="(max-width: 850px) 82vw, 554px" />
          </SwiperSlide>
        ))}
      </Swiper>
      <article className="absolute top-1/2 right-20 z-20 w-[500px] -translate-y-1/2 rounded-2xl bg-white p-5 shadow-[0_10px_25px_rgba(27,28,43,.05)] max-[1100px]:right-8 max-[850px]:relative max-[850px]:top-auto max-[850px]:right-auto max-[850px]:mx-auto max-[850px]:mt-[-24px] max-[850px]:mb-4 max-[850px]:w-[calc(100%_-_2rem)] max-[850px]:translate-y-0">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[18px]">
            <div className="flex flex-col gap-3">
              <p className="font-[family-name:var(--font-manrope)] text-base leading-[22.4px] text-[#68809a]">{product.productType}</p>
              <div><h1 className="font-[family-name:var(--font-gabarito)] text-[32px] leading-10 font-semibold text-black max-[520px]:text-[28px] max-[520px]:leading-9"><WaveHeadingText lines={product.name} /></h1><p className="mt-2 font-[family-name:var(--font-manrope)] text-xs leading-[16.8px] text-[#666b7b]">{product.tagline}</p></div>
            </div>
            <div className="flex h-[25px] items-start gap-5 px-2 font-[family-name:var(--font-manrope)] text-sm leading-5 font-medium text-[#666b7b] max-[520px]:h-auto max-[520px]:flex-wrap max-[380px]:gap-x-3">
              {product.features.map((item) => <span className="flex items-center gap-[11px] whitespace-nowrap" key={item}><Asset file="98-652-imgEllipse291.svg" alt="" width={8} height={8} />{item}</span>)}
            </div>
          </div>
          <div className={product.hasColorVariants ? "" : "invisible"} aria-hidden={!product.hasColorVariants}>
            <p className="font-[family-name:var(--font-gabarito)] text-sm leading-5 font-medium">Available in {product.shadeCount} Shades</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {product.variantColors
                ? product.variantColors.map(([name, color], index) => (
                    <button className={`grid size-10 shrink-0 place-items-center rounded-full border ${index === 0 ? "border-[#097890]" : "border-[#666]/60"}`} aria-label={`Choose ${name}`} key={name} title={name} type="button">
                      <span className="size-9 rounded-full" style={{ backgroundColor: color }} />
                    </button>
                  ))
                : Array.from({ length: product.shadeCount }, (_, index) => (
                    <button className={`grid size-10 shrink-0 place-items-center rounded-full border ${index === 0 ? "border-[#097890]" : "border-[#666]/60"}`} aria-label={`Choose shade ${index + 1}`} key={index} type="button">
                      <Asset file="98-652-imgEllipse278.png" className="size-9 rounded-full object-cover" alt="" width={36} height={36} />
                    </button>
                  ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3"><strong className="shrink-0 font-[family-name:var(--font-gabarito)] text-2xl leading-9 font-semibold text-[#097890]">{product.price}</strong><div className="flex min-w-0 items-center gap-2 font-[family-name:var(--font-gabarito)] text-base leading-6 font-medium"><span className="shrink-0">{product.rating}/5</span><Asset file="98-652-imgFrame150.svg" className="h-auto max-w-full" alt={`${product.rating} out of five stars`} width={116} height={20} /></div></div>
            <p className="font-[family-name:var(--font-manrope)] text-[13.6px] leading-[19px] text-black/70">{product.note}</p>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-5 max-[520px]:grid-cols-1"><a className="grid h-11 place-items-center rounded-lg bg-[#097890] font-[family-name:var(--font-gabarito)] text-base font-medium text-white" href="#seller">Enquire Now</a><a className="grid h-11 place-items-center rounded-lg border border-[#097890] font-[family-name:var(--font-gabarito)] text-base font-medium text-[#097890]" href="https://wa.me/919876543210" rel="noreferrer" target="_blank">Reach Us On Whatsapp</a></div>
      </article>
    </section>
  );
}

function FeatureMarquee({ features }) {
  return (
    <div className="h-12 overflow-hidden bg-gradient-to-r from-[#097890] to-[#03232a] font-[family-name:var(--font-manrope)] text-xl lowercase text-white max-[900px]:text-sm">
      <div className="flex h-full w-max animate-[pdp-feature-marquee-right_24s_linear_infinite] will-change-transform motion-reduce:animate-none motion-reduce:[transform:translate3d(0,0,0)]">
        {[0, 1].map((copy) => (
          <div className="flex h-full shrink-0 items-center gap-8 pr-8 max-[900px]:gap-4 max-[900px]:pr-4" aria-hidden={copy === 1} key={copy}>
            {features.map((item) => (
              <span className="flex shrink-0 items-center gap-8 max-[900px]:gap-4" key={item}>
                <Asset file="98-920-imgEllipse292.svg" alt="" width={13} height={13} />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailsSection({ product }) {
  const [open, setOpen] = useState("Specifications");
  const [openSpecificationGroup, setOpenSpecificationGroup] = useState("");
  const rows = ["Specifications", "Power Range", "Description"];
  const specificationGroups = product.specificationGroups ?? [
    {
      title: "Lens",
      items: [["Lens Type", product.productType]],
    },
    {
      title: "Overview",
      items: [
        ["Product Type", product.productType],
        ["Usage Duration", product.note.replace(/^For /, "").replace(/ only\.$/, "")],
      ],
    },
    {
      title: "General",
      items: [
        ["Brand", product.category],
        ["Product", product.name],
      ],
    },
  ];
  return (
    <section className={`relative overflow-hidden bg-[linear-gradient(180deg,#eef3f8_0%,rgba(238,243,248,0)_50%),linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))] max-[850px]:h-auto max-[850px]:pb-[520px] ${(open === "Specifications" && openSpecificationGroup) || (open === "Description" && product.descriptionBenefits) ? "h-[880px]" : "h-[692px]"}`}>
      <div className="absolute right-0 bottom-0 h-[712px] w-[700px] overflow-hidden max-[850px]:h-[520px] max-[850px]:w-full"><Asset className="absolute top-0 left-[-41.29%] h-full w-[152.57%] max-w-none" file={product.detailsImage} alt={`Model wearing ${product.name} contact lenses`} width={1068} height={712} /></div>
      <div className="absolute top-[193px] left-20 z-10 w-[532px] bg-white p-3 max-[850px]:relative max-[850px]:top-auto max-[850px]:left-auto max-[850px]:m-6 max-[850px]:w-auto">
        {rows.map((row) => (
          <div className="border-b border-[#edf2f7]" key={row}>
            <button aria-expanded={open === row} className="flex min-h-[70px] w-full items-center justify-between px-6 text-left font-[family-name:var(--font-gabarito)] text-lg tracking-[-.5px] text-[#1b1c2b]" onClick={() => setOpen(open === row ? "" : row)} type="button">{row}<Asset className={`size-6 transition-transform duration-200 ${open === row ? "-rotate-90" : "rotate-90"}`} file="98-760-imgArrowRightSLine.svg" alt="" width={24} height={24} /></button>
            {row === "Specifications" && open === row && (
              <div className="px-6 pb-3">
                  {specificationGroups.map((group) => (
                    <section className="border-t border-[#edf2f7] first:border-t-0" key={group.title}>
                      <h3>
                        <button
                          aria-expanded={openSpecificationGroup === group.title}
                          className="flex h-11 w-full items-center justify-between px-2 text-left font-[family-name:var(--font-gabarito)] text-sm font-medium text-[#232323]"
                          onClick={() => setOpenSpecificationGroup(openSpecificationGroup === group.title ? "" : group.title)}
                          type="button"
                        >
                          {group.title}
                          <Asset className={`transition-transform duration-200 ${openSpecificationGroup === group.title ? "rotate-45" : ""}`} file="98-760-imgAddCircleLine.svg" alt="" width={20} height={20} />
                        </button>
                      </h3>
                      {openSpecificationGroup === group.title && (
                        <dl className="px-2 pb-3 font-[family-name:var(--font-manrope)] text-sm">
                          {group.items.map(([label, value]) => (
                            <div className="grid grid-cols-[minmax(120px,1fr)_minmax(150px,1.15fr)] gap-4 border-t border-[#edf2f7] py-2.5" key={label}>
                              <dt className="text-[#666b7b]">{label}</dt>
                              <dd className="font-semibold text-[#232323]">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </section>
                  ))}
              </div>
            )}
            {row === "Power Range" && open === row && (
              product.powerRange ? (
                <div className="overflow-x-auto px-6 pb-6">
                  <table className="w-full min-w-[450px] border-collapse overflow-hidden rounded-lg text-left">
                    <thead className="bg-[#097890] font-[family-name:var(--font-gabarito)] text-xs font-semibold text-white">
                      <tr>
                        {(product.powerRange.headers ?? ["Spherical", "Cylindrical", "Axis"]).map((header) => <th className="px-3 py-2.5" scope="col" key={header}>{header}</th>)}
                      </tr>
                    </thead>
                    <tbody className="font-[family-name:var(--font-manrope)] text-xs leading-5 text-[#444]">
                      {product.powerRange.rows
                        ? product.powerRange.rows.map((rangeRow) => (
                            <tr className="border-t border-[#d8e3ec] bg-white" key={rangeRow.join("-")}>
                              {rangeRow.map((value, index) => index === 0
                                ? <th className="bg-[#f7fbfe] px-3 py-3 font-semibold text-[#232323]" scope="row" key={value}>{value}</th>
                                : <td className="px-3 py-3" key={value}>{value}</td>)}
                            </tr>
                          ))
                        : product.powerRange.spherical.map((spherical, index) => (
                            <tr className="border-t border-[#d8e3ec] bg-[#f7fbfe]" key={spherical}>
                              <th className="px-3 py-3 font-semibold text-[#232323]" scope="row">{spherical}</th>
                              {index === 0 && <td className="bg-white px-3 py-3 align-middle" rowSpan={product.powerRange.spherical.length}>{product.powerRange.cylindrical}</td>}
                              <td className="bg-white px-3 py-3">{product.powerRange.axis[index]}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="px-6 pb-6 font-[family-name:var(--font-manrope)] text-sm leading-6 text-[#666b7b]">Power range details are available from an authorized seller.</p>
              )
            )}
            {row === "Description" && open === row && (
              <div className="px-6 pb-6 font-[family-name:var(--font-manrope)] text-sm leading-6 text-[#666b7b]">
                {product.descriptionBenefits && (
                  <div className="mb-4">
                    <h3 className="font-[family-name:var(--font-gabarito)] text-base font-semibold text-[#232323]">Benefits &amp; Features</h3>
                    <ul className="mt-2 list-disc pl-5">
                      {product.descriptionBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                    </ul>
                  </div>
                )}
                <p>{product.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterSection({ product }) {
  const [dividerPosition, setDividerPosition] = useState(50);

  return (
    <section className="relative mt-7 h-[930px] bg-white max-[850px]:h-auto max-[850px]:px-6 max-[850px]:py-14">
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 max-[850px]:static max-[850px]:mx-auto max-[850px]:w-fit max-[850px]:translate-x-0"><SectionBadge asset="98-813-imgImage.png">See the Difference</SectionBadge></div>
      <h2 className="absolute top-[124px] left-1/2 w-[572px] -translate-x-1/2 text-center font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-bold max-[850px]:static max-[850px]:mt-6 max-[850px]:w-auto max-[850px]:translate-x-0 max-[850px]:text-3xl"><WaveHeadingText lines="See the Change for Yourself" /></h2>
      <div className="absolute top-[220px] left-1/2 h-[710px] w-[min(1280px,89%)] -translate-x-1/2 overflow-hidden rounded-lg max-[850px]:relative max-[850px]:top-auto max-[850px]:left-auto max-[850px]:mt-9 max-[850px]:h-[480px] max-[850px]:w-full max-[850px]:translate-x-0">
        <Asset className="object-cover" file={product.beforeAfterImage} alt={`Before and after wearing ${product.name} lenses`} fill sizes="(max-width:850px) 100vw,1280px" />
        <span className="absolute top-16 left-16 font-[family-name:var(--font-gabarito)] text-base font-medium">Before</span>
        <span className="absolute top-16 right-16 font-[family-name:var(--font-gabarito)] text-base font-medium">After</span>
        <span className="pointer-events-none absolute top-0 bottom-0 z-10 w-px -translate-x-1/2 bg-white" style={{ left: `${dividerPosition}%` }} />
        <Asset className="pointer-events-none absolute top-[79.3%] z-10 size-8 -translate-x-1/2" style={{ left: `${dividerPosition}%` }} file="98-813-imgFrame127.svg" alt="" width={32} height={32} />
        <input
          aria-label="Drag to compare before and after"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          max="100"
          min="0"
          onChange={(event) => setDividerPosition(Number(event.target.value))}
          type="range"
          value={dividerPosition}
        />
      </div>
    </section>
  );
}

function CareIcon({ file, layered }) {
  if (!layered) return <Asset file={file} alt="" width={60} height={60} />;
  return <span className="relative block size-[60px]"><Asset className="absolute inset-0" file="98-828-imgEllipse280.svg" alt="" width={60} height={60} /><Asset className="absolute top-[14px] left-[15px] size-8" file={file} alt="" width={32} height={32} /></span>;
}

function CareSection() {
  return (
    <section className="relative mt-7 h-[803px] bg-[#097890] px-6 pt-[60px] text-white max-[1100px]:h-auto max-[1100px]:pb-16">
      <div className="mx-auto w-fit"><SectionBadge asset="98-828-imgImage.png">Wear With Care</SectionBadge></div><h2 className="mt-6 text-center font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-bold max-[650px]:text-3xl max-[650px]:leading-10"><WaveHeadingText lines="Simple Habits. Healthier Eyes." /></h2><p className="mx-auto mt-5 w-[522px] text-center font-[family-name:var(--font-manrope)] text-base leading-6 max-[600px]:w-full">Follow a few essential steps to keep your lenses clean, comfortable and safe throughout everyday wear.</p>
      <div className="mx-auto mt-12 grid w-full max-w-[1282px] grid-cols-6 gap-5 max-[1100px]:grid-cols-3 max-[650px]:grid-cols-1 max-[650px]:gap-3">{careCards.map(([icon, title, copy, layered], index) => <article className="min-h-[287px] rounded-lg bg-[#f9fcfe] p-5 text-[#232323] shadow-[0_1px_14px_rgba(0,0,0,.16)] max-[650px]:min-h-0 max-[650px]:p-4" key={title}><CareIcon file={icon} layered={layered} /><h3 className={`${index === 0 || index === 4 ? "mt-5" : "mt-4"} whitespace-nowrap font-[family-name:var(--font-gabarito)] text-xl leading-[30px] font-semibold max-[650px]:mt-3`}>{title}</h3><p className={`${index === 0 ? "mt-[17px]" : "mt-3"} font-[family-name:var(--font-manrope)] text-sm leading-[22px] text-[#444] max-[650px]:mt-2`}>{copy}</p></article>)}</div>
      <div className="mx-auto mt-9 flex min-h-12 w-full max-w-[1282px] items-center gap-3 rounded bg-[#f0f7ff] px-[9px] font-[family-name:var(--font-manrope)] text-sm text-[#444] max-[650px]:items-start max-[650px]:px-4 max-[650px]:py-3"><span className="relative block size-8 shrink-0"><Asset className="absolute inset-0" file="98-828-imgEllipse281.svg" alt="" width={32} height={32} /><Asset className="absolute top-1.5 left-1.5" file="98-828-imgGroup2.svg" alt="" width={20} height={20} /></span>If you experience persistent redness, irritation, pain or blurred vision, remove the lenses and consult an eye-care professional.</div>
      <div className="mt-8 text-center"><RoundAction>Know Your Eyes</RoundAction></div>
    </section>
  );
}

function LensTermIcon({ icon }) {
  if (icon === "power") return <span className="relative size-6 shrink-0"><Asset className="absolute top-0.5 left-0.5" file="98-922-imgEllipse6.svg" alt="" width={20} height={20} /><span className="absolute inset-0 grid place-items-center font-[family-name:var(--font-manrope)] text-xs text-[#097890]">P</span></span>;
  if (icon === "diameter") return <span className="relative size-6 shrink-0"><Asset className="absolute top-0.5 left-0.5" file="98-922-imgEllipse5.png" alt="" width={20} height={20} /><Asset className="absolute top-[9px] left-1.5" file="98-922-imgVector29.svg" alt="" width={12} height={6} /></span>;
  return <Asset className="size-6 shrink-0" file={icon} alt="" width={24} height={24} />;
}

function LensKnowledgeSection() {
  const [activeTooltip, setActiveTooltip] = useState(0);

  return (
    <section className="h-[454px] bg-gradient-to-t from-[rgba(242,251,253,.8)] to-50% to-white max-[1100px]:h-auto max-[1100px]:pb-16">
      <div className="mx-auto h-full w-full max-w-[1440px] px-20 pt-[60px] max-[850px]:px-6 max-[650px]:pt-12">
        <SectionBadge asset="98-922-imgImage.png">Lens Knowledge</SectionBadge>
        <h2 className="mt-5 font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-bold max-[650px]:text-3xl max-[650px]:leading-10"><WaveHeadingText lines="Understand The Lens Detail" /></h2>
        <p className="mt-5 font-[family-name:var(--font-manrope)] text-base leading-7 text-[#444] max-[650px]:text-sm max-[650px]:leading-6">Quick plain-language explanations of key terms to help you choose with confidence.</p>
        <div className="mt-12 grid w-full grid-cols-6 gap-5 max-[1280px]:gap-3 max-[1100px]:grid-cols-2 max-[1100px]:gap-4 max-[650px]:mt-8 max-[650px]:grid-cols-1 max-[650px]:gap-3">
          {lensTerms.map(([icon, title, tooltip], index) => {
            const isTooltipVisible = activeTooltip === index;

            return (
              <div
                className="relative min-w-0"
                key={title}
                onPointerEnter={(event) => event.pointerType === "mouse" && setActiveTooltip(index)}
              >
                <button
                  aria-describedby={`lens-tooltip-${index}`}
                  aria-expanded={isTooltipVisible}
                  className={`flex h-[60px] w-full items-center gap-2.5 overflow-hidden rounded-[28px] border bg-white px-4 font-[family-name:var(--font-gabarito)] text-[14px] leading-5 font-normal shadow-[0_1px_6px_rgba(0,0,0,.1)] transition-colors max-[1280px]:gap-2 max-[1280px]:px-3 max-[1280px]:text-[13px] max-[650px]:h-14 ${isTooltipVisible ? "border-[#097890] text-[#097890]" : "border-[#666]/50 text-black"}`}
                  onClick={() => setActiveTooltip(activeTooltip === index ? -1 : index)}
                  type="button"
                >
                  <LensTermIcon icon={icon} />
                  <span className="min-w-0 whitespace-nowrap">{title}</span>
                </button>
                <div
                  className={`pointer-events-none absolute top-[43px] left-0 z-20 min-h-[105px] w-[197px] max-w-full drop-shadow-[0_1px_6px_rgba(0,0,0,.1)] transition-opacity duration-150 max-[1100px]:static max-[1100px]:mt-2 max-[1100px]:min-h-0 max-[1100px]:w-full max-[1100px]:max-w-none max-[1100px]:rounded-xl max-[1100px]:border max-[1100px]:border-[#d8e3ec] max-[1100px]:bg-white max-[1100px]:p-4 max-[1100px]:drop-shadow-none ${isTooltipVisible ? "visible opacity-100 max-[1100px]:block" : "invisible opacity-0 max-[1100px]:hidden"}`}
                  id={`lens-tooltip-${index}`}
                  role="tooltip"
                >
                  <Asset className="absolute top-[5.5px] left-0 w-[197px] max-w-full max-[1100px]:hidden" style={{ height: "calc(100% - 5.5px)" }} file="98-922-imgUnion1.svg" alt="" width={197} height={100} />
                  <p className="relative w-full px-1.5 pt-[27px] pb-1.5 font-[family-name:var(--font-manrope)] text-[12px] leading-[18px] font-normal text-[#444] max-[1100px]:p-0 max-[1100px]:text-sm max-[1100px]:leading-6">{tooltip}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SellerAction({ icon, children }) {
  return <button className="flex h-9 items-center gap-1.5 rounded border border-[#097890] px-2.5 font-[family-name:var(--font-gabarito)] text-xs font-medium whitespace-nowrap text-[#097890]" type="button"><Asset file={icon} alt="" width={16} height={16} />{children}</button>;
}

function FieldIcon({ type }) {
  if (type === "location") return <Asset file="98-936-imgGroup.svg" alt="" width={20} height={20} />;
  if (type === "city") return <Asset file="98-936-imgGriddyIconsCity.svg" alt="" width={20} height={20} />;
  return <Asset file="98-936-imgMapPin3Line.svg" alt="" width={20} height={20} />;
}

function SellerSection({ product }) {
  const fields = [["State", "Maharashtra", "location"], ["City", "Mumbai", "city"], ["Pin code", "400053", "pin"]];
  return (
    <section className="h-[882px] bg-[#fcfcfc] px-20 pt-[60px] max-[1280px]:h-auto max-[1280px]:pb-16 max-[1050px]:px-6" id="seller">
      <div className="mx-auto w-fit"><SectionBadge asset="98-936-imgImage.png">Where to Buy</SectionBadge></div>
      <h2 className="mt-6 text-center font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-bold max-[650px]:text-3xl max-[650px]:leading-10"><WaveHeadingText lines="Find A Seller Near You" /></h2>
      <p className="mt-5 text-center font-[family-name:var(--font-manrope)] text-base leading-6 text-[#444]">Choose your state and city to discover authorized distributors carrying this product.</p>
      <div className="mt-12 grid grid-cols-[413px_1fr] gap-5 max-[1280px]:grid-cols-1">
        <aside className="h-[458px] rounded-xl bg-[#f0f7ff] p-6 shadow-[0_1px_12px_rgba(0,0,0,.1)]"><p className="font-[family-name:var(--font-gabarito)] text-base font-medium">Selected Product</p><div className="mt-4 flex h-16 items-center gap-3 rounded bg-white px-3"><Asset file="98-936-imgEllipse282.svg" alt="" width={32} height={32} /><span><b className="block font-[family-name:var(--font-gabarito)] text-sm font-medium">{product.selectedProductName}</b><small className="font-[family-name:var(--font-manrope)] text-xs text-[#444]">{product.selectedProductSubtitle}</small></span></div>{fields.map(([label, value, type]) => <label className="mt-4 block font-[family-name:var(--font-gabarito)] text-base font-medium" key={label}>{label}<span className="mt-3 flex h-12 items-center justify-between rounded bg-white px-3.5 font-[family-name:var(--font-manrope)] text-sm font-normal text-[#444]"><span className="flex items-center gap-3"><FieldIcon type={type} />{value}</span><Asset file="98-936-imgEpArrowDownBold.svg" alt="" width={16} height={16} /></span></label>)}</aside>
        <div className="h-[558px] rounded-xl bg-white p-6 shadow-[0_1px_12px_rgba(0,0,0,.1)] max-[760px]:h-auto">
          <h3 className="font-[family-name:var(--font-gabarito)] text-xl leading-[30px] font-medium">3 Available Sellers</h3>
          <div className="mt-6 grid gap-[15px]">
            {sellers.map(([initials, name, address, hours]) => (
              <article
                className="grid h-[142px] grid-cols-[72px_minmax(170px,1fr)_auto] items-start gap-x-[18px] rounded-xl border border-black/10 p-5 max-[760px]:h-auto max-[760px]:grid-cols-[60px_minmax(0,1fr)] max-[760px]:gap-y-3 max-[520px]:p-4"
                key={name}
              >
                <span className="relative grid size-[72px] place-items-center self-center font-[family-name:var(--font-gabarito)] text-xl font-medium text-white max-[760px]:size-[60px] max-[520px]:text-lg">
                  <Asset className="absolute inset-0 size-full" file="98-936-imgEllipse283.svg" alt="" width={80} height={80} />
                  <span className="relative">{initials}</span>
                </span>
                <div>
                  <h4 className="font-[family-name:var(--font-gabarito)] text-lg leading-7 font-medium max-[520px]:text-base">{name}</h4>
                  <p className="mt-2.5 flex items-center gap-2 font-[family-name:var(--font-gabarito)] text-[13px] leading-[18px] text-[#444]">
                    <Asset file="98-936-imgGroup1.svg" alt="" width={20} height={20} />
                    Mumbai, Maharashtra
                  </p>
                  <p className="mt-2.5 flex items-center gap-2 font-[family-name:var(--font-gabarito)] text-[13px] leading-[18px] text-[#444]">
                    <Asset file="98-936-imgGriddyIconsCity.svg" alt="" width={20} height={20} />
                    {address}
                  </p>
                </div>
                <div className="min-w-max max-[760px]:col-span-2 max-[760px]:ml-[78px] max-[520px]:ml-0 max-[520px]:min-w-0">
                  <div className="flex items-center justify-end gap-2 max-[520px]:justify-start max-[420px]:flex-wrap">
                    <SellerAction icon="98-936-imgFamiconsCallOutline.svg">Call</SellerAction>
                    <SellerAction icon="98-936-imgBiWhatsapp.svg">Whatsapp</SellerAction>
                    <SellerAction icon="98-936-imgFluentDirections24Regular.svg">Directions</SellerAction>
                  </div>
                  <p className="mt-2.5 text-right font-[family-name:var(--font-gabarito)] text-xs leading-[18px] whitespace-nowrap text-[#444] max-[520px]:text-left max-[420px]:whitespace-normal">{hours}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ faqs }) {
  const [open, setOpen] = useState(0);
  return <section className="grid h-[484px] grid-cols-[minmax(320px,500px)_minmax(0,740px)] gap-10 bg-[#fcfcfc] px-20 pt-[60px] max-[1050px]:h-auto max-[1050px]:grid-cols-1 max-[1050px]:px-6 max-[1050px]:pb-16 max-[600px]:gap-8 max-[600px]:pt-12 max-[600px]:pb-12"><div><SectionBadge asset="98-1043-imgImage.png">Need to Know</SectionBadge><h2 className="mt-1 max-w-[416px] font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-semibold text-[#232323] max-[600px]:mt-3 max-[600px]:text-3xl max-[600px]:leading-10"><WaveHeadingText lines={["Questions, Clearly", "Answered."]} /></h2></div><div className="min-w-0 space-y-3 pt-4 max-[600px]:space-y-2.5 max-[600px]:pt-0">{faqs.map(([question, answer], index) => <article className="w-full rounded bg-white shadow-[0_1px_12px_rgba(0,0,0,.08)] max-[600px]:rounded-lg" key={question}><button aria-expanded={open === index} className="flex min-h-[60px] w-full items-center justify-between gap-3 px-3 text-left font-[family-name:var(--font-gabarito)] text-xl leading-9 font-medium text-[#232323] max-[600px]:min-h-14 max-[600px]:px-4 max-[600px]:py-3 max-[600px]:text-base max-[600px]:leading-6" onClick={() => setOpen(open === index ? -1 : index)} type="button"><span className="min-w-0">{index + 1}.&nbsp; {question}</span><Asset file={open === index ? "98-1043-imgArrowDownSLine1.svg" : "98-1043-imgArrowDownSLine.svg"} className={`shrink-0 transition-transform duration-200 ${open === index ? "rotate-180" : ""}`} alt="" width={24} height={24} /></button>{open === index && <p className="px-11 pb-4 font-[family-name:var(--font-manrope)] text-base leading-7 text-[#444] max-[600px]:px-4 max-[600px]:pb-4 max-[600px]:text-sm max-[600px]:leading-6">{answer}</p>}</article>)}</div></section>;
}

function ReviewSection() {
  return <section className="relative h-[360px] overflow-hidden bg-[#f0f7ff] px-20 pt-[60px] max-[700px]:h-[680px] max-[700px]:px-6"><SectionBadge white asset="98-1071-imgImage.png">Write your review</SectionBadge><h2 className="mt-5 font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-bold max-[700px]:text-3xl max-[700px]:leading-10"><WaveHeadingText lines="Your Experience Matters" /></h2><p className="mt-4 font-[family-name:var(--font-manrope)] text-base leading-6 max-[700px]:max-w-[310px] max-[700px]:text-sm">Share your insights to assist others in making informed decisions.</p><div className="mt-10 max-[700px]:mt-8"><RoundAction arrow="98-1071-imgImageArrowBlackIconSvgBlack.svg">Write a Review</RoundAction></div><div className="absolute top-0 right-0 h-[438px] w-[488px] overflow-hidden max-[900px]:right-[-100px] max-[700px]:top-auto max-[700px]:right-0 max-[700px]:bottom-0 max-[700px]:h-[310px] max-[700px]:w-full"><Asset className="absolute top-[-5.85%] left-[-60.11%] h-[118.78%] w-[160.06%] max-w-none max-[700px]:top-0 max-[700px]:left-[calc(50%-245px)] max-[700px]:h-[310px] max-[700px]:w-[475px]" file="98-1071-imgRectangle2.png" alt="Customer wearing coloured lenses" width={781} height={520} /></div></section>;
}

function RelatedProductCard({ product }) {
  return <article className="flex h-[549px] flex-col max-[560px]:h-auto"><div className="relative h-[307px] shrink-0 overflow-hidden rounded-lg border border-[#666]/20 max-[560px]:h-[220px]"><Asset className="object-cover" file={product.image} alt={product.imageAlt} fill sizes="(max-width:560px) 44vw,307px" /></div><h3 className="mt-4 ml-3 font-[family-name:var(--font-gabarito)] text-base leading-6 font-medium text-[#232323] max-[560px]:mr-2 max-[560px]:min-h-10 max-[560px]:text-sm max-[560px]:leading-5">{product.name}</h3><p className="ml-3 font-[family-name:var(--font-manrope)] text-xs leading-5 text-[#666] max-[560px]:mr-2 max-[560px]:text-[11px] max-[560px]:leading-4">{product.note}</p><p className="mt-2 ml-3 font-[family-name:var(--font-manrope)] text-xs leading-5 text-[#666] max-[560px]:text-[11px]">Available Variants</p><Asset className="mt-2 ml-3 max-[560px]:max-w-[calc(100%-20px)]" file={product.variantsImage} alt="Available colour variants" width={104} height={22} /><p className="mt-3 ml-3 font-[family-name:var(--font-gabarito)] text-xl leading-[30px] font-medium text-[#097890] max-[560px]:text-lg">{product.price}</p><Link className="mt-auto grid h-11 w-full shrink-0 place-items-center rounded bg-[#1893ae] font-[family-name:var(--font-manrope)] text-base font-semibold text-white max-[560px]:mt-4 max-[560px]:text-sm" href={product.href}>View Details</Link></article>;
}

function RelatedProductsSection({ products }) {
  return <section className="h-[811px] bg-[#fcfcfc] px-20 pt-[60px] max-[1050px]:h-auto max-[1050px]:px-6 max-[1050px]:pb-16"><SectionBadge asset="98-1088-imgImage.png">Discover More</SectionBadge><h2 className="mt-1 font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-semibold text-[#232323] max-[560px]:mt-3 max-[560px]:text-3xl max-[560px]:leading-10"><WaveHeadingText lines="More Products To Explore" /></h2><div className="mt-12 grid grid-cols-4 gap-[18px] max-[1050px]:grid-cols-2 max-[560px]:mt-8 max-[560px]:gap-3">{products.map((relatedProduct, index) => <RelatedProductCard product={relatedProduct} key={`${relatedProduct.href}-${index}`} />)}</div></section>;
}

export default function ProductDetailPage({ product }) {
  return (
    <main className="overflow-hidden bg-white text-[#111]">
      <Header />
      <nav className="flex h-[205px] items-start gap-2 px-20 pt-[131px] font-[family-name:var(--font-manrope)] text-base font-semibold text-[#444] max-[700px]:flex-wrap max-[700px]:px-6 max-[700px]:text-sm" aria-label="Breadcrumb"><Link href="/">Home</Link><Asset file="98-644-imgArrowRightSLine.svg" alt="" width={20} height={20} /><Link href="/products">{product.category}</Link><Asset file="98-644-imgArrowRightSLine.svg" alt="" width={20} height={20} /><span>{product.name}</span></nav>
      <ProductHero product={product} />
      <FeatureMarquee features={product.marqueeFeatures} />
      <DetailsSection product={product} />
      <BeforeAfterSection product={product} />
      <CareSection />
      <LensKnowledgeSection />
      <SellerSection product={product} />
      <FaqSection faqs={product.faqs} />
      <ReviewSection />
      <RelatedProductsSection products={product.relatedProducts} />
      <Footer />
    </main>
  );
}
