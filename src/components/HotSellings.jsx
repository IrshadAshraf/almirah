import React from "react";
import ProductCards from "./ProductCards";
import AnimatedPillLabel from "./AnimatedPillLabel";
import { Reveal } from "./ui";

export default function HotSellings() {
  return (
    <section className="px-6 py-24 text-center md:px-[5vw]">
      <Reveal effect="rotate">
        <AnimatedPillLabel>MOST SELL PRODUCTS</AnimatedPillLabel>
        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
          Discover Our <span className="text-brand">Best Sellers</span>
        </h2>
        <p className="mx-auto mb-14 mt-5 max-w-2xl leading-relaxed text-slate-500">
          Explore our most-loved collection featuring customer favorites and
          top-rated products.
        </p>
      </Reveal>
      <ProductCards />
    </section>
  );
}
