import Header from "./Header";
import HeroOrbitScene from "./HeroOrbitScene";

const floatingImages = [
  ["hero-04.png", "Contact lens suspended in blue liquid"],
  ["hero-05.png", "Woman applying an eye-care product"],
  ["hero-06.png", "Blue eye close-up"],
  ["hero-10.png", "Natural eye close-up"],
  ["hero-09.png", "Blue illustrated eye"],
  ["hero-07.png", "Portrait of a man"],
  ["hero-08.png", "Portrait of a woman"],
  ["hero-12.png", "Man placing a contact lens"],
  ["hero-11.png", "Portrait of a woman"],
  ["hero-13.png", "Portrait of a woman"],
  ["hero-06.png", "Blue eye close-up, detail"],
  ["hero-07.png", "Portrait of a man, detail"],
  ["hero-08.png", "Portrait of a woman, detail"],
  ["hero-09.png", "Blue illustrated eye, detail"],
  ["hero-10.png", "Natural eye close-up, detail"],
  ["hero-11.png", "Portrait of a woman, detail two"],
  ["hero-12.png", "Man placing a contact lens, detail"],
  ["hero-13.png", "Portrait of a woman, detail two"],
  ["hero-04.png", "Contact lens suspended in blue liquid, detail"],
  ["hero-05.png", "Woman applying an eye-care product, detail"],
];

export default function HeroSection() {
  return (
    <section
      className="relative isolate h-[100svh] min-h-[720px] overflow-hidden bg-[#a9cdec]"
      id="home"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-x-[-104px] top-[-410px] -z-[2] h-[1145px] bg-[url('/assets/hero-grid.svg')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <Header />
      <HeroOrbitScene images={floatingImages} title="Color your vision" />
    </section>
  );
}
