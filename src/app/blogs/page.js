import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import BlogListing from "@/components/blog/BlogListing";

export const metadata = {
  title: "News & Insights | ColorEyes",
  description: "Expert articles on contact lenses, eye care, and lifestyle trends from ColorEyes.",
};

export default function BlogsPage() {
  return (
    <main className="bg-[#fafafa]">
      <Header homePath="/" />
      <BlogListing />
      <Footer homePath="/" />
    </main>
  );
}
