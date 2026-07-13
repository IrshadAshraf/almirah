import React from "react";
import ProductCards, { collectionProducts } from "./ProductCards";
import AnimatedPillLabel from "./AnimatedPillLabel";
import { Reveal } from "./ui";
export default function Collections() {
  return (
    <section className="bg-white px-6 py-12 text-center md:px-[5vw] md:py-14">
      <Reveal effect="blur">
        <AnimatedPillLabel>OUR COLLECTION</AnimatedPillLabel>
        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
          Discover Our <span className="text-brand">Latest Arrivals</span>
        </h2>
        <p className="mx-auto mb-7 mt-5 max-w-2xl leading-relaxed text-slate-500 md:mb-8">
          Explore our newest collection of thoughtfully designed products, from
          eco-friendly essentials and premium packaging to unique gifts.
        </p>
      </Reveal>
      <ProductCards items={collectionProducts} />
    </section>
  );
}
