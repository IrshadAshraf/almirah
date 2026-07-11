import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Check, RotateCcw, Sprout } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";

const glassBorder = {
  boxShadow: [
    "inset 0 0 0 1px rgb(255 255 255 / .38), 0 0 7px rgb(151 81 36 / .36)",
    "inset 0 0 0 1px rgb(255 255 255 / .92), 0 0 22px rgb(151 81 36 / .8)",
    "inset 0 0 0 1px rgb(255 255 255 / .38), 0 0 7px rgb(151 81 36 / .36)",
  ],
};
const glassTransition = { duration: 2.6, repeat: Infinity, ease: "easeInOut" };
const perkDetails = {
  brands: {
    label: "Premium Brands",
    icon: RotateCcw,
    title: "Chosen with a discerning eye",
    description:
      "Our collection brings together elevated pieces selected for their finish, fit, and timeless appeal.",
    points: [
      "Thoughtfully curated collections",
      "Quality fabrics and considered details",
      "Styles made to stay in rotation",
    ],
  },
  stock: {
    label: "Fresh Stock",
    icon: Sprout,
    title: "Newness worth coming back for",
    description:
      "We refresh our edit regularly, so there is always something distinctive waiting to be discovered.",
    points: [
      "Regularly refreshed selections",
      "Seasonal and occasion-ready finds",
      "New styles added with care",
    ],
  },
  returns: {
    label: "Easy Returns",
    icon: Check,
    title: "Shopping should feel effortless",
    description:
      "If a piece is not quite right, our simple return process makes it easy to send it back with confidence.",
    points: [
      "Clear, customer-friendly process",
      "Easy return support",
      "Confidence with every order",
    ],
  },
  arrivals: {
    label: "New Arrivals",
    icon: ArrowUpRight,
    title: "A fresh edit awaits",
    description:
      "Meet our newest handpicked pieces—made for the moments and moods you are dressing for now.",
    points: [
      "Recently added statement pieces",
      "Easy-to-style everyday favourites",
      "Curated with the season in mind",
    ],
  },
  collection: {
    label: "The Collection",
    icon: Sprout,
    title: "Find the piece that feels like you",
    description:
      "Explore our considered collection of styles designed to bring a little more confidence to everyday dressing.",
    points: [
      "Pieces for every kind of occasion",
      "Comfort paired with elevated style",
      "A collection made to mix and make your own",
    ],
  },
};

