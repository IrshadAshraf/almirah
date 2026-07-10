import React from "react";
import { ArrowUpRight, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";

const glassBorder = { boxShadow: ["inset 0 0 0 1px rgb(255 255 255 / .38), 0 0 7px rgb(255 255 255 / .2)", "inset 0 0 0 1px rgb(255 255 255 / .9), 0 0 22px rgb(255 255 255 / .55)", "inset 0 0 0 1px rgb(255 255 255 / .38), 0 0 7px rgb(255 255 255 / .2)"] };

export default function GiftGiving() {
  return <section className="relative grid min-h-[282px] place-items-center overflow-hidden bg-brand px-6 py-10 text-center text-white md:min-h-[318px] md:py-12">
    <motion.div animate={{ x: [-45, 45, -45], y: [-22, 22, -22], scale: [1.06, 1.16, 1.06], rotate: [-2, 2, -2] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="absolute -inset-16 bg-cover bg-center opacity-45" style={{ backgroundImage: "url('/src/assets/gift giving/transparent bg for the background animation.png')" }} />
    <motion.div animate={{ x: ["-20%", "120%"] }} transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }} className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,.28),transparent_42%),linear-gradient(110deg,rgba(65,25,6,.28),transparent_48%,rgba(255,255,255,.1))]" />
    <motion.div initial={{ opacity: 0, scale: .8, y: 46, clipPath: "inset(0 50% 0 50%)" }} whileInView={{ opacity: 1, scale: 1, y: 0, clipPath: "inset(0 0% 0 0%)" }} viewport={{ once: true, amount: .25 }} transition={{ duration: .95, ease: [0.16, 1, 0.3, 1] }} className="relative max-w-4xl">
      <motion.span animate={glassBorder} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/15 px-5 py-2 text-xs font-bold tracking-[.18em] backdrop-blur-md"><Gift className="h-4 w-4" />GIFT GIVING MADE EASY</motion.span>
      <div className="relative mt-8"><motion.div animate={{ x: ["-30%", "110%"] }} transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.7, ease: "easeInOut" }} className="pointer-events-none absolute top-[35%] h-16 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-xl" /><motion.h2 initial={{ letterSpacing: ".12em", opacity: 0 }} whileInView={{ letterSpacing: "-.025em", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: .18, ease: "easeOut" }} className="relative text-4xl font-bold leading-[1.04] md:text-6xl lg:text-7xl">Fresh styles added weekly.<br /><span className="text-[#ffe6d5]">Limited quantities available.</span></motion.h2></div>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .45, duration: .55 }} className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">Celebrate every occasion with a thoughtful style selection, wrapped in a little extra joy.</motion.p>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .6, type: "spring", stiffness: 190, damping: 17 }} className="mt-8"><HashLink smooth to="#collections" className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/5 px-7 py-3 text-sm font-bold backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-brand hover:shadow-xl hover:shadow-stone-950/25">Shop Dress Sets <ArrowUpRight className="h-4 w-4" /></HashLink></motion.div>
    </motion.div>
  </section>;
}
