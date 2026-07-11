import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Check, Gift, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const backgroundImage =
  "url('/assets/gift giving/transparent bg for the background animation.png')";

const contentReveal = {
  hidden: {},
  visible: { transition: { delayChildren: 0.2, staggerChildren: 0.14 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function GiftGiving() {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) =>
      event.key === "Escape" && setDialogOpen(false);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <section className="relative grid min-h-[340px] place-items-center overflow-hidden bg-brand px-6 py-14 text-center text-white md:min-h-[390px] md:py-16">
        <motion.div
          animate={{
            x: [-48, 42, -48],
            y: [-25, 22, -25],
            scale: [1.08, 1.18, 1.08],
            rotate: [-2.5, 2.5, -2.5],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-20 bg-cover bg-center opacity-50"
          style={{ backgroundImage }}
        />
        <motion.div
          animate={{
            x: [34, -30, 34],
            y: [18, -16, 18],
            scale: [1.22, 1.1, 1.22],
          }}
          transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-24 bg-cover bg-center opacity-20 mix-blend-screen"
          style={{ backgroundImage }}
        />
        <motion.div
          animate={{ x: ["-30%", "135%"] }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,.3),transparent_40%),linear-gradient(110deg,rgba(65,25,6,.3),transparent_48%,rgba(255,255,255,.1))]" />
        <FloatingSpecks />

        <motion.div
          variants={contentReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="relative max-w-5xl"
        >
          <motion.div variants={revealItem}>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/15 px-5 py-2 text-xs font-bold tracking-[.18em] backdrop-blur-md"
            >
              <LightBorderTrail />
              <Gift className="h-4 w-4" />
              GIFT GIVING MADE EASY
            </motion.span>
          </motion.div>

          <motion.div variants={revealItem} className="relative mt-8">
            <motion.div
              animate={{ x: ["-35%", "115%"], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                repeatDelay: 1.3,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute top-[37%] h-16 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-xl"
            />
            <motion.h2
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative text-2xl font-bold leading-[1.04] tracking-tight md:text-6xl lg:text-7xl"
            >
              Fresh styles added weekly.
              <br />
              <span className="text-[#ffe6d5]">
                Limited quantities available.
              </span>
            </motion.h2>
          </motion.div>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 md:text-base"
          >
            Celebrate every occasion with a thoughtful style selection, wrapped
            in a little extra joy.
          </motion.p>

          <motion.div variants={revealItem} className="mt-8 inline-flex">
            <MagneticButton onClick={() => setDialogOpen(true)} />
          </motion.div>
        </motion.div>
      </section>
      {createPortal(
        <AnimatePresence>
          {dialogOpen && <GiftDialog onClose={() => setDialogOpen(false)} />}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function MagneticButton({ onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.45 });

  const followCursor = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.22);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={followCursor}
      onMouseLeave={resetPosition}
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/5 px-7 py-3 text-sm font-bold backdrop-blur-sm transition-[background-color,color,box-shadow] duration-300 hover:bg-white hover:text-brand hover:shadow-xl hover:shadow-stone-950/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      Shop Dress Sets
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.button>
  );
}

function GiftDialog({ onClose }) {
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
        initial={{ opacity: 0, y: 34, scale: 0.93, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 22, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-dialog-title"
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf7]/80 p-7 text-left shadow-2xl shadow-stone-950/45 backdrop-blur-2xl sm:p-9"
      >
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white shadow-lg"
          aria-label="Close gift collection details"
        >
          <X className="h-5 w-5" />
        </motion.button>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
          <Gift className="h-6 w-6" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-brand">
          Gift giving made easy
        </p>
        <h2
          id="gift-dialog-title"
          className="mt-3 text-3xl font-bold text-stone-900"
        >
          A thoughtful style, ready to delight
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Explore dress sets selected for celebrations, meaningful moments, and
          effortless gifting.
        </p>
        <div className="mt-6 space-y-3">
          {[
            "Fresh styles added regularly",
            "Limited-quantity statement pieces",
            "Easy choices for special occasions",
          ].map((point, index) => (
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

function LightBorderTrail() {
  const duration = 3.4;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full"
    >
      {Array.from({ length: 14 }, (_, index) => (
        <motion.span
          key={index}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay: index === 0 ? 0 : -(duration - index * 0.022),
          }}
          className="absolute left-0 top-0 rounded-full bg-[#ffe6d5]"
          style={{
            offsetPath: "inset(1px round 999px)",
            offsetRotate: "0deg",
            width: `${3.5 - (index / 13) * 2.5}px`,
            height: `${3.5 - (index / 13) * 2.5}px`,
            opacity: 0.8 * (1 - index / 14),
            boxShadow: "0 0 7px rgba(255,230,213,.8)",
          }}
        />
      ))}
      <motion.span
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{
          offsetPath: "inset(1px round 999px)",
          offsetRotate: "0deg",
          boxShadow:
            "0 0 7px 2px rgba(255,255,255,.9), 0 0 15px 4px rgba(255,230,213,.45)",
        }}
      />
    </span>
  );
}

function FloatingSpecks() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 9 }, (_, index) => (
        <motion.i
          key={index}
          animate={{
            y: [0, -18 - (index % 3) * 6, 0],
            x: [0, index % 2 ? 7 : -7, 0],
            opacity: [0.18, 0.65, 0.18],
            scale: [0.7, 1.15, 0.7],
          }}
          transition={{
            duration: 3.8 + (index % 4) * 0.65,
            delay: index * 0.28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,.8)]"
          style={{
            left: `${8 + ((index * 11) % 86)}%`,
            top: `${18 + ((index * 19) % 68)}%`,
          }}
        />
      ))}
    </div>
  );
}
