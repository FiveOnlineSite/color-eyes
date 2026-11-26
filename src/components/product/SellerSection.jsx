"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import SectionBadge from "@/components/home/SectionBadge";
import WaveHeadingText from "@/components/home/WaveHeadingText";

const PDP_ASSET = "/assets/pdp";

const sellers = [
  { initials: "VP", name: "Vision Point Opticals", state: "Maharashtra", city: "Mumbai", pinCode: "400053", address: "Linking Road, Bandra West", hours: "Mon - Sat 10:30 AM to 7:30 PM" },
  { initials: "ES", name: "Eye Style Studio", state: "Maharashtra", city: "Mumbai", pinCode: "400053", address: "RTO, Andheri West", hours: "Mon - Fri 10:30 AM to 7:30 PM" },
  { initials: "CV", name: "Clear View Optics", state: "Maharashtra", city: "Mumbai", pinCode: "400053", address: "Airport Road, Andheri East", hours: "Mon - Fri 10:00 AM to 7:30 PM" },
  { initials: "OB", name: "Optical Bazaar", state: "Maharashtra", city: "Pune", pinCode: "411001", address: "M. G. Road, Camp", hours: "Mon - Sat 10:00 AM to 8:00 PM" },
  { initials: "VS", name: "Vision Square", state: "Maharashtra", city: "Pune", pinCode: "411045", address: "Baner Road, Baner", hours: "Tue - Sun 11:00 AM to 8:00 PM" },
  { initials: "LE", name: "Lens Express", state: "Karnataka", city: "Bengaluru", pinCode: "560001", address: "Church Street, MG Road", hours: "Mon - Sat 10:30 AM to 8:00 PM" },
  { initials: "EO", name: "Eye Opener Optics", state: "Karnataka", city: "Bengaluru", pinCode: "560038", address: "100 Feet Road, Indiranagar", hours: "Mon - Sun 10:00 AM to 9:00 PM" },
  { initials: "VI", name: "Vision India", state: "Delhi", city: "New Delhi", pinCode: "110001", address: "Connaught Place", hours: "Mon - Sat 10:00 AM to 7:30 PM" },
  { initials: "FS", name: "Focus Sight", state: "Delhi", city: "New Delhi", pinCode: "110017", address: "Saket District Centre", hours: "Tue - Sun 11:00 AM to 8:00 PM" },
  { initials: "OS", name: "Optic Studio", state: "Tamil Nadu", city: "Chennai", pinCode: "600017", address: "T. Nagar, Usman Road", hours: "Mon - Sat 10:30 AM to 8:00 PM" },
  { initials: "EC", name: "Eye Care Collective", state: "Tamil Nadu", city: "Chennai", pinCode: "600028", address: "RK Mutt Road, Mylapore", hours: "Mon - Sun 10:00 AM to 8:30 PM" },
  { initials: "CV", name: "Crystal Vision", state: "Gujarat", city: "Ahmedabad", pinCode: "380009", address: "C. G. Road, Navrangpura", hours: "Mon - Sat 10:00 AM to 8:00 PM" },
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

function FilterField({ label, value, options, type, onChange }) {
  return (
    <label className="mt-4 block font-[family-name:var(--font-gabarito)] text-base font-medium">
      {label}
      <span className="relative mt-3 flex h-12 items-center rounded bg-white px-3.5 font-[family-name:var(--font-manrope)] text-sm font-normal text-[#444]">
        <FieldIcon type={type} />
        <select aria-label={`Filter by ${label}`} className="ml-3 h-full min-w-0 flex-1 appearance-none bg-transparent pr-6 outline-none" value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">All {label}s</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <Asset className="pointer-events-none absolute right-3.5" file="98-936-imgEpArrowDownBold.svg" alt="" width={16} height={16} />
      </span>
    </label>
  );
}

export default function SellerSection({ product, compactTop = false }) {
  const isProductSearch = Boolean(product);
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [selectedPinCode, setSelectedPinCode] = useState("400053");
  const states = [...new Set(sellers.map((seller) => seller.state))];
  const cities = [...new Set(sellers.filter((seller) => !selectedState || seller.state === selectedState).map((seller) => seller.city))];
  const pinCodes = [...new Set(sellers.filter((seller) => (!selectedState || seller.state === selectedState) && (!selectedCity || seller.city === selectedCity)).map((seller) => seller.pinCode))];
  const filteredSellers = useMemo(() => sellers.filter((seller) =>
    (!selectedState || seller.state === selectedState)
    && (!selectedCity || seller.city === selectedCity)
    && (!selectedPinCode || seller.pinCode === selectedPinCode)
  ), [selectedState, selectedCity, selectedPinCode]);

  const updateState = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setSelectedPinCode("");
  };

  const updateCity = (city) => {
    setSelectedCity(city);
    setSelectedPinCode("");
  };

  return (
    <section className={`h-[882px] bg-[#fcfcfc] px-[5.5%] min-[1440px]:px-[calc((100vw-1280px)/2)] ${compactTop ? "pt-8" : "pt-[60px]"} max-[1280px]:h-auto max-[1280px]:pb-16`} id={isProductSearch ? "seller" : "distributors"}>
      <div className="mx-auto w-fit"><SectionBadge>Where to Buy</SectionBadge></div>
      <h2 className="mt-6 text-center font-[family-name:var(--font-gabarito)] text-4xl leading-12 font-bold max-[650px]:text-3xl max-[650px]:leading-10"><WaveHeadingText lines={isProductSearch ? "Find A Seller Near You" : "Find A Distributor Near You"} /></h2>
      <p className="mt-5 text-center font-[family-name:var(--font-manrope)] text-base leading-6 text-[#444]">{isProductSearch ? "Choose your state and city to discover authorized distributors carrying this product." : "Choose your state and city to discover an authorized ColorEyes distributor near you."}</p>
      <div className="mt-12 grid grid-cols-[413px_1fr] gap-5 max-[1280px]:grid-cols-1">
        <aside className={`${isProductSearch ? "h-[458px]" : "h-[362px]"} rounded-xl bg-[#f0f7ff] p-6 shadow-[0_1px_12px_rgba(0,0,0,.1)]`}>
          {isProductSearch && <><p className="font-[family-name:var(--font-gabarito)] text-base font-medium">Selected Product</p>
          <div className="mt-4 flex h-16 items-center gap-3 rounded bg-white px-3">
            <Asset file="98-936-imgEllipse282.svg" alt="" width={32} height={32} />
            <span><b className="block font-[family-name:var(--font-gabarito)] text-sm font-medium">{product.selectedProductName}</b><small className="font-[family-name:var(--font-manrope)] text-xs text-[#444]">{product.selectedProductSubtitle}</small></span>
          </div></>}
          <FilterField label="State" type="location" value={selectedState} options={states} onChange={updateState} />
          <FilterField label="City" type="city" value={selectedCity} options={cities} onChange={updateCity} />
          <FilterField label="Pin code" type="pin" value={selectedPinCode} options={pinCodes} onChange={setSelectedPinCode} />
        </aside>
        <div className="h-[558px] rounded-xl bg-white p-6 shadow-[0_1px_12px_rgba(0,0,0,.1)] max-[760px]:h-auto">
          <h3 className="font-[family-name:var(--font-gabarito)] text-xl leading-[30px] font-medium">{filteredSellers.length} Available {isProductSearch ? "Sellers" : "Distributors"}</h3>
          <div className="mt-6 grid max-h-[470px] gap-[15px] overflow-y-auto pr-1 max-[760px]:max-h-none">
            {filteredSellers.map((seller) => (
              <article className="grid h-[142px] grid-cols-[72px_minmax(170px,1fr)_auto] items-start gap-x-[18px] rounded-xl border border-black/10 p-5 max-[760px]:h-auto max-[760px]:grid-cols-[60px_minmax(0,1fr)] max-[760px]:gap-y-3 max-[520px]:p-4" key={`${seller.name}-${seller.pinCode}`}>
                <span className="relative grid size-[72px] place-items-center self-center font-[family-name:var(--font-gabarito)] text-xl font-medium text-white max-[760px]:size-[60px] max-[520px]:text-lg">
                  <Asset className="absolute inset-0 size-full" file="98-936-imgEllipse283.svg" alt="" width={80} height={80} />
                  <span className="relative">{seller.initials}</span>
                </span>
                <div>
                  <h4 className="font-[family-name:var(--font-gabarito)] text-lg leading-7 font-medium max-[520px]:text-base">{seller.name}</h4>
                  <p className="mt-2.5 flex items-center gap-2 font-[family-name:var(--font-gabarito)] text-[13px] leading-[18px] text-[#444]"><Asset file="98-936-imgGroup1.svg" alt="" width={20} height={20} />{seller.city}, {seller.state}</p>
                  <p className="mt-2.5 flex items-center gap-2 font-[family-name:var(--font-gabarito)] text-[13px] leading-[18px] text-[#444]"><Asset file="98-936-imgGriddyIconsCity.svg" alt="" width={20} height={20} />{seller.address}</p>
                </div>
                <div className="min-w-max max-[760px]:col-span-2 max-[760px]:ml-[78px] max-[520px]:ml-0 max-[520px]:min-w-0">
                  <div className="flex items-center justify-end gap-2 max-[520px]:justify-start max-[420px]:flex-wrap">
                    <SellerAction icon="98-936-imgFamiconsCallOutline.svg">Call</SellerAction>
                    <SellerAction icon="98-936-imgBiWhatsapp.svg">Whatsapp</SellerAction>
                    <SellerAction icon="98-936-imgFluentDirections24Regular.svg">Directions</SellerAction>
                  </div>
                  <p className="mt-2.5 text-right font-[family-name:var(--font-gabarito)] text-xs leading-[18px] whitespace-nowrap text-[#444] max-[520px]:text-left max-[420px]:whitespace-normal">{seller.hours}</p>
                </div>
              </article>
            ))}
            {!filteredSellers.length && <p className="rounded-xl border border-dashed border-[#9ecbd6] p-6 text-center font-[family-name:var(--font-manrope)] text-sm text-[#444]">No distributors match these filters. Try another state, city, or pin code.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
