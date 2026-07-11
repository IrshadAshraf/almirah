import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ShieldCheck, Star, Truck, WalletCards, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const features = [
  [Star, "Handpicked Selection", "No overwhelming catalogs. Only styles worth wearing.", ["Carefully curated collections", "Versatile styles for real wardrobes", "Less searching, better choices"]],
  [WalletCards, "Affordable Luxury", "Premium looks without premium prices.", ["Elevated style at considered prices", "Quality details without the markup", "Pieces designed to feel special"]],
  [ShieldCheck, "Quality First", "Every piece is checked for quality and comfort.", ["Fabrics selected with care", "Finishing and fit thoughtfully reviewed", "Comfort considered in every choice"]],
  [Truck, "Fast Delivery", "Reliable shipping right to your doorstep.", ["Orders prepared with care", "Dependable delivery updates", "Fashion delivered to your doorstep"]],
];

export default function WomenAffection() {
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) =>
      event.key === "Escape" && setActiveFeature(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <section className="overflow-hidden px-6 py-24 text-center md:px-[5vw]">
      <motion.div
        initial={{ opacity: 0, rotateX: 72, y: 45, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 900 }}
      >
        <motion.h2
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          Why Women Love Almirah
          <br />
          Collective
        </motion.h2>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-[1536px] gap-6 text-left sm:grid-cols-2 xl:grid-cols-4">
        {features.map(([Icon, title, text, points], index) => (
          <FeatureCard
            key={title}
            Icon={Icon}
            title={title}
            text={text}
            index={index}
            onClick={() => setActiveFeature({ Icon, title, text, points })}
          />
        ))}
      </div>
      </section>
      {createPortal(
        <AnimatePresence>
          {activeFeature && (
            <FeatureDialog
              feature={activeFeature}
              onClose={() => setActiveFeature(null)}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function FeatureCard({ Icon, title, text, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 55,
        rotateY: index % 2 ? 24 : -24,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.85,
        delay: index * 0.11,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformPerspective: 900 }}
      className="h-full"
    >
      <motion.div
        animate={hovered ? { y: 0 } : { y: [0, -9, 0] }}
        transition={
          hovered
            ? { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
            : {
                duration: 4.2 + index * 0.28,
                delay: index * 0.16,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="h-full"
      >
        <motion.button
          type="button"
          onClick={onClick}
          animate={{
            scale: hovered ? 1.025 : 1,
            boxShadow: hovered
              ? "0 24px 42px rgba(91,45,18,.24)"
              : "0 8px 20px rgba(28,25,23,.07)",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="group relative h-full min-h-[210px] w-full overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ scaleY: hovered ? 1 : 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 origin-bottom bg-brand"
          />
          <FeatureBorderAnimation index={index} />

          <motion.span
            animate={
              hovered
                ? {
                    scale: [1, 1.12, 1],
                    rotate: [0, -5, 5, 0],
                    boxShadow: [
                      "0 0 0 rgba(255,255,255,0)",
                      "0 0 26px 8px rgba(255,255,255,.72)",
                      "0 0 14px 4px rgba(255,255,255,.4)",
                    ],
                  }
                : { scale: 1, rotate: 0, boxShadow: "0 0 0 rgba(255,255,255,0)" }
            }
            transition={
              hovered
                ? { duration: 1.45, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.35 }
            }
            className="relative grid h-11 w-11 place-items-center rounded-xl bg-brand text-white ring-1 ring-white/25"
          >
            <Icon className="h-5 w-5" />
          </motion.span>

          <motion.h3
            animate={{ color: hovered ? "#ffffff" : "#1c1917" }}
            transition={{ duration: 0.35 }}
            className="relative mt-5 font-bold"
          >
            {title}
          </motion.h3>
          <motion.p
            animate={{ color: hovered ? "rgba(255,255,255,.88)" : "#57534e" }}
            transition={{ duration: 0.35 }}
            className="relative mt-2 text-sm leading-relaxed"
          >
            {text}
          </motion.p>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function FeatureBorderAnimation({ index }) {
  const path = "inset(1px round 16px)";

  if (index === 0) {
    return (
      <span className="pointer-events-none absolute inset-0 z-20 rounded-2xl">
        <motion.i
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[#ffd8be] shadow-[0_0_7px_2px_rgba(151,81,36,.8)]"
          style={{ offsetPath: path, offsetRotate: "0deg" }}
        />
      </span>
    );
  }

  if (index === 1) {
    return (
      <span className="pointer-events-none absolute inset-0 z-20 rounded-2xl">
        {[0, -2.4].map((delay) => (
          <motion.i
            key={delay}
            animate={{ offsetDistance: ["100%", "0%"] }}
            transition={{
              duration: 4.8,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_7px_2px_rgba(151,81,36,.8),0_0_13px_3px_rgba(255,255,255,.65)]"
            style={{ offsetPath: path, offsetRotate: "0deg" }}
          />
        ))}
      </span>
    );
  }

  if (index === 2) {
    return (
      <span className="pointer-events-none absolute inset-0 z-20 rounded-2xl">
        <motion.i
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-0 h-[3px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#ffd8be] to-white shadow-[0_0_8px_2px_rgba(151,81,36,.7)]"
          style={{ offsetPath: path, offsetRotate: "auto" }}
        />
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      animate={{
        boxShadow: [
          "inset 3px 0 0 rgba(151,81,36,.85), inset 0 0 0 rgba(151,81,36,0)",
          "inset 0 3px 0 rgba(151,81,36,.85), inset 0 0 12px rgba(255,216,190,.35)",
          "inset -3px 0 0 rgba(151,81,36,.85), inset 0 0 0 rgba(151,81,36,0)",
          "inset 0 -3px 0 rgba(151,81,36,.85), inset 0 0 12px rgba(255,216,190,.35)",
          "inset 3px 0 0 rgba(151,81,36,.85), inset 0 0 0 rgba(151,81,36,0)",
        ],
      }}
      transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
    />
  );
}

function FeatureDialog({ feature, onClose }) {
  const { Icon, title, text, points } = feature;
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
        initial={{ opacity: 0, y: 36, scale: 0.92, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, y: 22, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="affection-dialog-title"
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf7]/80 p-7 text-left shadow-2xl shadow-stone-950/45 backdrop-blur-2xl sm:p-9"
      >
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white shadow-lg"
          aria-label="Close feature details"
        >
          <X className="h-5 w-5" />
        </motion.button>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
          <Icon className="h-6 w-6" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-brand">
          Why women love Almirah
        </p>
        <h2
          id="affection-dialog-title"
          className="mt-3 text-3xl font-bold text-stone-900"
        >
          {title}
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">{text}</p>
        <div className="mt-6 space-y-3">
          {points.map(
            (point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + index * 0.08 }}
                className="flex items-center gap-3 text-sm text-stone-700"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {point}
              </motion.div>
            ),
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
