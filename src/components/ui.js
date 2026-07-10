import React from "react";
import { motion } from "framer-motion";

export const rise = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .65, ease: "easeOut" } } };
const reveals = {
  rise,
  left: { hidden: { opacity: 0, x: -46 }, visible: { opacity: 1, x: 0, transition: { duration: .7, ease: "easeOut" } } },
  right: { hidden: { opacity: 0, x: 46 }, visible: { opacity: 1, x: 0, transition: { duration: .7, ease: "easeOut" } } },
  scale: { hidden: { opacity: 0, scale: .86 }, visible: { opacity: 1, scale: 1, transition: { duration: .65, ease: "backOut" } } },
  rotate: { hidden: { opacity: 0, y: 34, rotate: -5 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: .75, ease: "easeOut" } } },
  blur: { hidden: { opacity: 0, filter: "blur(12px)", scale: 1.04 }, visible: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: .7, ease: "easeOut" } } },
};
export const Reveal = ({ children, className = "", delay = 0, effect = "rise" }) => React.createElement(motion.div, { className, variants: reveals[effect] || rise, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: .18 }, transition: { delay } }, children);
export const Label = ({ children }) => React.createElement("span", { className: "inline-flex rounded-full bg-[#f1e3da] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-brand" }, children);
export const Float = ({ children, className = "", delay = 0 }) => React.createElement(motion.div, { className, animate: { y: [0, -9, 0] }, transition: { duration: 4.2, delay, repeat: Infinity, ease: "easeInOut" } }, children);
export function addToCart(item) {
  const current = JSON.parse(localStorage.getItem("almirah-cart") || "[]");
  const found = current.find((product) => product.name === item.name);
  const next = found ? current.map((product) => product.name === item.name ? { ...product, qty: product.qty + 1 } : product) : [...current, { ...item, qty: 1 }];
  localStorage.setItem("almirah-cart", JSON.stringify(next));
  window.dispatchEvent(new Event("almirah-cart-change"));
}
export function removeFromCart(name) {
  const current = JSON.parse(localStorage.getItem("almirah-cart") || "[]");
  localStorage.setItem("almirah-cart", JSON.stringify(current.filter((product) => product.name !== name)));
  window.dispatchEvent(new Event("almirah-cart-change"));
}
export function toggleLike(item) {
  const current = JSON.parse(localStorage.getItem("almirah-likes") || "[]");
  const exists = current.some((product) => product.name === item.name);
  const next = exists ? current.filter((product) => product.name !== item.name) : [...current, item];
  localStorage.setItem("almirah-likes", JSON.stringify(next));
  window.dispatchEvent(new Event("almirah-likes-change"));
  return !exists;
}
