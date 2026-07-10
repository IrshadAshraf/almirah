import React, { useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import { Reveal } from "./ui";

function Faqs() {
  const faqs = [
    [
      "How Long Does Shipping Take?",
      "Delivery times vary depending on your location. Most orders are processed quickly and shipped within the estimated timeframe provided at checkout.",
    ],
    [
      "What Payment Methods Do You Accept?",
      "We accept major cards and secure digital payment methods.",
    ],
    [
      "Do You Offer International Shipping?",
      "Yes. International availability and delivery windows are shown at checkout.",
    ],
    [
      "How Can I Contact Customer Support?",
      "Our friendly support team is here to help through the contact links below.",
    ],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 text-left md:grid-cols-2 md:gap-24 md:px-10 md:py-28">
      <Reveal>
        <div>
          <h2 className="m-0 text-4xl font-bold tracking-[-0.06em] text-[#12252b] md:text-5xl">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="mt-10 text-sm leading-7 text-stone-600 md:text-base">
            Everything You Need to Know About Our Products &amp; Services
          </p>
          <div className="my-12 border-t border-stone-200 md:my-20" />
          <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#2860db]" /> Top Quality Products
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#2860db]" /> Exceptional Customer
              Support
            </span>
          </div>
        </div>
      </Reveal>
      <div className="grid content-start gap-4">
        {faqs.map(([q, a], i) => (
          <Reveal delay={i * 0.08} key={q}>
            <button
              className={`flex w-full items-start justify-between gap-4 rounded-2xl px-6 py-6 text-left text-lg text-[#10252b] shadow-[0_6px_22px_rgb(0_0_0_/_0.04)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f8f4f0] hover:shadow-[0_12px_28px_rgb(151_81_36_/_0.14)] ${open === i ? "bg-[#f8f4f0] shadow-[0_12px_28px_rgb(151_81_36_/_0.14)]" : "bg-white"}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span>
                <b className="font-semibold">{q}</b>
                {open === i && (
                  <p className="mb-0 mt-5 text-sm font-normal leading-7 text-stone-600">
                    {a}
                  </p>
                )}
              </span>
              <ChevronRight
                className={`mt-0.5 h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-90" : ""}`}
              />
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export default Faqs;
