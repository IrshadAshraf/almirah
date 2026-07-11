import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, HeartPulse, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const cards = [
  {
    title: "Premium Quality Fabrics",
    text: "We carefully source premium fabrics and materials to ensure lasting comfort.",
    points: ["Comfortable, considered materials", "Selected for lasting wear", "A refined feel and finish"],
  },
  {
    title: "Sustainable Fashion",
    text: "Committed to responsible sourcing and eco-conscious practices.",
    points: ["More thoughtful sourcing", "Pieces chosen for longevity", "A less wasteful approach to style"],
  },
  {
    title: "Timeless Designs",
    text: "Blending modern trends with classic elegance.",
    points: ["Easy-to-style silhouettes", "Modern details with lasting appeal", "Designed to stay in rotation"],
  },
  {
    title: "Loved by Thousands",
    text: "Trusted by customers who appreciate quality craftsmanship.",
    points: ["A growing fashion community", "Chosen for quality and confidence", "Customer trust at the heart of Almirah"],
  },
];

export default function Excellence() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) =>
      event.key === "Escape" && setActiveCard(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <section className="overflow-hidden bg-[#eee1d8] px-6 py-24 text-center md:px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.9, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Why We Deliver Excellence
          </h2>
          <p className="mt-4 text-slate-500">
            Every piece is thoughtfully selected to bring together timeless
            style, premium quality, and everyday comfort.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-[1640px] gap-6 lg:grid-cols-[1fr_1.5fr_1fr] lg:items-center">
          <div className="grid gap-6">
            {cards.slice(0, 2).map((card, index) => (
              <ExcellenceCard
                key={card.title}
                card={card}
                index={index}
                side="left"
                onClick={() => setActiveCard(card)}
              />
            ))}
          </div>

          <TiltImage />

          <div className="grid gap-6">
            {cards.slice(2).map((card, index) => (
              <ExcellenceCard
                key={card.title}
                card={card}
                index={index + 2}
                side="right"
                onClick={() => setActiveCard(card)}
              />
            ))}
          </div>
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {activeCard && (
            <ExcellenceDialog
              card={activeCard}
              onClose={() => setActiveCard(null)}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function ExcellenceCard({ card, index, side, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: side === "left" ? -60 : 60,
        y: index % 2 ? 25 : -25,
        rotate: side === "left" ? -4 : 4,
        filter: "blur(8px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay: index * 0.11,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -5 : 0, scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full overflow-hidden rounded-2xl border border-white/70 bg-white p-7 text-left shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <CardFill index={index} hovered={hovered} />
        <motion.img
          aria-hidden="true"
          src="/assets/Excellence/Vector to place at bottom right in bg of each card.png"
          alt=""
          animate={{
            opacity: hovered ? 0.3 : 0.16,
            scale: hovered ? 1.08 : 1,
            rotate: hovered ? -3 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-0 right-1 z-[1] w-16 object-contain object-bottom-right"
        />
        <motion.span
          animate={
            hovered
              ? {
                  scale: [1, 1.12, 1],
                  boxShadow: [
                    "0 0 0 rgba(255,255,255,0)",
                    "0 0 24px 7px rgba(255,255,255,.7)",
                    "0 0 10px 3px rgba(255,255,255,.35)",
                  ],
                }
              : { scale: 1, boxShadow: "0 0 0 rgba(255,255,255,0)" }
          }
          transition={hovered ? { duration: 1.4, repeat: Infinity } : { duration: 0.3 }}
          className="relative grid h-10 w-10 place-items-center rounded-xl bg-[#f1e3da] text-brand group-hover:bg-white"
        >
          <HeartPulse className="h-5 w-5" />
        </motion.span>
        <h3 className="relative mt-5 font-bold transition-colors duration-300 group-hover:text-white">
          {card.title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-white/85">
          {card.text}
        </p>
      </motion.button>
    </motion.div>
  );
}

function CardFill({ index, hovered }) {
  const shared = {
    duration: 0.62,
    ease: [0.16, 1, 0.3, 1],
  };

  if (index === 0) {
    return (
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={shared}
        className="pointer-events-none absolute inset-0 origin-bottom bg-brand"
      />
    );
  }

  if (index === 1) {
    return (
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={shared}
        className="pointer-events-none absolute inset-0 origin-left bg-brand"
      />
    );
  }

  if (index === 2) {
    return (
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          clipPath: hovered
            ? "circle(150% at 100% 0%)"
            : "circle(0% at 100% 0%)",
        }}
        transition={shared}
        className="pointer-events-none absolute inset-0 bg-brand"
      />
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={{
        clipPath: hovered
          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          : "polygon(100% 0, 100% 0, 0 100%, 0 100%)",
      }}
      transition={shared}
      className="pointer-events-none absolute inset-0 bg-brand"
    />
  );
}

function TiltImage() {
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 150, damping: 18 });
  const rotateX = useSpring(rawY, { stiffness: 150, damping: 18 });
  const captionRotateY = useTransform(rotateY, (value) => value * -0.75);
  const captionRotateX = useTransform(rotateX, (value) => value * -0.75);

  const trackCursor = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawX.set(x * 13);
    rawY.set(y * -13);
  };

  const resetTilt = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, rotateZ: -5, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, scale: 1, rotateZ: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={trackCursor}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      className="relative h-[440px]"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0 overflow-hidden rounded-3xl border border-blue-300 shadow-xl"
      >
        <motion.img
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
          src="/assets/Excellence/Image (4).png"
          alt="Fashion look"
        />
        <ImageBorderOrbit />
      </motion.div>

      <motion.div
        style={{
          rotateX: captionRotateX,
          rotateY: captionRotateY,
        }}
        animate={{ y: hovered ? -7 : 0, scale: hovered ? 1.025 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-6 right-6 z-20 isolate overflow-hidden rounded-2xl bg-brand p-5 text-white shadow-xl [backface-visibility:visible]"
      >
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 z-0 origin-left bg-[#fff4ed]"
        />
        <p
          className={`relative z-20 opacity-100 transition-colors duration-300 ${
            hovered ? "text-brand" : "text-white"
          }`}
        >
          “Fashion is more than what you wear—it’s how you express your
          confidence every day.”
        </p>
      </motion.div>
    </motion.div>
  );
}

function ImageBorderOrbit() {
  const duration = 5.8;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
    >
      {[
        {
          color: "#ffffff",
          glow: "rgba(255,255,255,.9)",
          delay: 0,
        },
        {
          color: "#975124",
          glow: "rgba(151,81,36,.9)",
          delay: -duration / 2,
        },
      ].map((light) => (
        <motion.span
          key={light.color}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            duration,
            delay: light.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 top-0 h-[3px] w-12 rounded-full"
          style={{
            offsetPath: "inset(2px round 24px)",
            offsetRotate: "auto",
            background: `linear-gradient(90deg, transparent, ${light.color})`,
            boxShadow: `0 0 7px 2px ${light.glow}, 0 0 16px 4px ${light.glow}`,
          }}
        />
      ))}
    </span>
  );
}

function ExcellenceDialog({ card, onClose }) {
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
        initial={{ opacity: 0, y: 38, scale: 0.92, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 22, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="excellence-dialog-title"
        className="relative w-full max-w-lg rounded-[2rem] border border-white/60 bg-[#fffaf7]/80 p-7 text-left shadow-2xl backdrop-blur-2xl sm:p-9"
      >
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white"
          aria-label="Close excellence details"
        >
          <X className="h-5 w-5" />
        </motion.button>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
          <HeartPulse className="h-6 w-6" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-brand">
          The Almirah standard
        </p>
        <h2 id="excellence-dialog-title" className="mt-3 text-3xl font-bold">
          {card.title}
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">{card.text}</p>
        <div className="mt-6 space-y-3">
          {card.points.map((point, index) => (
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
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
