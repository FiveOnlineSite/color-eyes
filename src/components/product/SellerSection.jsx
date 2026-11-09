"use client";

import Image from "next/image";

import SectionBadge from "@/components/home/SectionBadge";
import WaveHeadingText from "@/components/home/WaveHeadingText";

const PDP_ASSET = "/assets/pdp";

const sellers = [
  ["VP", "Vision Point Opticals", "Linking Road, Bandra West", "Mon - Sat 10:30 AM to 7:30 PM"],
  ["ES", "Eye Style Studio", "RTO, Andheri West", "Mon - Fri 10:30 AM to 7:30 PM"],
  ["CV", "Clear View Optics", "Airport Road, Andheri East", "Mon - Fri 10:00 AM to 7:30 PM"],
];

function Asset({ file, alt, ...props }) {
  return <Image src={`${PDP_ASSET}/${file}`} alt={alt} {...props} />;
}

function SellerAction({ icon, children }) {
  return <button className="flex h-9 items-center gap-1.5 rounded border border-[#097890] px-2.5 font-[family-name:var(--font-gabarito)] text-xs font-medium whitespace-nowrap text-[#097890]" type="button"><Asset file={icon} alt="" width={16} height={16} />{children}</button>;
}

function FieldIcon({ type }) {
  if (type === "location") return <Asset file="98-936-imgGroup.svg" alt="" width={20} height={20} />;
  if (type === "city") return <Asset file="98-936-imgGriddyIconsCity.svg" alt="" width={20} height={20} />;
  return <Asset file="98-936-imgMapPin3Line.svg" alt="" width={20} height={20} />;
}

export default function SellerSection({ product, compactTop = false }) {
  const fields = [["State", "Maharashtra", "location"], ["City", "Mumbai", "city"], ["Pin code", "400053", "pin"]];

  return (
    <section className={`h-[882px] bg-[#fcfcfc] px-[5.5%] min-[1440px]:px-[calc((100vw-1280px)/2)] ${compactTop ? "pt-8" : "pt-[60px]"} max-[1280px]:h-auto max-[1280px]:pb-16`} id="seller">
      <div className="mx-auto w-fit"><SectionBadge>Where to Buy</SectionBadge></div>
      <h2 className="mt-6 text-center font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-bold max-[650px]:text-3xl max-[650px]:leading-10"><WaveHeadingText lines="Find A Seller Near You" /></h2>
      <p className="mt-5 text-center font-[family-name:var(--font-manrope)] text-base leading-6 text-[#444]">Choose your state and city to discover authorized distributors carrying this product.</p>
      <div className="mt-12 grid grid-cols-[413px_1fr] gap-5 max-[1280px]:grid-cols-1">
        <aside className="h-[458px] rounded-xl bg-[#f0f7ff] p-6 shadow-[0_1px_12px_rgba(0,0,0,.1)]">
          <p className="font-[family-name:var(--font-gabarito)] text-base font-medium">Selected Product</p>
          <div className="mt-4 flex h-16 items-center gap-3 rounded bg-white px-3">
            <Asset file="98-936-imgEllipse282.svg" alt="" width={32} height={32} />
            <span><b className="block font-[family-name:var(--font-gabarito)] text-sm font-medium">{product.selectedProductName}</b><small className="font-[family-name:var(--font-manrope)] text-xs text-[#444]">{product.selectedProductSubtitle}</small></span>
          </div>
          {fields.map(([label, value, type]) => (
            <label className="mt-4 block font-[family-name:var(--font-gabarito)] text-base font-medium" key={label}>
              {label}
              <span className="mt-3 flex h-12 items-center justify-between rounded bg-white px-3.5 font-[family-name:var(--font-manrope)] text-sm font-normal text-[#444]"><span className="flex items-center gap-3"><FieldIcon type={type} />{value}</span><Asset file="98-936-imgEpArrowDownBold.svg" alt="" width={16} height={16} /></span>
            </label>
          ))}
        </aside>
        <div className="h-[558px] rounded-xl bg-white p-6 shadow-[0_1px_12px_rgba(0,0,0,.1)] max-[760px]:h-auto">
          <h3 className="font-[family-name:var(--font-gabarito)] text-xl leading-[30px] font-medium">3 Available Sellers</h3>
          <div className="mt-6 grid gap-[15px]">
            {sellers.map(([initials, name, address, hours]) => (
              <article className="grid h-[142px] grid-cols-[72px_minmax(170px,1fr)_auto] items-start gap-x-[18px] rounded-xl border border-black/10 p-5 max-[760px]:h-auto max-[760px]:grid-cols-[60px_minmax(0,1fr)] max-[760px]:gap-y-3 max-[520px]:p-4" key={name}>
                <span className="relative grid size-[72px] place-items-center self-center font-[family-name:var(--font-gabarito)] text-xl font-medium text-white max-[760px]:size-[60px] max-[520px]:text-lg">
                  <Asset className="absolute inset-0 size-full" file="98-936-imgEllipse283.svg" alt="" width={80} height={80} />
                  <span className="relative">{initials}</span>
                </span>
                <div>
                  <h4 className="font-[family-name:var(--font-gabarito)] text-lg leading-7 font-medium max-[520px]:text-base">{name}</h4>
                  <p className="mt-2.5 flex items-center gap-2 font-[family-name:var(--font-gabarito)] text-[13px] leading-[18px] text-[#444]"><Asset file="98-936-imgGroup1.svg" alt="" width={20} height={20} />Mumbai, Maharashtra</p>
                  <p className="mt-2.5 flex items-center gap-2 font-[family-name:var(--font-gabarito)] text-[13px] leading-[18px] text-[#444]"><Asset file="98-936-imgGriddyIconsCity.svg" alt="" width={20} height={20} />{address}</p>
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
