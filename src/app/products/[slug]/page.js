import { notFound } from "next/navigation";

import ProductListingPage from "@/app/products/page";
import ProductDetailPage from "@/components/product/ProductDetailPage";
import { getProductBySlug, products } from "@/data/products";

const categoryNames = {
  clearthin: "ClearThin",
  polylite: "Polylite",
  celebration: "Celebration",
};
const categoryIds = Object.keys(categoryNames);

export const dynamicParams = false;

export function generateStaticParams() {
  return [...products.map(({ slug }) => ({ slug })), ...categoryIds.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (categoryIds.includes(slug)) {
    return {
      title: `${categoryNames[slug]} Contact Lenses | ColorEyes`,
      description: `Explore the ${categoryNames[slug]} ColorEyes contact lens collection.`,
    };
  }
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | ColorEyes`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  if (categoryIds.includes(slug)) {
    return <ProductListingPage initialCategoryId={slug} key={slug} />;
  }
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
