import { preload } from "react-dom";
import HomePage from "@/components/home/HomePage";

export default function Home() {
  preload("/assets/hero-grid.svg", {
    as: "image",
    fetchPriority: "high",
  });

  return <HomePage />;
}
