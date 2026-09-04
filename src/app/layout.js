import { Gabarito, Manrope, Oswald, Roboto } from "next/font/google";
import HomepageSmoothScroll from "@/components/HomepageSmoothScroll";
import "./globals.css";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata = {
  title: "ColorEyes | Color Your Vision",
  description:
    "Thoughtful eye care, innovative lens technology, and modern self-expression for comfortable everyday vision.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${gabarito.variable} ${manrope.variable} ${oswald.variable} ${roboto.variable}`}
    >
      <body className="min-w-80 overflow-x-hidden bg-[#fafafa] text-[#171717] [font-family:var(--font-manrope)]">
        {children}
        <HomepageSmoothScroll />
      </body>
    </html>
  );
}
