"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogCategories, blogPosts, featuredBlog } from "@/data/blogs";
import SectionBadge from "@/components/home/SectionBadge";

export default function BlogListing() {
  const [category, setCategory] = useState("Eyecare");
  const visiblePosts = blogPosts.filter((post) => post.category === category);

  return (
    <>
      <section className="relative mt-[120px] h-[364px] w-full overflow-hidden bg-[#5594d0] max-[900px]:mt-[112px] max-[900px]:h-[390px] max-[600px]:h-[540px]" aria-labelledby="blog-title">
        <div className="absolute inset-0 bg-cover bg-[position:center_64%]" style={{ backgroundImage: "url('/assets/blog/hero-sky.png')" }} />
        <Image className="absolute top-[7px] right-0 h-[412px] w-[619px] object-contain max-[1000px]:right-[-110px] max-[800px]:right-[-210px] max-[600px]:top-auto max-[600px]:right-0 max-[600px]:bottom-0 max-[600px]:h-auto max-[600px]:w-[460px]" src="/assets/blog/hero-models.png" alt="Three people wearing ColorEyes contact lenses" width={619} height={412} priority />
        <div className="relative z-10 mx-auto h-full w-[min(1280px,89%)]">
          <div className="absolute top-[71px] left-0 max-[600px]:top-8"><SectionBadge>News &amp; Insights</SectionBadge></div>
          <div className="absolute top-[127px] left-0 max-w-[520px] max-[600px]:top-[86px] max-[600px]:right-0">
            <h1 id="blog-title" className="max-w-[433px] text-[32px] leading-[44px] font-semibold text-white [font-family:var(--font-gabarito)] max-[600px]:text-[28px] max-[600px]:leading-9">Ideas, Guidance and Stories for Better Vision</h1>
            <p className="mt-3 max-w-[519px] text-base leading-7 text-white [font-family:var(--font-manrope)] max-[600px]:max-w-[350px] max-[600px]:text-sm max-[600px]:leading-6">Discover expert articles on contact lenses, eye care, and lifestyle trends to help you make informed choices for your vision.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-[55px] grid h-[376px] w-[min(1280px,89%)] grid-cols-[698px_minmax(0,1fr)] gap-[59px] max-[1320px]:grid-cols-[55%_minmax(0,1fr)] max-[900px]:h-auto max-[900px]:grid-cols-1 max-[900px]:gap-7" aria-label="Featured article">
        <Link className="relative block h-[376px] overflow-hidden rounded-[4px] max-[900px]:h-auto max-[900px]:aspect-[698/376]" href={`/blogs/${featuredBlog.slug}`} aria-label={`Read ${featuredBlog.title}`}>
          <Image className="object-cover" src={featuredBlog.image} alt="Woman holding a contact lens" fill sizes="(max-width: 900px) 100vw, 698px" priority />
        </Link>
        <div className="flex flex-col justify-center py-[38px] max-[900px]:py-0">
          <div className="flex items-center gap-2 text-xs leading-[18px] text-[#666] [font-family:var(--font-manrope)]"><span>{featuredBlog.date}</span><span aria-hidden="true" className="size-[0.42em] shrink-0 rounded-full bg-current" /><span>{featuredBlog.readTime}</span></div>
          <h2 className="mt-5 text-2xl leading-9 font-medium text-black [font-family:var(--font-gabarito)] max-[600px]:text-xl max-[600px]:leading-7"><Link href={`/blogs/${featuredBlog.slug}`}>{featuredBlog.title}</Link></h2>
          <p className="mt-3 text-base leading-6 font-medium text-[#444] [font-family:var(--font-manrope)]">{featuredBlog.description}</p>
          <Link className="mt-auto inline-flex w-fit items-center gap-2 text-base leading-6 font-semibold text-[#137286] [font-family:var(--font-manrope)] max-[900px]:mt-6" href={`/blogs/${featuredBlog.slug}`}>Read Now <span className="grid size-6 place-items-center rounded-full bg-[#1893ae]" aria-hidden="true"><Image src="/assets/arrow-teal.svg" alt="" width={14} height={14} /></span></Link>
        </div>
      </section>

      <section className="mx-auto mt-[61px] w-[min(1280px,89%)] pb-[60px] max-[900px]:mt-12" aria-label="Blog articles">
        <div className="flex flex-wrap items-center gap-[42px] max-[600px]:flex-nowrap max-[600px]:gap-x-5 max-[600px]:overflow-x-auto max-[600px]:overscroll-x-contain" role="tablist" aria-label="Article category">
          {blogCategories.map((item) => (
            <button key={item} id={`blog-tab-${item.toLowerCase()}`} className={`shrink-0 border-b-[3px] px-2.5 py-3 text-base leading-[19px] font-semibold [font-family:var(--font-manrope)] transition-colors ${category === item ? "border-[#2c2f71] text-[#2c2f71]" : "border-transparent text-[#363636] hover:text-[#2c2f71]"}`} type="button" role="tab" aria-selected={category === item} aria-controls="blog-posts" onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <div id="blog-posts" role="tabpanel" aria-labelledby={`blog-tab-${category.toLowerCase()}`} className="mt-[29px]">
          {visiblePosts.length ? <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-8">
            {visiblePosts.map((post) => <article key={post.slug}>
              <Link className="relative block aspect-[305/193] overflow-hidden rounded-[4px]" href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}><Image className="object-cover transition-transform duration-300 hover:scale-105" src={post.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 305px" /></Link>
              <div className="mt-3 flex items-center gap-2 text-xs leading-[18px] text-[#666] [font-family:var(--font-manrope)]"><span>{post.date}</span><span aria-hidden="true" className="size-[0.42em] shrink-0 rounded-full bg-current" /><span>{post.readTime}</span></div>
              <h3 className="mt-3 text-lg leading-7 font-semibold text-[#080808] [font-family:var(--font-gabarito)]"><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h3>
            </article>)}
          </div> : <p className="py-16 text-center text-base text-[#444]">No {category.toLowerCase()} articles are available yet.</p>}
        </div>
      </section>
    </>
  );
}