export default function Hero() {
  const [activePerk, setActivePerk] = useState(null);
  useEffect(() => {
    const closeOnEscape = (event) =>
      event.key === "Escape" && setActivePerk(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#e7d4c5] md:min-h-[855px]">
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/src/assets/hero/Animate_mobile_screen_products_s…_202607101158.mp4" />
      </video>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(250,239,231,.97)_0%,rgba(250,239,231,.85)_35%,rgba(245,223,205,.16)_72%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [-80, 80, -80], y: [20, -18, 20], rotate: [0, 8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-[16%] h-80 w-80 rounded-full border border-brand/25 bg-brand/5 blur-[1px]"
        />
        <motion.div
          animate={{ x: [0, 55, 0], y: [0, 35, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[7%] top-[29%] h-[420px] w-[620px] opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(151,81,36,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(151,81,36,.16) 1px,transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage:
              "radial-gradient(ellipse at center,black,transparent 70%)",
          }}
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute left-[20%] top-[20%] h-72 w-72 rounded-full border border-brand/20 border-dashed"
        />
      </div>
      <div className="relative mx-auto flex min-h-[760px] w-full max-w-[1640px] items-center px-6 pb-24 pt-44 md:min-h-[855px] md:w-[92vw] md:px-0">
        <motion.div
          initial={{ opacity: 0, x: -46 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative z-10 max-w-2xl"
        >
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-flex items-center rounded-full border border-white/70 bg-white/20 px-4 py-2 text-base font-bold tracking-widest text-brand backdrop-blur-sm"
          >
            <BrownBorderTrail />● &nbsp; CURATED FASHION
          </motion.span>
          <div className="relative mt-7">
            <motion.div
              animate={{ x: [-20, 24, -20], opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-7 top-[38%] h-14 w-[88%] bg-gradient-to-r from-transparent via-brand/35 to-transparent blur-xl"
            />
            <h1 className="relative text-4xl font-bold leading-[.95] tracking-wider text-ink sm:text-7xl lg:text-[4.8rem]">
              Elevated Style
              <br />
              for Everyday
              <br />
              Living
            </h1>
          </div>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-600 md:text-xl">
            Discover handpicked fashion pieces that blend comfort, elegance, and
            individuality. Chosen to help you look effortlessly stylish.
          </p>
          <div className="mt-9 flex flex-nowrap gap-1 sm:gap-4">
            <HashLink
              smooth
              to="#collections"
              onClick={(event) => {
                event.preventDefault();
                setActivePerk("arrivals");
              }}
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-brand px-2 py-3.5 text-[11px] font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/35 sm:gap-2 sm:px-7 sm:py-4 sm:text-sm"
            >
              Shop New Arrivals <ArrowUpRight className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
            </HashLink>
            <motion.div
              animate={glassBorder}
              transition={glassTransition}
              className="relative min-w-0 flex-1 rounded-full"
            >
              <BrownBorderTrail />
              <HashLink
                smooth
                to="#gallary"
                onClick={(event) => {
                  event.preventDefault();
                  setActivePerk("collection");
                }}
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-ink bg-white/20 px-2 py-3.5 text-[11px] font-bold text-ink backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/70 sm:px-7 sm:py-4 sm:text-sm"
              >
                Shop Collection
              </HashLink>
            </motion.div>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base text-stone-700">
            <Perk icon={<RotateCcw />} onClick={() => setActivePerk("brands")}>
              Premium Brands
            </Perk>
            <Perk icon={<Sprout />} onClick={() => setActivePerk("stock")}>
              Fresh Stock
            </Perk>
            <Perk icon={<Check />} onClick={() => setActivePerk("returns")}>
              Easy Returns
            </Perk>
          </div>
        </motion.div>
        <DealerCard />
      </div>
      {createPortal(
        <AnimatePresence>
          {activePerk && (
            <PerkDialog
              perk={perkDetails[activePerk]}
              onClose={() => setActivePerk(null)}
            />
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

function DealerCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      animate={{
        y: [0, -9, 0],
        width: expanded ? 310 : 166,
        height: expanded ? 262 : 154,
      }}
      transition={{
        y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        width: { type: "spring", stiffness: 240, damping: 24 },
        height: { type: "spring", stiffness: 240, damping: 24 },
      }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      tabIndex={0}
      aria-label="1.6 million active dealers. Hover for more details."
      className="absolute bottom-7 right-4 z-10 cursor-default overflow-hidden rounded-[34px_23px_34px_23px] border border-white/60 bg-white/20 p-5 shadow-2xl shadow-stone-950/35 outline-none backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-white sm:bottom-12 sm:right-[17%] lg:bottom-14 lg:left-[62%] lg:right-auto max-md:hidden"
    >
      <motion.div
        animate={glassBorder}
        transition={glassTransition}
        className="pointer-events-none absolute inset-0 rounded-[34px_23px_34px_23px]"
      />
      <BrownBorderTrail radius="28px" />
      <div className="relative min-w-[270px]">
        <div className="flex">
          <Avatar src="/src/assets/hero/Client Image.png" />
          <Avatar src="/src/assets/hero/Client Image (1).png" />
          <Avatar src="/src/assets/hero/Client Image (2).png" />
        </div>
        <strong className="mt-2 block text-[25px] font-medium leading-none text-black">
          1.6M+
        </strong>
        <small className="mt-1 block text-sm text-black">
          Active Customers
        </small>
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
                A growing community
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Trusted partners bringing curated fashion closer to customers
                every day.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-black">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,.9)]" />
                Live network across the country
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
function Avatar({ src }) {
  return (
    <img
      className="-mr-2 h-9 w-9 rounded-full border-2 border-white object-cover md:h-10 md:w-10"
      src={src}
      alt="Active dealer"
    />
  );
}
function Perk({ icon, children, onClick }) {
  return (
    <a
      href="#perk-details"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
      className="flex items-center gap-2 transition duration-200 ease-in-out hover:-translate-y-2 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      {React.cloneElement(icon, { className: "h-4 w-4 text-brand" })}
      {children}
    </a>
  );
}
function PerkDialog({ perk, onClose }) {
  const Icon = perk.icon;
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
        initial={{ opacity: 0, y: 36, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="perk-dialog-title"
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf7]/75 p-6 shadow-2xl shadow-stone-950/45 backdrop-blur-2xl sm:p-9"
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
          ×
        </motion.button>
        <div className="relative">
          <motion.div
            initial={{ rotate: -18, scale: 0.7 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30"
          >
            <Icon className="h-7 w-7" />
          </motion.div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-brand">
            {perk.label}
          </p>
          <h2
            id="perk-dialog-title"
            className="mt-2 max-w-sm font-serif text-3xl leading-tight text-stone-900"
          >
            {perk.title}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-stone-600">
            {perk.description}
          </p>
          <motion.ul
            initial="hidden"
            animate="visible"
            className="mt-7 space-y-3"
          >
            {perk.points.map((point, index) => (
              <motion.li
                key={point}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.25 + index * 0.1 }}
                className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3 text-sm font-medium text-stone-700 shadow-sm"
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
