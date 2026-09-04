import Image from "next/image";

import SectionBadge from "./SectionBadge";

const locations = [
  { name: "Lucknow", x: 727, y: 388 },
  { name: "Varanasi", x: 716, y: 416 },
  { name: "Raipur", x: 705, y: 444 },
  { name: "Indore", x: 653, y: 410 },
  { name: "Vadodara", x: 628, y: 430 },
  { name: "Chandigarh", x: 644, y: 332 },
  { name: "Nagpur", x: 643, y: 483 },
  { name: "Hyderabad", x: 713, y: 514 },
  { name: "Jaipur", x: 601, y: 392 },
  { name: "Udaipur", x: 657, y: 380 },
  { name: "Mumbai", x: 610, y: 571 },
  { name: "Kochi", x: 657, y: 628 },
  { name: "Mangaluru", x: 613, y: 621 },
  { name: "Bengaluru", x: 683, y: 585 },
  { name: "Chennai", x: 731, y: 564 },
  { name: "Ahmedabad", x: 579, y: 434 },
  { name: "New Delhi", x: 670, y: 348 },
  { name: "Noida", x: 671, y: 360 },
  { name: "Gurugram", x: 658, y: 348 },
  { name: "Pune", x: 674, y: 527 },
  { name: "Kolkata", x: 783, y: 452 },
];

function MapPinIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="719 379 16 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M727 396.416L731.125 392.292C733.403 390.013 733.403 386.32 731.125 384.042C728.847 381.764 725.153 381.764 722.875 384.042C720.597 386.32 720.597 390.013 722.875 392.292L727 396.416ZM727 398.773L721.697 393.47C718.768 390.541 718.768 385.792 721.697 382.863C724.626 379.935 729.374 379.935 732.303 382.863C735.232 385.792 735.232 390.541 732.303 393.47L727 398.773ZM727 389.833C727.92 389.833 728.667 389.087 728.667 388.167C728.667 387.246 727.92 386.5 727 386.5C726.079 386.5 725.333 387.246 725.333 388.167C725.333 389.087 726.079 389.833 727 389.833ZM727 391.5C725.159 391.5 723.667 390.008 723.667 388.167C723.667 386.326 725.159 384.833 727 384.833C728.841 384.833 730.333 386.326 730.333 388.167C730.333 390.008 728.841 391.5 727 391.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LocationMarker({ name, x, y }) {
  return (
    <button
      aria-label={`${name} market location`}
      className="group absolute z-20 grid size-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-white outline-none hover:z-50 focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-white/90"
      style={{ left: `${(x / 1440) * 100}%`, top: `${(y / 780) * 100}%` }}
      type="button"
    >
      <MapPinIcon className="h-5 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />

      <span
        className="pointer-events-none absolute bottom-[calc(100%-1px)] left-1/2 z-50 flex h-10 -translate-x-1/2 translate-y-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-white px-4 text-sm font-medium text-[#074b5a] opacity-0 shadow-[0_8px_22px_rgba(5,54,66,0.16)] transition-[opacity,transform] duration-200 [font-family:var(--font-manrope)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        role="tooltip"
      >
        <MapPinIcon className="h-5 w-4 shrink-0" />
        {name}
      </span>
    </button>
  );
}

export default function MarketReachSection() {
  return (
    <section
      className="relative isolate h-[780px] overflow-hidden bg-[#3d6fa7] max-[900px]:h-[620px]"
      id="distributors"
      aria-labelledby="market-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.28),transparent_25%),radial-gradient(circle_at_81%_25%,rgba(255,255,255,0.22),transparent_24%),radial-gradient(circle_at_66%_74%,rgba(255,255,255,0.13),transparent_27%)] opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black_4%,transparent_92%)]"
      />

      <div className="absolute top-[60px] right-0 left-0 z-30 flex justify-center">
        <SectionBadge tone="white">Our Market Reach</SectionBadge>
      </div>

      <h2
        className="absolute top-[132px] right-6 left-6 z-30 text-center text-[40px] leading-12 font-bold text-white [font-family:var(--font-gabarito)] max-[640px]:top-[126px] max-[640px]:text-[32px] max-[640px]:leading-10"
        id="market-title"
      >
        Growing Across Every Market
      </h2>

      <div className="absolute top-0 left-1/2 h-full aspect-[1440/780] -translate-x-1/2">
        <Image
          aria-hidden="true"
          className="pointer-events-none select-none object-fill"
          src="/assets/india-dotted-map.svg"
          alt=""
          fill
          sizes="(max-width: 900px) 1145px, 100vw"
          unoptimized
        />

        {locations.map((location) => (
          <LocationMarker key={location.name} {...location} />
        ))}
      </div>
    </section>
  );
}
