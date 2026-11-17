"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import ActionLink from "@/components/home/ActionLink";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import SectionBadge from "@/components/home/SectionBadge";

const jobs = [
  { id: 1, title: "Assistant Manager — Finance & Accounts", city: "Mumbai", type: "Full-time", industry: "Finance & Accounts", date: "Oct 26", summary: "Help keep our finance operations accurate, timely and ready to support a growing business.", description: "We are looking for a detail-oriented finance professional with 3–4 years of experience handling end-to-end payable processes. Experience with Tally, Excel, TDS and GST compliance is preferred." },
  { id: 2, title: "Senior Manager — Non-EB Placements", city: "Noida / Gurugram", type: "Full-time", industry: "Non-EB Placements", date: "Oct 26", summary: "Build thoughtful client relationships and help create practical, high-value coverage solutions.", description: "Lead client conversations, assess existing portfolios and identify opportunities to improve coverage, terms and service. You will work closely with clients and internal teams to move placements forward." },
  { id: 3, title: "Sales Executive — Optical Retail", city: "Pune", type: "Full-time", industry: "Pre-sales", date: "Oct 19", summary: "Grow ColorEyes at the retail level through strong partner relationships and excellent product knowledge.", description: "Support optical retail partners, introduce new products and maintain a clear view of local opportunities. Prior experience in optical or consumer retail sales is an advantage." },
  { id: 4, title: "Key Account Executive — Corporate Solutions", city: "Bengaluru", type: "Full-time", industry: "Corporate Solutions", date: "Oct 12", summary: "Support strategic accounts with a service-first mindset and a clear understanding of their business needs.", description: "Coordinate account activity, prepare partner updates and help deliver practical solutions across a growing network of corporate customers." },
];

const filters = {
  "Job Type": ["Full-time"],
  Industry: ["Finance & Accounts", "Non-EB Placements", "Pre-sales", "Corporate Solutions"],
  City: ["Mumbai", "Noida", "Gurugram", "Pune", "Nagpur", "Hyderabad", "Bengaluru"],
};

function matchesCity(job, city) {
  return job.city.toLowerCase().includes(city.toLowerCase());
}

