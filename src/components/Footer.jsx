import React, { useState } from "react";
import { Check, Globe, Send } from "lucide-react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSeparatorTrail from "./AnimatedSeparatorTrail";

const groups = [
  [
    "Quick Link",
    [
      "All Products",
      "Women’s Collection",
      "Men’s Collection",
      "T-shirts",
      "Events Calendar",
      "News",
    ],
  ],
  [
    "About",
    [
      "Our Story",
      "Shop Collection",
      "New Season",
      "Best Sellers",
      "Style Journal",
      "Ethnic Wear",
    ],
  ],
  [
    "Support Links",
    [
      "FAQ",
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Contact Us",
      "Size Guide",
      "Track Your Order",
    ],
  ],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [sent, setSent] = useState(false);

  const subscribe = (event) => {
    event.preventDefault();
    if (!accepted) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden rounded-t-[54px] bg-[#171717] px-6 py-14 text-white md:px-[5vw] xl:h-150 xl:max-h-150 xl:py-10">
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          scale: [1.03, 1.08, 1.03],
          x: [-18, 18, -18],
          y: [-8, 10, -8],
          rotate: [-0.4, 0.4, -0.4],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-12 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/assets/footer/Animate this image.jpg')",
        }}
      />
      <motion.div
        animate={{
          backgroundPosition: ["100% 45%", "0% 55%", "100% 45%"],
          scale: [1.13, 1.04, 1.13],
          x: [20, -24, 20],
          y: [12, -10, 12],
        }}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-16 bg-cover bg-center opacity-[.12] mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/footer/Animate this image.jpg')",
        }}
      />
      <motion.div
        animate={{ x: ["-35%", "145%"] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-y-0 w-1/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/[.08] to-transparent blur-2xl"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 via-[#171717]/35 to-black/25" />

      <div className="relative mx-auto flex h-full max-w-[1640px] flex-col">
        <div className="grid gap-10 lg:grid-cols-[.8fr_.72fr_1.25fr] lg:items-start lg:gap-14 xl:gap-10">
          <div>
            <img
              className="h-auto w-36 object-contain xl:w-28"
              src="/assets/footer/almirah-logo-white.png"
              alt="Almirah Collective"
            />
            <p className="mt-5 max-w-[280px] text-sm leading-[1.55] text-stone-200 xl:mt-3 xl:text-[13px] xl:leading-[1.4]">
              Advancing Economic Growth,
              <br />
              Financial Stability, and Institutional
              <br />
              Excellence Through Knowledge,
              <br />
              Innovation, and Collaboration.
            </p>
          </div>

          <h2 className="text-2xl font-bold leading-tight lg:pt-4 lg:text-3xl">
            Register For Our
            <br />
            Updates!
          </h2>

          <div className="min-w-0">
            <form className="w-full min-w-0" onSubmit={subscribe}>
              <div className="flex w-full min-w-0 overflow-hidden rounded-xl bg-[#f4f3f3] shadow-xl shadow-black/15 xl:h-12">
                <input
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 text-stone-900 outline-none placeholder:text-stone-500 sm:px-6"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSent(false);
                  }}
                  type="email"
                  required
                  placeholder="Enter your email address"
                  aria-label="Email address"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="grid w-16 shrink-0 place-items-center rounded-xl bg-brand text-white transition-colors hover:bg-[#7b3d18] sm:w-20"
                  aria-label="Subscribe"
                >
                  <Send className="h-5 w-5" fill="currentColor" />
                </motion.button>
              </div>
              <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-stone-200">
                <input
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="h-4 w-4 rounded accent-brand"
                  required
                  type="checkbox"
                />
                I acknowledge all the Terms &amp; Conditions
              </label>
            </form>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="mt-3 flex items-center gap-2 text-sm text-emerald-300"
                >
                  <Check className="h-4 w-4" /> Thank you — you’re on the list.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatedSeparatorTrail light className="my-10 lg:ml-[31%] xl:my-6" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[.8fr_.72fr_.72fr_.78fr] lg:gap-14 xl:gap-10">
          <div>
            <h3 className="text-xl font-bold">Stay Tuned</h3>
            <div className="mt-6 flex gap-3 xl:mt-4">
              <Social href="https://x.com" label="X">
                <FaXTwitter />
              </Social>
              <Social href="https://youtube.com" label="YouTube">
                <FaYoutube />
              </Social>
              <Social href="https://instagram.com" label="Instagram">
                <FaInstagram />
              </Social>
              <Social href="https://www.almirah.com" label="Website">
                <Globe />
              </Social>
            </div>
          </div>

          {groups.map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xl font-bold">{title}</h3>
              <div className="mt-5 grid gap-3 xl:mt-3 xl:gap-2">
                {links.map((link) => (
                  <a
                    className="w-fit text-sm text-stone-200 transition duration-300 hover:translate-x-1 hover:text-[#e7a475]"
                    href="#hero"
                    key={link}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 text-center text-sm text-stone-200 md:flex-row xl:mt-auto xl:gap-4 xl:text-xs">
          <span>© 2026 Almirah. All rights reserved.</span>
          <a
            href="https://www.codes-inc.com/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:scale-105"
          >
            <img
              src="/assets/footer/image 13.png"
              alt="Designed and hosted by Codesinc"
              className="h-auto w-52 xl:w-44"
            />
          </a>
          <span className="flex items-center gap-5">
            <a href="#privacy" className="transition hover:text-white">
              Privacy Policy
            </a>
            <i className="h-5 w-px bg-white/25" />
            <a href="#terms" className="transition hover:text-white">
              Terms &amp; Condition
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }) {
  return (
    <motion.a
      whileHover={{
        y: -5,
        scale: 1.08,
        rotate: -4,
        boxShadow:
          "0 0 10px 3px rgba(231,164,117,.65), 0 0 24px 8px rgba(151,81,36,.5)",
      }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative grid h-11 w-11 place-items-center overflow-visible rounded-full border border-white/25 bg-gradient-to-br from-[#2b211c] to-[#87512e] text-white shadow-md"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <span className="pointer-events-none absolute inset-1 rounded-full bg-[#e7a475] opacity-0 blur-md transition-opacity duration-300 group-hover:animate-pulse group-hover:opacity-55" />
      <span className="relative z-10 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,.95)]">
        {children}
      </span>
    </motion.a>
  );
}
