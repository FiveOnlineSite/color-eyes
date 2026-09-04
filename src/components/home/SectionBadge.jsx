import Image from "next/image";

const toneClasses = {
  blue: "bg-[#e3f1fc]",
  white: "bg-white/95",
  gray: "bg-[#f1f1f1]",
};

export default function SectionBadge({ children, tone = "blue" }) {
  return (
    <div
      className={`relative z-[2] inline-flex min-h-10 items-center justify-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold leading-5 text-[#080808] [font-family:var(--font-manrope)] ${toneClasses[tone]}`}
    >
      <Image
        className="size-5 animate-[spin_2.4s_linear_infinite] object-cover will-change-transform"
        src="/assets/badge-star.png"
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}