function ApplicationModal({ job, onClose }) {
  const [coverNote, setCoverNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitApplication(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-8 max-[640px]:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="w-full max-w-[900px] overflow-visible rounded-xl border border-[#9ed4df] bg-[#f7fcfd] shadow-[0_20px_70px_rgba(0,0,0,.35)]" role="dialog" aria-modal="true" aria-labelledby="application-modal-title">
      <div className="flex items-center justify-between border-b border-[#9ed4df] bg-[#e3f1fc] px-6 py-4 max-[640px]:px-5"><h2 id="application-modal-title" className="text-[26px] leading-8 font-semibold text-[#07556b] [font-family:var(--font-gabarito)] max-[640px]:text-xl">{job.title}</h2><button className="grid size-10 cursor-pointer place-items-center rounded-full text-3xl leading-none text-[#07556b] transition hover:bg-white/75" type="button" onClick={onClose} aria-label="Close application form">×</button></div>
      {submitted ? <div className="px-6 py-10 text-center max-[640px]:px-5"><div className="mx-auto grid size-14 place-items-center rounded-full bg-[#e3f1fc] text-3xl text-[#1893ae]" aria-hidden="true">✓</div><h3 className="mt-5 text-2xl font-semibold text-[#07556b] [font-family:var(--font-gabarito)]">Application received</h3><p className="mx-auto mt-3 max-w-[500px] text-base leading-7 text-[#555]">Thanks for applying for {job.title}. Our team will review your application and be in touch if your profile is a fit.</p><button className="mt-7 h-11 cursor-pointer rounded-lg bg-[#1893ae] px-6 text-sm font-semibold text-white transition hover:bg-[#147f96]" type="button" onClick={onClose}>Close</button></div> : <form className="p-6 max-[640px]:p-5" onSubmit={submitApplication}><div className="grid grid-cols-2 gap-x-[18px] gap-y-5 max-[700px]:grid-cols-1"><label className="block" htmlFor="first-name"><span className="mb-2 block text-base font-medium text-[#123]">First Name*</span><input className="h-[52px] w-full rounded-md border border-[#b8dbe3] bg-white px-3 text-base outline-none focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="first-name" required /></label><label className="block" htmlFor="last-name"><span className="mb-2 block text-base font-medium text-[#123]">Last Name*</span><input className="h-[52px] w-full rounded-md border border-[#b8dbe3] bg-white px-3 text-base outline-none focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="last-name" required /></label><label className="block" htmlFor="application-email"><span className="mb-2 block text-base font-medium text-[#123]">Email*</span><input className="h-[52px] w-full rounded-md border border-[#b8dbe3] bg-white px-3 text-base outline-none focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="application-email" type="email" required /></label><label className="block" htmlFor="application-phone"><span className="mb-2 block text-base font-medium text-[#123]">Phone*</span><span className="flex h-[52px] overflow-hidden rounded-md border border-[#b8dbe3] bg-white focus-within:border-[#1893ae] focus-within:ring-2 focus-within:ring-[#1893ae]/15"><span className="flex w-12 items-center justify-center border-r border-[#b8dbe3] bg-[#edf9fb] text-base text-[#123]">+91</span><input className="min-w-0 flex-1 px-3 text-base outline-none" id="application-phone" type="tel" required /></span></label><label className="block" htmlFor="resume"><span className="mb-2 block text-base font-medium text-[#123]">Updated Resume*</span><span className="flex h-[52px] overflow-hidden rounded-md border border-[#b8dbe3] bg-white"><span className="flex min-w-0 flex-1 items-center px-3 text-base text-[#666]">Choose a file</span><span className="relative flex w-[118px] items-center justify-center bg-[#1893ae] text-base font-semibold text-white">Browse<input className="absolute inset-0 cursor-pointer opacity-0" id="resume" type="file" accept=".pdf,.doc,.docx" required /></span></span><span className="mt-2 block text-sm text-[#566]">PDF, DOC, or DOCX files up to 2 MB.</span></label><label className="block" htmlFor="cover-note"><span className="mb-2 block text-base font-medium text-[#123]">Cover Note*</span><textarea className="h-[52px] w-full resize-y rounded-md border border-[#b8dbe3] bg-white px-3 py-3 text-base outline-none focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="cover-note" value={coverNote} onChange={(event) => setCoverNote(event.target.value)} maxLength={500} required /><span className="mt-2 block text-right text-sm text-[#345]">{coverNote.length}/500 Words</span></label></div><button className="mt-4 inline-flex h-[52px] cursor-pointer items-center rounded-lg bg-[#1893ae] px-14 text-base font-semibold text-white transition hover:bg-[#147f96]" type="submit">Submit</button></form>}
    </section>
  </div>;
}

export default function CareersPage() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const [applicationJob, setApplicationJob] = useState(null);
  const [searched, setSearched] = useState({ keywords: "", location: "" });

  const visibleJobs = useMemo(() => jobs.filter((job) => {
    const haystack = `${job.title} ${job.industry} ${job.city}`.toLowerCase();
    const keywordMatches = !searched.keywords || haystack.includes(searched.keywords.toLowerCase());
    const locationMatches = !searched.location || matchesCity(job, searched.location);
    const selectedMatches = !selected.length || selected.some((filter) => job.type === filter || job.industry === filter || matchesCity(job, filter));
    return keywordMatches && locationMatches && selectedMatches;
  }), [searched, selected]);

  function toggleFilter(value) {
    setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function search(event) {
    event.preventDefault();
    setSearched({ keywords, location });
  }

  return <main className="overflow-x-clip bg-[#fcfcfc]">
    <Header homePath="/" activePage="career" />

    <section className="relative mt-32 h-[410px] overflow-hidden max-[900px]:mt-[112px] max-[640px]:h-[470px]" aria-labelledby="careers-hero-title">
      <video className="absolute inset-0 size-full object-cover" src="/assets/bg-sky.mp4" autoPlay loop muted playsInline aria-hidden="true" />
      <div className="absolute inset-0 bg-[#145a8d]/25" aria-hidden="true" />
      <div className="pointer-events-none absolute top-[-6px] right-[max(3vw,calc(50%-625px))] h-[500px] w-[560px] overflow-hidden max-[780px]:right-[-170px] max-[780px]:opacity-55 max-[560px]:right-[-280px]" aria-hidden="true"><Image className="absolute top-[-5.85%] left-[-60.11%] h-[118.78%] w-[160.06%] max-w-none" src="/assets/find-my-product/banner-model.png" alt="" width={999} height={667} priority /></div>
      <div className="relative z-10 mx-auto w-[min(1280px,89%)] pt-[60px] max-[640px]:pt-11"><SectionBadge>Careers at ColorEyes</SectionBadge><h1 id="careers-hero-title" className="mt-5 max-w-[530px] text-5xl leading-[56px] font-semibold text-white [font-family:var(--font-gabarito)] max-[640px]:max-w-[330px] max-[640px]:text-[38px] max-[640px]:leading-[44px]">Find Your Place<br />With Us</h1><p className="mt-4 max-w-[424px] text-base leading-6 text-white [font-family:var(--font-manrope)] max-[640px]:max-w-[300px] max-[640px]:text-sm">Join a team building better vision, stronger partnerships and new possibilities for everyday eye care.</p><ActionLink className="mt-9" href="#career-opportunities" variant="light">Explore Roles</ActionLink></div>
    </section>

    <section className="py-[88px] max-[640px]:py-14" id="career-opportunities" aria-labelledby="career-opportunities-title">
      <div className="mx-auto w-[min(1280px,89%)]"><div className="text-center"><SectionBadge>Career Opportunities</SectionBadge><h2 id="career-opportunities-title" className="mt-6 text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Find Your Place With Us</h2><p className="mx-auto mt-4 max-w-[620px] text-base leading-7 text-[#444]">Explore opportunities to grow, make an impact and help shape the future of ColorEyes.</p></div>
        <div className="mt-12 grid grid-cols-[305px_minmax(0,1fr)] gap-5 max-[900px]:grid-cols-1">
          <aside className="h-fit rounded-xl border border-[#c9d3d5] bg-white p-6 max-[900px]:grid max-[900px]:grid-cols-3 max-[900px]:gap-6 max-[640px]:block" aria-label="Career filters">{Object.entries(filters).map(([label, values]) => <fieldset className="mb-6 last:mb-0 max-[900px]:mb-0 max-[640px]:mb-6 max-[640px]:last:mb-0" key={label}><legend className="text-base font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)]">{label}</legend><div className="mt-4 space-y-3">{values.map((value) => <label className="flex cursor-pointer items-center gap-3 text-sm text-[#303030]" key={value}><input className="size-5 appearance-none rounded-[5px] border border-[#0b6e35] bg-white checked:border-[#1893ae] checked:bg-[#1893ae]" type="checkbox" checked={selected.includes(value)} onChange={() => toggleFilter(value)} /><span>{value}</span></label>)}</div></fieldset>)}</aside>
          <div><form className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_148px] gap-4 max-[640px]:grid-cols-1" onSubmit={search}><label className="sr-only" htmlFor="job-keywords">Job title or skill</label><input className="h-[52px] rounded-lg border border-[#c9d3d5] bg-white px-4 text-sm outline-none placeholder:text-[#666] focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="job-keywords" value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="Job title or skill" /><label className="sr-only" htmlFor="job-location">City, state, province or country</label><input className="h-[52px] rounded-lg border border-[#c9d3d5] bg-white px-4 text-sm outline-none placeholder:text-[#666] focus:border-[#1893ae] focus:ring-2 focus:ring-[#1893ae]/15" id="job-location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, State, Province / Country" /><button className="h-[52px] cursor-pointer rounded-lg bg-[#08778f] px-6 text-base font-semibold text-white transition hover:bg-[#065f72]" type="submit">Search</button></form>
            <div className="mt-6 space-y-5" aria-live="polite">{visibleJobs.length ? visibleJobs.map((job) => { const isExpanded = expandedJob === job.id; return <article className="rounded-xl border border-[#c9d3d5] bg-white p-6 shadow-[0_1px_8px_rgba(6,83,102,.04)] max-[640px]:p-5" key={job.id}><div className="flex items-start justify-between gap-5"><div><h3 className="text-2xl leading-8 font-semibold text-black [font-family:var(--font-gabarito)] max-[640px]:text-xl max-[640px]:leading-7">{job.title}</h3><p className="mt-2 text-sm font-medium text-[#333]">{job.city}</p></div><div className="shrink-0 text-right text-sm"><p className="font-semibold text-[#1d1d1d]">{job.type}</p><p className="mt-2 text-[#555]">{job.date}</p></div></div><p className="mt-5 text-sm leading-6 text-[#444]">{isExpanded ? job.description : job.summary}</p><div className="mt-6 flex flex-wrap gap-3"><button className="inline-flex h-11 cursor-pointer items-center rounded-lg bg-[#08778f] px-5 text-sm font-semibold text-white transition hover:bg-[#065f72]" type="button" onClick={() => setApplicationJob(job)}>Apply Now</button><button className="inline-flex h-11 cursor-pointer items-center rounded-lg border border-[#08778f] px-5 text-sm font-semibold text-[#08778f] transition hover:bg-[#e3f1fc]" type="button" onClick={() => setExpandedJob(isExpanded ? null : job.id)} aria-expanded={isExpanded}>{isExpanded ? "Hide JD" : "View JD"}</button></div></article>; }) : <p className="rounded-xl border border-dashed border-[#a9c9d0] bg-white px-6 py-14 text-center text-base text-[#555]">No roles match those filters. Try a different job title or location.</p>}</div></div>
        </div>
      </div>
    </section>
    {applicationJob && <ApplicationModal job={applicationJob} onClose={() => setApplicationJob(null)} />}
    <Footer homePath="/" />
  </main>;
}
