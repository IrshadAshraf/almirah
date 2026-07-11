import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedPillLabel from "./AnimatedPillLabel";

const steps = [
  {
    Icon: Search,
    title: "Explore",
    image: "Rectangle 1000002161.png",
    description:
      "Browse our carefully curated collection of premium products, sustainable essentials, and customer favorites to find exactly what you need.",
    detail:
      "Discover a focused edit of fashion selected to make browsing feel inspiring, simple, and personal.",
  },
  {
    Icon: FaStore,
    title: "Choose",
    image: "Rectangle 1000002161 (2).png",
    description:
      "Browse our carefully curated collection of premium products, sustainable essentials, and customer favorites to find exactly what you need.",
    detail:
      "Compare the pieces you love and choose the style that feels right for your wardrobe and occasion.",
  },
  {
    Icon: FaShoppingCart,
    title: "Enjoy",
    image: "Rectangle 1000002161 (1).png",
    description:
      "Browse our carefully curated collection of premium products, sustainable essentials, and customer favorites to find exactly what you need.",
    detail:
      "Complete your order with confidence and enjoy a carefully prepared Almirah experience at your doorstep.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setActive(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <section className="overflow-x-clip px-6 py-16 text-center md:px-[5vw] md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatedPillLabel>How It Works</AnimatedPillLabel>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-[#171c2d] md:text-6xl">
            Simple. Seamless. Convenient.
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-[1640px] grid-cols-1 gap-8 text-left md:grid-cols-2 md:gap-10 lg:mt-16 xl:grid-cols-3">
          {steps.map((step, index) => (
            <ProcessCard
              key={step.title}
              step={step}
              index={index}
              onClick={() => setActive(step)}
            />
          ))}
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {active && (
            <ProcessDialog step={active} onClose={() => setActive(null)} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function ProcessCard({ step, index, onClick }) {
  const { Icon, title, image, description } = step;
  const reveals = [
    { opacity: 0, x: -70, rotateY: -18, scale: 0.94 },
    { opacity: 0, y: 75, rotateX: 20, scale: 0.88 },
    { opacity: 0, x: 70, rotateY: 18, scale: 0.94 },
  ];
  const floats = [
    { y: [0, -9, 0], rotate: [-0.5, 0.5, -0.5] },
    { y: [0, -6, 0], x: [0, 4, 0] },
    { y: [0, -11, 0], rotate: [0.6, -0.6, 0.6] },
  ];

  return (
    <motion.div
      initial={reveals[index]}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformPerspective: 1000 }}
    >
      <motion.article
        animate={floats[index]}
        transition={{
          duration: 4.2 + index * 0.55,
          delay: index * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
          scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        }}
        whileHover={{ scale: 1.018 }}
        className="group relative overflow-hidden rounded-[22px] border border-[#eaded7] bg-[#fffdfc] shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-stone-900/15"
      >
        <div
          className={`h-[296px] overflow-hidden ${
            index === 0 ? "rounded-[21px]" : "rounded-t-[21px]"
          }`}
        >
          <img
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
            src={`/assets/how it works/${image}`}
            alt={title}
          />
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.08, rotate: index % 2 ? 4 : -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={onClick}
          className="absolute left-7 top-[244px] grid h-24 w-24 place-items-center rounded-full border-[8px] border-white bg-brand text-white shadow-xl shadow-stone-900/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          aria-label={`Open ${title} process details`}
        >
          <Icon className="h-9 w-9" />
        </motion.button>

        <div className="min-h-[232px] px-7 pb-5 pt-5 sm:px-10">
          <div className="ml-28 sm:ml-[122px]">
            <p className="font-serif text-[40px] leading-none text-brand">
              0{index + 1}
            </p>
            <h3 className="mt-1 text-[38px] font-medium leading-none text-brand">
              {title}
            </h3>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            {description}
          </p>
          <button
            type="button"
            onClick={onClick}
            className="group/link mt-4 flex w-full items-center justify-end gap-2 text-sm font-medium text-brand transition hover:-translate-x-1"
          >
            <span className="transition-transform group-hover/link:translate-x-1">
              →
            </span>
            Our process
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ProcessDialog({ step, onClose }) {
  const { Icon, title, detail } = step;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-stone-950/55 p-5 backdrop-blur-md sm:p-8"
      role="presentation"
    >
      <motion.section
        initial={{ opacity: 0, y: 36, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 22, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="process-dialog-title"
        className="relative w-full max-w-md rounded-[2rem] border border-white/60 bg-[#fffaf7]/85 p-8 text-left shadow-2xl backdrop-blur-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white"
          aria-label="Close process details"
        >
          <X className="h-5 w-5" />
        </button>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
          <Icon className="h-6 w-6" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-brand">
          Our process
        </p>
        <h2 id="process-dialog-title" className="mt-3 text-3xl font-bold">
          {title}
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">{detail}</p>
      </motion.section>
    </motion.div>
  );
}
