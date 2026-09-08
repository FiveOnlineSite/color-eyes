import Image from "next/image";
import Link from "next/link";

const linkVariants = {
  teal: "border-transparent bg-[#1893ae] text-white",
  light: "border-transparent bg-white text-[#1893ae]",
  outline: "border-white bg-transparent text-white",
};

const iconVariants = {
  teal: "bg-white",
  light: "bg-[#1893ae]",
  outline: "bg-white",
};

export default function ActionLink({ children, className = "", href = "#", variant = "teal" }) {
  const isLight = variant === "light";

  return (
    <Link
      className={`inline-flex h-[52px] items-center gap-3 whitespace-nowrap rounded-full border-[1.2px] py-1 pr-1 pl-5 text-base font-semibold leading-6 tracking-[0.17px] transition duration-200 [font-family:var(--font-manrope)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(2,64,78,0.15)] max-[640px]:h-12 max-[640px]:text-sm ${linkVariants[variant]} ${className}`}
      href={href}
    >
      <span>{children}</span>
      <span
        className={`grid size-[46px] shrink-0 place-items-center rounded-full max-[640px]:size-10 ${iconVariants[variant]}`}
      >
        <Image
          className="size-[18px]"
          src={isLight ? "/assets/arrow-teal.svg" : "/assets/arrow-dark.svg"}
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
