import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Award, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const assetPath = "/assets/about us/";
const imageShape = "70% / 50%";
const glassBorder = {
  boxShadow: [
    "inset 0 0 0 1px rgb(255 255 255 / .38), 0 0 7px rgb(151 81 36 / .36)",
    "inset 0 0 0 1px rgb(255 255 255 / .92), 0 0 22px rgb(151 81 36 / .8)",
    "inset 0 0 0 1px rgb(255 255 255 / .38), 0 0 7px rgb(151 81 36 / .36)",
  ],
};
const avatars = [
  "17618358139001beb1f26ce2046f42c881a0b9b4.png",
  "a24624834c5f13d85e5e4d46e8b21a3dd843bc34.png",
  "c7e4cbb15441d36b3a4d9846e7877cbb54d54a44.png",
  "b186d8c3d699757fc408c47f691a8a713b9c7ae4.png",
];
const infoCards = [
  {
    icon: "Vector (5).png",
    title: "Almirah Story",
    text: "Almirah Collective started with a simple frustration — too much noise, too many options, too little curation.",
    detail:
      "Almirah began with a belief that shopping should feel personal, considered, and calm.",
    points: [
      "Carefully selected fashion",
      "A less-is-more approach",
      "A collection with intention",
    ],
  },
  {
    icon: "Vector (6).png",
    title: "What I Want",
    text: "I wanted a store where every piece had actually been considered, not just listed.",
    detail:
      "We are building a place where every product earns its place through design, feeling, and everyday usefulness.",
    points: [
      "Thoughtful choices over endless options",
      "Details that make a difference",
      "Fashion made more personal",
    ],
  },
];

