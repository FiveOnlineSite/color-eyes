import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { blogPosts, featuredBlog } from "@/data/blogs";

const articles = [featuredBlog, ...blogPosts];

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: article ? `${article.title} | ColorEyes` : "Article | ColorEyes" };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const similarArticles = articles.filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <main className="bg-[#fafafa]">
      <Header homePath="/" />
      <article className="mx-auto w-[min(1280px,89%)] pt-[160px] max-[900px]:pt-[130px]">
        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#137286]" href="/blogs"><Image className="rotate-180" src="/assets/newsletter-arrow.svg" alt="" width={20} height={20} aria-hidden="true" />Back to News &amp; Insights</Link>
        <div className="mt-8 flex items-center gap-2 text-sm text-[#666]"><span>{article.date}</span><span aria-hidden="true" className="size-[0.42em] shrink-0 rounded-full bg-current" /><span>{article.readTime}</span></div>
        <h1 className="mt-4 text-[40px] leading-[1.2] font-semibold text-black [font-family:var(--font-gabarito)] max-[600px]:text-[32px]">{article.title}</h1>
        <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-lg"><Image className="object-cover" src={article.image} alt="" fill sizes="(max-width: 1280px) 89vw, 1280px" priority /></div>
        <div className="mt-8 space-y-5 text-base leading-7 text-[#444]">
          {article.description && <p>{article.description}</p>}
          {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
      <section className="mx-auto mt-16 w-[min(1280px,89%)] pb-24 max-[600px]:mt-14" aria-labelledby="similar-readings-title">
        <h2 id="similar-readings-title" className="text-2xl font-semibold text-[#080808] [font-family:var(--font-gabarito)]">Similar Readings</h2>
        <div className="mt-6 grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-8">
          {similarArticles.map((post) => (
            <article key={post.slug}>
              <Link className="relative block aspect-[305/193] overflow-hidden rounded-[4px]" href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}>
                <Image className="object-cover transition-transform duration-300 hover:scale-105" src={post.image} alt="" fill sizes="(max-width: 600px) 89vw, (max-width: 900px) 45vw, 305px" />
              </Link>
              <div className="mt-3 flex items-center gap-2 text-xs leading-[18px] text-[#666] [font-family:var(--font-manrope)]"><span>{post.date}</span><span aria-hidden="true" className="size-[0.42em] shrink-0 rounded-full bg-current" /><span>{post.readTime}</span></div>
              <h3 className="mt-3 text-lg leading-7 font-semibold text-[#080808] [font-family:var(--font-gabarito)]"><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h3>
            </article>
          ))}
        </div>
      </section>
      <Footer homePath="/" />
    </main>
  );
}
