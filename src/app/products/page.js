"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { products as productCatalogue } from "@/data/products";

const fallbackProduct = {
  slug: "celebration-toric-grey",
  name: "AquaVeil Clear Lens",
  note: "For 6 month use only.",
  price: "₹2,999.00",
};

const filters = ["Price", "Color", "Occasions", "Lens Type"];

const priceFilters = [
  { id: "under-1000", label: "Under ₹1,000", min: 0, max: 999.99 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { id: "above-2000", label: "Above ₹2,000", min: 2000.01, max: Number.POSITIVE_INFINITY },
];

const lensTypeFilters = ["Spherical", "Toric"];

const sortOptions = [
  { id: "latest", label: "Sort by Latest" },
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
];

function getPriceBounds(price) {
  const values = (price.match(/[\d,]+(?:\.\d+)?/g) ?? []).map((value) => Number(value.replaceAll(",", "")));
  return { min: values[0] ?? 0, max: values.at(-1) ?? 0 };
}

const categoryDefinitions = [
  { id: "clearthin", label: "ClearThin", logo: ["brand-clearthin.png", 92, 31], price: "₹999.00", heroTitle: "Clear vision. Featherlight feel.", heroCopy: "Explore ClearThin lenses designed for crisp everyday vision, breathable comfort and an effortlessly light fit.", bannerLines: ["Clearer Vision", "Starts Here"], bannerCopy: "ClearThin lenses made for clean, comfortable everyday wear.", names: ["ClearThin Air", "ClearThin Lite", "ClearThin Pure", "ClearThin Edge", "ClearThin Ultra", "ClearThin Sleek", "ClearThin Crystal", "ClearThin Prime", "ClearThin Nova", "ClearThin Aura", "ClearThin Optima", "ClearThin Elite"] },
  { id: "polylite", label: "Polylite", logo: ["brand-polylite.png", 91, 37], price: "₹1,499.00", heroTitle: "Lightweight lenses. Everyday freedom.", heroCopy: "Discover Polylite lenses made for flexible comfort, clear vision and confidence through every part of your day.", bannerLines: ["Comfort That", "Moves With You"], bannerCopy: "Polylite lenses designed for active days and easy, dependable wear.", names: ["Polylite Air", "Polylite Flex", "Polylite Crystal", "Polylite Swift", "Polylite Clear", "Polylite Active", "Polylite Feather", "Polylite Vision", "Polylite Prime", "Polylite Comfort", "Polylite Shield", "Polylite Ultra"] },
  { id: "celebration", label: "Celebration", logo: ["brand-celebration.png", 92, 37], price: "₹399.00", heroTitle: "Find Your Shade. Own Your Look.", heroCopy: "Explore coloured lenses designed to enhance your eyes with natural-looking shades, comfortable wear and effortless expression.", bannerLines: ["Find Your", "Perfect Shade"], bannerCopy: "Celebration coloured lenses designed for comfort, confidence and everyday style.", names: ["Celebration Clear 38 Torics – Yearly", "Celebration Clear – Monthly", "Celebration Clear Toric – Monthly", "Celebration Daily Disposable Soft Contact Lens", "Celebration Weekly Color – Weekly", "Celebration Disposable Color Toric – Monthly", "Celebration Colors Toric – Yearly", "Celebration Colors – Yearly", "Celebration Disposable Color – Monthly"] },
];

const productCategories = categoryDefinitions.map((category) => ({
  ...category,
  products: category.names.map((name) => {
    const catalogueProduct = productCatalogue.find((product) => product.name === name);

    return {
      slug: catalogueProduct?.slug,
      name,
      note: catalogueProduct?.note ?? "For 6 month use only.",
      price: catalogueProduct?.price ?? category.price,
      featuredImage: catalogueProduct?.featuredImage ?? null,
      hasColorVariants: catalogueProduct?.hasColorVariants ?? true,
      lensType: catalogueProduct?.lensType ?? (/toric/i.test(name) ? "Toric" : "Spherical"),
      variantColors: catalogueProduct?.variantColors ?? null,
    };
  }),
}));

function FilterButton({ active = false, children, sort = false, ...buttonProps }) {
  return (
    <button className={`flex h-[38px] w-full items-center justify-between rounded-lg border py-2 pr-3 pl-4 text-sm leading-5 font-medium transition max-[760px]:h-11 ${active ? "border-[#097890] bg-[#e3f1fc] text-[#097890]" : "border-[#666] text-[#232323]"}`} type="button" {...buttonProps}>
      <span>{children}</span>
      <Image src={sort ? "/assets/plp/sort.svg" : "/assets/plp/dropdown.svg"} alt="" width={20} height={20} />
    </button>
  );
}

function ProductCard({ product = fallbackProduct }) {
  const defaultImage = product.featuredImage ?? "/assets/plp/product-clear-lens.png";
  const [displayedImage, setDisplayedImage] = useState(defaultImage);
  const [displayedSprite, setDisplayedSprite] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");

  return (
    <article className="relative h-[549px] max-[560px]:h-[510px]">
      <div className="absolute top-0 left-0 h-[307px] w-full overflow-hidden rounded-lg border border-[#666]/20 max-[560px]:h-[220px]">
        {displayedSprite ? (
          <div className="absolute inset-0 grid place-items-center bg-white p-3">
            <div className="relative aspect-[323.25/249] w-full overflow-hidden">
              <Image
                className="absolute max-w-none"
                src={displayedImage}
                alt={`${product.name} in ${selectedVariant}`}
                width={1293}
                height={498}
                sizes="(max-width: 900px) 176vw, 1228px"
                style={{
                  height: "200%",
                  left: `-${displayedSprite[0] * 100}%`,
                  top: `-${displayedSprite[1] * 100}%`,
                  width: "400%",
                }}
              />
            </div>
          </div>
        ) : (
          <Image className={displayedImage === product.featuredImage ? "object-contain p-3" : "object-cover"} src={displayedImage} alt={selectedVariant ? `${product.name} in ${selectedVariant}` : product.name} fill sizes="(max-width: 900px) 44vw, 307px" />
        )}
      </div>
      <div className="absolute top-[327px] left-3 max-[560px]:top-[238px] max-[560px]:right-2 max-[560px]:left-2">
        <h3 className="text-base font-bold leading-6 text-[#232323] max-[560px]:min-h-[60px] max-[560px]:text-sm max-[560px]:leading-5">{product.name}</h3>
        <p className="mt-1 font-[family-name:var(--font-manrope)] text-xs leading-5 text-[#666] max-[560px]:text-[11px] max-[560px]:leading-4">{product.note}</p>
        <div>
          {product.hasColorVariants ? (
            <>
              <p className="mt-[10px] font-[family-name:var(--font-manrope)] text-xs leading-5 text-[#666]">Available Variants</p>
              {product.variantColors ? (
                <div className="mt-2 flex h-[22px] items-center gap-2 max-[560px]:w-full max-[560px]:overflow-x-auto" aria-label={`${product.name} colour variants`}>
                  {product.variantColors.map(([name, color, image, sprite]) => (
                    <button
                      aria-label={`Show ${name}`}
                      aria-pressed={selectedVariant === name}
                      className={`size-[22px] shrink-0 rounded-full border-2 transition ${selectedVariant === name ? "border-[#097890]" : "border-transparent"}`}
                      key={name}
                      onClick={() => {
                        setSelectedVariant(name);
                        if (image) {
                          setDisplayedImage(image);
                          setDisplayedSprite(sprite ?? null);
                        }
                      }}
                      style={{ backgroundColor: color }}
                      title={name}
                      type="button"
                    />
                  ))}
                </div>
              ) : (
                <Image className="mt-2 h-[22px] w-[104px]" src="/assets/plp/variants.svg" alt="Four lens variants" width={104} height={22} />
              )}
            </>
          ) : (
            <>
              <p className="mt-[10px] font-[family-name:var(--font-manrope)] text-xs leading-5 text-[#666]">Lens Variant</p>
              <div className="mt-2 inline-flex h-[22px] items-center gap-1.5 rounded-full bg-[#f0f7ff] px-2.5 font-[family-name:var(--font-manrope)] text-[11px] font-semibold text-[#097890]">
                <span className="size-2.5 rounded-full border border-[#9dcbd5] bg-white" aria-hidden="true" />
                Clear Lens
              </div>
            </>
          )}
        </div>
        <p className="mt-3 text-xl font-medium leading-[30px] text-[#097890] max-[560px]:text-lg">{product.price}</p>
      </div>
      <Link className="absolute bottom-0 left-0 grid h-11 w-full place-items-center rounded bg-[#1893ae] font-[family-name:var(--font-manrope)] text-base font-semibold text-white transition hover:bg-[#117f97] max-[560px]:text-sm" href={`/products/${product.slug}`}>
        View Details
      </Link>
    </article>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="mx-auto grid w-[min(1280px,89%)] grid-cols-4 gap-[18px] max-[900px]:grid-cols-2 max-[560px]:w-[calc(100%-24px)] max-[560px]:gap-3">
      {products.map((product) => <ProductCard product={product} key={product.name} />)}
    </div>
  );
}

const helpCards = [
  ["/assets/plp/search.svg", "Find My Product", "Get Started"],
  ["/assets/plp/calculator.svg", "Lens Power Calculator", "Calculate Now"],
  ["/assets/plp/location.svg", "Find A Distributor", "Find Nearby"],
];

function HelpCard({ icon, title, action, primary }) {
  return (
    <article className="flex min-h-[334px] flex-col rounded-2xl border-[.6px] border-[#097890] bg-[#fcfcfc] p-6">
      <div className="grid size-14 place-items-center rounded-full bg-white shadow-[0_4px_16px_rgba(9,120,144,.12)]">
        <Image src={icon} alt="" width={32} height={32} />
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-[30px] text-[#097890]">{title}</h3>
      <p className="mt-4 font-[family-name:var(--font-manrope)] text-sm leading-5 text-[#444]">Take a moment to answer a few questions, and we will provide you recommendations for the perfect lens tailored just for you.</p>
      <a className={`mt-auto inline-flex h-12 w-fit items-center gap-3 rounded-full py-1 pr-1 pl-5 font-[family-name:var(--font-manrope)] text-base font-semibold ${primary ? "bg-[#1893ae] text-white" : "border border-[#097890] text-[#097890]"}`} href="#">
        {action}
        <span className={`grid size-10 place-items-center rounded-full ${primary ? "bg-white" : "size-9 border border-[#097890]"}`}><Image src="/assets/plp/arrow.svg" alt="" width={18} height={18} /></span>
      </a>
    </article>
  );
}

export default function ProductListingPage() {
  const [activeCategoryId, setActiveCategoryId] = useState("clearthin");
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [isColorFilterOpen, setIsColorFilterOpen] = useState(false);
  const [isLensTypeFilterOpen, setIsLensTypeFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLensType, setSelectedLensType] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const activeCategory = productCategories.find((category) => category.id === activeCategoryId) ?? productCategories[0];
  const selectedPriceFilter = priceFilters.find((priceFilter) => priceFilter.id === selectedPrice);
  const selectedSortOption = sortOptions.find((sortOption) => sortOption.id === selectedSort);
  const availableColors = Array.from(
    new Map(
      activeCategory.products.flatMap((product) => product.variantColors ?? []).map(([name, color]) => [name, [name, color]]),
    ).values(),
  );
  const filteredProducts = activeCategory.products.filter((product) => {
    const priceMatches = !selectedPriceFilter || (() => {
      const bounds = getPriceBounds(product.price);
      return bounds.max >= selectedPriceFilter.min && bounds.min <= selectedPriceFilter.max;
    })();
    const colorMatches = !selectedColor || product.variantColors?.some(([name]) => name === selectedColor);
    const lensTypeMatches = !selectedLensType || product.lensType === selectedLensType;

    return priceMatches && colorMatches && lensTypeMatches;
  });
  const displayedProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (selectedSort === "price-low-high") return getPriceBounds(firstProduct.price).min - getPriceBounds(secondProduct.price).min;
    if (selectedSort === "price-high-low") return getPriceBounds(secondProduct.price).min - getPriceBounds(firstProduct.price).min;
    return 0;
  });
  const hasActiveFilters = Boolean(selectedPrice || selectedColor || selectedLensType || selectedSort);

  function clearFilters() {
    setSelectedPrice("");
    setSelectedColor("");
    setSelectedLensType("");
    setSelectedSort("");
    setIsPriceFilterOpen(false);
    setIsColorFilterOpen(false);
    setIsLensTypeFilterOpen(false);
    setIsSortOpen(false);
  }

  return (
    <main className="overflow-hidden bg-white text-[#111]">
      <Header />
      <section className="relative mt-[120px] h-[444px] overflow-hidden bg-[#a9cceb] [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.38),transparent_34%),linear-gradient(110deg,#bedbf3_0%,#9fc5e7_100%)] max-[760px]:h-[650px]">
        <div className="absolute top-[60px] left-[80px] z-10 flex items-center gap-2.5 rounded-full bg-[#e3f1fc] px-4 py-2 max-[760px]:left-6"><Image src="/assets/plp/badge-star.png" alt="" width={20} height={20} /><span className="font-[family-name:var(--font-manrope)] text-sm font-semibold">Your Perfect Lens Awaits</span></div>
        <div className="absolute top-[139px] left-[80px] z-10 max-w-[522px] text-white max-[760px]:top-32 max-[760px]:left-6"><h1 className="max-w-[430px] text-[40px] leading-[52px] font-bold">{activeCategory.heroTitle}</h1><p className="mt-5 font-[family-name:var(--font-manrope)] text-base leading-6">{activeCategory.heroCopy}</p><div className="mt-8 flex items-center"><div className="flex w-[89px]">{[1,2,3,4].map((n,index)=><Image className={`size-8 rounded-full ${index ? "-ml-[13px]" : ""}`} src={`/assets/plp/avatar-${n}.png`} alt="" width={32} height={32} key={n}/>)}</div><span className="ml-3 font-[family-name:var(--font-manrope)] text-sm">Trusted by 4k+ Professionals</span></div></div>
        <Image className="absolute top-0 left-[54.7%] z-[2] h-[691px] w-[461px] object-cover max-[1000px]:left-[58%] max-[760px]:top-[285px] max-[760px]:left-[-20px] max-[760px]:h-[430px] max-[760px]:w-[287px]" src="/assets/plp/bottle-small.png" alt="Model wearing coloured lenses" width={461} height={691} priority />
        <Image className="absolute top-[14px] right-[23px] h-[505px] w-[337px] object-cover max-[1000px]:right-[-60px] max-[760px]:top-[325px] max-[760px]:right-[-10px] max-[760px]:h-[360px] max-[760px]:w-[240px]" src="/assets/plp/bottle-large.png" alt="Model wearing coloured lenses" width={337} height={505} priority />
      </section>

      <section className="relative mx-auto mt-9 h-[38px] w-[min(1280px,89%)] max-[1050px]:flex max-[1050px]:h-auto max-[1050px]:flex-wrap max-[1050px]:items-center max-[1050px]:justify-between max-[1050px]:gap-4 max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-3">
        <div className="absolute top-0 left-0 flex h-[38px] w-[299px] items-center gap-3 max-[1050px]:static max-[760px]:col-span-2 max-[760px]:h-11 max-[760px]:w-full max-[760px]:justify-start max-[760px]:overflow-x-auto max-[760px]:pb-1">
          {productCategories.map((category) => {
            const [src, width, height] = category.logo;
            const isActive = activeCategoryId === category.id;

            return (
              <button
                aria-label={`Show ${category.label} products`}
                aria-pressed={isActive}
                className={`grid h-[38px] shrink-0 place-items-center rounded px-1 transition ${isActive ? "bg-[#e3f1fc] ring-1 ring-[#097890]" : "hover:bg-[#f0f7ff]"}`}
                key={category.id}
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setSelectedPrice("");
                  setSelectedColor("");
                  setSelectedLensType("");
                  setSelectedSort("");
                  setIsPriceFilterOpen(false);
                  setIsColorFilterOpen(false);
                  setIsLensTypeFilterOpen(false);
                  setIsSortOpen(false);
                }}
                type="button"
              >
                <Image className="object-contain" src={`/assets/plp/${src}`} alt={category.label} width={width} height={height}/>
              </button>
            );
          })}
        </div>
        <div className="absolute top-0 left-[315px] flex h-[38px] gap-[15px] max-[1050px]:static max-[760px]:contents">
          {filters.map((filter, index) => {
            const isPrice = filter === "Price";
            const isColor = filter === "Color";
            const isLensType = filter === "Lens Type";
            const isOpen = isPrice ? isPriceFilterOpen : isColor ? isColorFilterOpen : isLensType ? isLensTypeFilterOpen : false;
            const isActive = isPrice ? Boolean(selectedPrice) : isColor ? Boolean(selectedColor) : isLensType ? Boolean(selectedLensType) : false;
            const filterLabel = isPrice && selectedPriceFilter
              ? selectedPriceFilter.label
              : isColor && selectedColor
                ? selectedColor
                : isLensType && selectedLensType
                  ? selectedLensType
                : filter;

            return (
              <div className={`relative max-[760px]:w-full ${index === 0 ? "w-[130px]" : index === 1 ? "w-[130px]" : index === 2 ? "w-[115px]" : "w-[115px]"}`} key={filter}>
                <FilterButton
                  active={isActive}
                  aria-controls={isPrice ? "price-filter-options" : isColor ? "color-filter-options" : isLensType ? "lens-type-filter-options" : undefined}
                  aria-expanded={isPrice || isColor || isLensType ? isOpen : undefined}
                  onClick={isPrice
                    ? () => {
                        setIsPriceFilterOpen((openState) => !openState);
                        setIsColorFilterOpen(false);
                        setIsLensTypeFilterOpen(false);
                        setIsSortOpen(false);
                      }
                    : isColor
                      ? () => {
                          setIsColorFilterOpen((openState) => !openState);
                          setIsPriceFilterOpen(false);
                          setIsLensTypeFilterOpen(false);
                          setIsSortOpen(false);
                        }
                      : isLensType
                        ? () => {
                            setIsLensTypeFilterOpen((openState) => !openState);
                            setIsPriceFilterOpen(false);
                            setIsColorFilterOpen(false);
                            setIsSortOpen(false);
                          }
                      : undefined}
                >
                  <span className="block max-w-[125px] truncate">{filterLabel}</span>
                </FilterButton>
                {isPrice && isPriceFilterOpen && (
                  <div className="absolute top-[46px] left-0 z-50 w-[220px] rounded-lg border border-[#666]/30 bg-white p-2 shadow-[0_6px_18px_rgba(0,0,0,.14)]" id="price-filter-options" role="listbox" aria-label="Price ranges">
                    {priceFilters.map((priceFilter) => (
                      <button
                        aria-selected={selectedPrice === priceFilter.id}
                        className={`flex h-10 w-full items-center rounded px-3 text-left font-[family-name:var(--font-manrope)] text-sm text-[#232323] transition hover:bg-[#f0f7ff] ${selectedPrice === priceFilter.id ? "bg-[#e3f1fc] font-semibold text-[#097890]" : ""}`}
                        key={priceFilter.id}
                        onClick={() => {
                          setSelectedPrice(priceFilter.id);
                          setIsPriceFilterOpen(false);
                        }}
                        role="option"
                        type="button"
                      >
                        {priceFilter.label}
                      </button>
                    ))}
                  </div>
                )}
                {isColor && isColorFilterOpen && (
                  <div className="absolute top-[46px] left-0 z-50 max-h-[330px] w-[240px] overflow-y-auto rounded-lg border border-[#666]/30 bg-white p-2 shadow-[0_6px_18px_rgba(0,0,0,.14)] max-[760px]:right-0 max-[760px]:left-auto max-[400px]:w-[min(240px,calc(100vw-24px))]" id="color-filter-options" role="listbox" aria-label={`${activeCategory.label} colours`}>
                    {availableColors.length ? availableColors.map(([name, color]) => (
                      <button
                        aria-selected={selectedColor === name}
                        className={`flex h-9 w-full items-center gap-3 rounded px-2 text-left font-[family-name:var(--font-manrope)] text-sm text-[#232323] transition hover:bg-[#f0f7ff] ${selectedColor === name ? "bg-[#e3f1fc] font-semibold text-[#097890]" : ""}`}
                        key={name}
                        onClick={() => {
                          setSelectedColor(name);
                          setIsColorFilterOpen(false);
                        }}
                        role="option"
                        type="button"
                      >
                        <span className="size-4 shrink-0 rounded-[3px] border border-black/15" style={{ backgroundColor: color }} aria-hidden="true" />
                        <span>{name}</span>
                      </button>
                    )) : <p className="px-2 py-3 font-[family-name:var(--font-manrope)] text-sm text-[#666]">No colour variants are available in this category.</p>}
                  </div>
                )}
                {isLensType && isLensTypeFilterOpen && (
                  <div className="absolute top-[46px] right-0 z-50 w-[180px] rounded-lg border border-[#666]/30 bg-white p-2 shadow-[0_6px_18px_rgba(0,0,0,.14)]" id="lens-type-filter-options" role="listbox" aria-label="Lens types">
                    {lensTypeFilters.map((lensType) => (
                      <button
                        aria-selected={selectedLensType === lensType}
                        className={`flex h-10 w-full items-center rounded px-3 text-left font-[family-name:var(--font-manrope)] text-sm text-[#232323] transition hover:bg-[#f0f7ff] ${selectedLensType === lensType ? "bg-[#e3f1fc] font-semibold text-[#097890]" : ""}`}
                        key={lensType}
                        onClick={() => {
                          setSelectedLensType(lensType);
                          setIsLensTypeFilterOpen(false);
                        }}
                        role="option"
                        type="button"
                      >
                        {lensType}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 right-0 h-[38px] w-[140px] max-[1050px]:static max-[760px]:col-span-2 max-[760px]:h-11 max-[760px]:w-full">
          <FilterButton
            active={Boolean(selectedSort)}
            aria-controls="sort-options"
            aria-expanded={isSortOpen}
            onClick={() => {
              setIsSortOpen((openState) => !openState);
              setIsPriceFilterOpen(false);
              setIsColorFilterOpen(false);
              setIsLensTypeFilterOpen(false);
            }}
            sort
          >
            <span className="block max-w-[130px] truncate">{selectedSortOption?.label ?? "Sort"}</span>
          </FilterButton>
          {isSortOpen && (
            <div className="absolute top-[46px] right-0 z-50 w-[210px] rounded-lg border border-[#666]/30 bg-white p-2 shadow-[0_6px_18px_rgba(0,0,0,.14)]" id="sort-options" role="listbox" aria-label="Sort products">
              {sortOptions.map((sortOption) => (
                <button
                  aria-selected={selectedSort === sortOption.id}
                  className={`flex h-10 w-full items-center rounded px-3 text-left font-[family-name:var(--font-manrope)] text-sm text-[#232323] transition hover:bg-[#f0f7ff] ${selectedSort === sortOption.id ? "bg-[#e3f1fc] font-semibold text-[#097890]" : ""}`}
                  key={sortOption.id}
                  onClick={() => {
                    setSelectedSort(sortOption.id);
                    setIsSortOpen(false);
                  }}
                  role="option"
                  type="button"
                >
                  {sortOption.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto mt-4 flex min-h-8 w-[min(1280px,89%)] flex-wrap items-center justify-between gap-3 font-[family-name:var(--font-manrope)] text-sm">
        <p className="text-[#666]">Showing {displayedProducts.length} of {activeCategory.products.length} products</p>
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            {selectedPriceFilter && <button aria-label={`Remove price filter ${selectedPriceFilter.label}`} className="inline-flex items-center gap-2 rounded-full bg-[#e3f1fc] py-1.5 pr-1.5 pl-3 text-[#097890] transition hover:bg-[#d5eafa]" onClick={() => setSelectedPrice("")} type="button"><span>Price: {selectedPriceFilter.label}</span><span className="grid size-6 place-items-center rounded-full bg-[#097890] text-base leading-none font-bold text-white" aria-hidden="true">×</span></button>}
            {selectedColor && <button aria-label={`Remove color filter ${selectedColor}`} className="inline-flex items-center gap-2 rounded-full bg-[#e3f1fc] py-1.5 pr-1.5 pl-3 text-[#097890] transition hover:bg-[#d5eafa]" onClick={() => setSelectedColor("")} type="button"><span>Color: {selectedColor}</span><span className="grid size-6 place-items-center rounded-full bg-[#097890] text-base leading-none font-bold text-white" aria-hidden="true">×</span></button>}
            {selectedLensType && <button aria-label={`Remove lens type filter ${selectedLensType}`} className="inline-flex items-center gap-2 rounded-full bg-[#e3f1fc] py-1.5 pr-1.5 pl-3 text-[#097890] transition hover:bg-[#d5eafa]" onClick={() => setSelectedLensType("")} type="button"><span>Lens Type: {selectedLensType}</span><span className="grid size-6 place-items-center rounded-full bg-[#097890] text-base leading-none font-bold text-white" aria-hidden="true">×</span></button>}
            {selectedSortOption && <button aria-label={`Remove sort option ${selectedSortOption.label}`} className="inline-flex items-center gap-2 rounded-full bg-[#e3f1fc] py-1.5 pr-1.5 pl-3 text-[#097890] transition hover:bg-[#d5eafa]" onClick={() => setSelectedSort("")} type="button"><span>Sort: {selectedSortOption.label}</span><span className="grid size-6 place-items-center rounded-full bg-[#097890] text-base leading-none font-bold text-white" aria-hidden="true">×</span></button>}
            <button className="rounded-full border border-[#097890] px-3 py-1.5 font-semibold text-[#097890] transition hover:bg-[#f0f7ff]" onClick={clearFilters} type="button">Clear Filters</button>
          </div>
        )}
      </div>

      <section className="mt-6">
        {displayedProducts.length
          ? <ProductGrid products={displayedProducts.slice(0, 4)} />
          : (
            <div className="mx-auto grid min-h-[220px] w-[min(1280px,89%)] place-items-center rounded-xl border border-[#d8e3ec] bg-[#f7fbfe] px-6 text-center">
              <div><h2 className="text-2xl font-semibold text-[#232323]">No products match these filters</h2><p className="mt-2 font-[family-name:var(--font-manrope)] text-sm text-[#666]">Try another price, colour, or lens type, or clear the active filters.</p><button className="mt-5 rounded-lg bg-[#097890] px-5 py-2.5 font-[family-name:var(--font-manrope)] text-sm font-semibold text-white" onClick={clearFilters} type="button">Clear Filters</button></div>
            </div>
          )}
      </section>
      <section className="relative mt-10 h-[405px] overflow-hidden bg-white max-[700px]:h-[520px]">
        <Image
          className="absolute top-[-38px] left-[-1px] h-[481px] w-full object-cover opacity-50 max-[700px]:top-0 max-[700px]:left-0 max-[700px]:h-full"
          src="/assets/plp/hero-models.png"
          alt=""
          width={1440}
          height={481}
          sizes="100vw"
        />
        <h2 className="absolute top-24 left-[58px] z-10 w-[424px] text-[64px] leading-[72px] font-semibold tracking-[0.1742px] text-[#06586a] [font-family:var(--font-gabarito)] max-[700px]:top-14 max-[700px]:left-6 max-[700px]:w-[300px] max-[700px]:text-4xl max-[700px]:leading-11">
          {activeCategory.bannerLines.map((line) => <span className="block whitespace-nowrap" key={line}>{line}</span>)}
        </h2>
        <p className="absolute top-[260px] left-[58px] z-10 w-[399px] font-[family-name:var(--font-manrope)] text-base leading-6 tracking-[0.1742px] text-[#444] max-[700px]:top-[180px] max-[700px]:left-6 max-[700px]:w-[300px]">
          {activeCategory.bannerCopy}
        </p>
        <div className="absolute top-[-24px] left-[58.26%] flex h-[451.112px] w-[298.72px] items-center justify-center max-[700px]:top-auto max-[700px]:bottom-2 max-[700px]:left-[calc(50%-125px)] max-[700px]:h-[240px] max-[700px]:w-[145px]">
          <div className="shrink-0 rotate-[7.9deg] max-[700px]:scale-50">
            <div className="relative h-[421.711px] w-[243.077px] overflow-hidden">
              <Image
                className="absolute top-[-8.85%] left-[-301.49%] h-[116.35%] w-[604.65%] max-w-none"
                src="/assets/plp/shade-banner-bg.png"
                alt={`${activeCategory.label} contact lens bottle`}
                width={1470}
                height={491}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-[-46px] left-[74.5%] flex h-[451.112px] w-[298.72px] items-center justify-center max-[700px]:top-auto max-[700px]:bottom-2.5 max-[700px]:left-[calc(50%-5px)] max-[700px]:h-[230px] max-[700px]:w-[140px]">
          <div className="shrink-0 rotate-[7.9deg] max-[700px]:scale-50">
            <div className="relative h-[421.711px] w-[243.077px] overflow-hidden">
              <Image
                className="absolute top-[-4.52%] left-[-396.1%] h-[116.35%] w-[604.65%] max-w-none"
                src="/assets/plp/shade-banner-bg.png"
                alt={`${activeCategory.label} contact lens bottle`}
                width={1470}
                height={491}
              />
            </div>
          </div>
        </div>
      </section>
      {displayedProducts.length > 4 && <section className="mt-10"><ProductGrid products={displayedProducts.slice(4, 8)} /></section>}
      {displayedProducts.length > 8 && <section className="mt-7"><ProductGrid products={displayedProducts.slice(8, 12)} /></section>}

      <section className="mt-[60px] h-[454px] px-[5.5vw] py-[60px] [background:linear-gradient(180deg,#f1fafd_0%,#fff_100%)] max-[1180px]:h-auto">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[317px_repeat(3,301px)] gap-5 max-[1320px]:grid-cols-[280px_repeat(3,minmax(0,1fr))] max-[1180px]:grid-cols-2 max-[600px]:grid-cols-1"><div><div className="inline-flex items-center gap-2.5 rounded-full bg-[#e3f1fc] px-4 py-2"><Image src="/assets/plp/badge-star.png" alt="" width={20} height={20}/><span className="font-[family-name:var(--font-manrope)] text-sm font-semibold">Need Help Choosing?</span></div><h2 className="mt-5 max-w-[310px] text-4xl leading-12 font-bold">Find The Right Way Forward</h2><p className="mt-5 max-w-[304px] font-[family-name:var(--font-manrope)] text-base leading-7 text-[#444]">Choose the path that helps you find the right lens, check your power or connect with a nearby distributor.</p></div>{helpCards.map(([icon,title,action],index)=><HelpCard icon={icon} title={title} action={action} primary={index===0} key={title}/>)}</div>
      </section>
      <div className="h-6 bg-white" />
      <Footer />
    </main>
  );
}