export default function AboutUs() {
  const [activeInfo, setActiveInfo] = useState(null);
  useEffect(() => {
    const closeOnEscape = (event) =>
      event.key === "Escape" && setActiveInfo(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <section className="mx-auto grid max-w-[1640px] gap-14 overflow-hidden px-6 py-20 md:grid-cols-2 md:items-center md:px-[5vw] lg:gap-20">
      <ImageComposition />
      <motion.div
        initial={{ opacity: 0, x: 55, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-flex items-center rounded-full border border-white/70 bg-brand/20 px-4 py-2 text-base font-bold tracking-widest text-brand backdrop-blur-sm"
        >
          <BrownBorderTrail />● &nbsp; About Us
        </motion.span>
        <h2 className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight text-[#10203f] md:text-6xl">
          About <span className="text-brand">Almirah</span>
          <br />
          Collective
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-500 md:text-lg">
          Every order is packed with care from Bengaluru, and shipped pan-India.
          A calmer way to discover pieces that feel like you.
        </p>
        <div className="mt-7 space-y-5">
          {infoCards.map((card, index) => (
            <Info
              key={card.title}
              {...card}
              delay={0.1 + index * 0.1}
              onClick={() => setActiveInfo(card)}
            />
          ))}
        </div>
      </motion.div>
      {createPortal(
        <AnimatePresence>
          {activeInfo && (
            <InfoDialog info={activeInfo} onClose={() => setActiveInfo(null)} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}

function BrownBorderTrail({ radius = "999px" }) {
  const duration = 3;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full"
    >
      {Array.from({ length: 18 }, (_, index) => (
        <motion.span
          key={index}
          className="absolute left-0 top-0 rounded-full bg-[#975124]"
          style={{
            offsetPath: `inset(1px round ${radius})`,
            offsetRotate: "0deg",
            width: `${4 - (index / 17) * 3}px`,
            height: `${4 - (index / 17) * 3}px`,
            opacity: 0.62 * (1 - index / 18),
            boxShadow: `0 0 ${5 - (index / 17) * 3}px ${1 - (index / 17) * 0.8}px rgba(151,81,36,.48)`,
          }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "circInOut",
            delay: index === 0 ? 0 : -(duration - index * 0.018),
          }}
        />
      ))}
      <motion.span
        className="absolute left-0 top-0 z-10 h-1.5 w-1.5 rounded-full bg-[#975124]"
        style={{
          offsetPath: `inset(1px round ${radius})`,
          offsetRotate: "0deg",
          boxShadow:
            "0 0 7px 2px rgba(151,81,36,.9), 0 0 17px 5px rgba(151,81,36,.42)",
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration, repeat: Infinity, ease: "circInOut" }}
      />
    </span>
  );
}

function ImageComposition() {
  return (
    <div className="relative mx-auto h-[clamp(390px,100vw,610px)] w-full max-w-[610px] md:h-[440px] lg:h-[540px] xl:h-[610px]">
      <ImageCard small />
      <ImageCard />
      <CustomerCard />
      <div className="absolute bottom-5 left-[17%] grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.i
            key={index}
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.75, 1.15, 0.75] }}
            transition={{
              duration: 1.8,
              delay: index * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-[#d8b6a2]"
          />
        ))}
      </div>
    </div>
  );
}

function ImageCard({ small = false }) {
  const image = small ? "image 3680 (2).png" : "image 3679 (1).png";
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: small ? -45 : 45,
        y: 35,
        rotate: small ? -5 : 5,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 115,
        damping: 16,
        delay: small ? 0 : 0.15,
        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={{ scale: 1.025 }}
      className={
        small
          ? "absolute left-[2%] top-8 aspect-[11/20] w-[clamp(120px,34vw,220px)] md:w-[120px] lg:w-[170px] xl:w-[220px]"
          : "absolute right-0 top-0 aspect-[7/12] w-[clamp(165px,54vw,350px)] md:w-[175px] lg:w-[270px] xl:w-[350px]"
      }
    >
      <div
        className={`absolute inset-0 -translate-x-2 translate-y-2 rounded-[48%] border-[3px] ${small ? "border-black" : "border-[#2457c7]"}`}
        style={{ borderRadius: imageShape }}
      />
      <motion.div
        animate={{
          x: small ? [-3, 3, -3] : [3, -3, 3],
          y: small ? [2, -3, 2] : [-3, 3, -3],
        }}
        transition={{
          duration: small ? 4.5 : 5.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 overflow-hidden rounded-[48%]"
        style={{ borderRadius: imageShape }}
      >
        <img
          className="h-full w-full rounded-[48%] object-cover"
          style={{ borderRadius: imageShape }}
          src={`${assetPath}${image}`}
          alt={small ? "Almirah style" : "Almirah collection"}
        />
      </motion.div>
      {small && (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-2 top-3 z-10 rounded-xl bg-white/90 p-2 shadow-lg backdrop-blur"
        >
          <Award className="mx-auto h-4 w-4 text-brand" />
          <span className="mt-1 block text-[10px] font-bold text-[#10203f]">
            20+ Years
          </span>
          <small className="block text-[7px] text-stone-500">Experience</small>
        </motion.div>
      )}
    </motion.div>
  );
}

function CustomerCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -7, 0],
        width: expanded ? 310 : 220,
        height: expanded ? 230 : 128,
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        width: { type: "spring", stiffness: 240, damping: 24 },
        height: { type: "spring", stiffness: 240, damping: 24 },
        default: { type: "spring", stiffness: 160, damping: 16, delay: 0.45 },
      }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      tabIndex={0}
      aria-label="10 thousand happy customers. Hover for more details."
      className="absolute bottom-20 left-[27%] z-20 cursor-default overflow-hidden rounded-[25px] border border-white/80 bg-white/65 p-5 shadow-2xl shadow-stone-950/20 outline-none backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-white"
    >
      <motion.div
        animate={glassBorder}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 rounded-[25px]"
      />
      <BrownBorderTrail radius="25px" />
      <div className="relative min-w-[270px]">
        <div className="flex -space-x-2">
          {avatars.map((avatar, index) => (
            <motion.img
              key={avatar}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 1.8,
                delay: index * 0.16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
              src={`${assetPath}${avatar}`}
              alt="Happy customer"
            />
          ))}
        </div>
        <p className="mt-3 whitespace-nowrap text-sm font-medium text-[#10203f]">
          10K+ Happy customers
        </p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-4 border-t border-black/10 pt-4"
            >
              <p className="text-xs font-bold uppercase tracking-[.14em] text-brand">
                Loved by our community
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Thousands of customers discovering fashion chosen with care.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-black">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,.9)]" />
                Growing every day
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Info({ icon, title, text, delay, onClick }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="group relative flex w-full gap-5 overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-6 text-left shadow-xl shadow-stone-900/8 backdrop-blur-xl transition-colors duration-500 hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand p-3 shadow-lg shadow-brand/30 transition duration-500 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(255,255,255,.95)]">
        <img
          src={`${assetPath}${icon}`}
          alt=""
          className="h-full w-full object-contain brightness-0 invert"
        />
      </span>
      <div className="relative">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-500 transition-colors duration-500 group-hover:text-white/90">
          {text}
        </p>
      </div>
    </motion.button>
  );
}

function InfoDialog({ info, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-stone-950/55 p-5 backdrop-blur-md sm:p-8"
      onMouseDown={onClose}
      role="presentation"
    >
      <motion.section
        initial={{ opacity: 0, y: 34, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 22, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-dialog-title"
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf7]/75 p-7 shadow-2xl shadow-stone-950/45 backdrop-blur-2xl sm:p-9"
      >
        <motion.div
          animate={{ x: [-30, 35, -30], y: [-15, 20, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand/25 blur-3xl"
        />
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white shadow-lg"
          aria-label="Close details"
        >
          <X className="h-5 w-5" />
        </motion.button>
        <div className="relative">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand p-4 shadow-lg shadow-brand/30">
            <img
              src={`${assetPath}${info.icon}`}
              alt=""
              className="h-full w-full brightness-0 invert"
            />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-brand">
            About Almirah
          </p>
          <h2
            id="about-dialog-title"
            className="mt-2 font-serif text-3xl text-stone-900"
          >
            {info.title}
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">{info.detail}</p>
          <motion.ul
            initial="hidden"
            animate="visible"
            className="mt-7 space-y-3"
          >
            {info.points.map((point, index) => (
              <motion.li
                key={point}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 text-sm font-medium text-stone-700 shadow-sm"
              >
                <Check className="h-4 w-4 shrink-0 text-brand" />
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.section>
    </motion.div>
  );
}
