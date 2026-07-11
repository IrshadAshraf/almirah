import React, { useEffect, useState } from "react";
import { Star, Truck, Tag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const notices = [
  { icon: <Truck className="h-3.5 w-3.5" />, text: "Free shipping on orders over £40" },
  { icon: <Tag className="h-3.5 w-3.5" />, text: "New arrivals are added every week" },
  { icon: <Star className="h-3.5 w-3.5" fill="currentColor" />, text: "Loved by customers — 5-Star Rated" },
];

export default function NotificationBar() {
  const [visible, setVisible] = useState(true);
  const [notice, setNotice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setNotice((current) => (current + 1) % notices.length), 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("almirah-notice-visibility", { detail: { visible } }));
  }, [visible]);

  useEffect(() => {
    let previousScroll = window.scrollY;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 24) setVisible(true);
      else if (currentScroll > previousScroll) setVisible(false);
      else if (currentScroll < previousScroll) setVisible(true);
      previousScroll = currentScroll;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <AnimatePresence mode="wait">
    {visible && <motion.aside
      key="notification-bar"
      initial={{ y: -78, opacity: 0 }}
      animate={{ y: [0, -3, 0], opacity: 1 }}
      exit={{ y: -78, opacity: 0 }}
      transition={{ y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: .3 } }}
      className="fixed left-1/2 top-0 z-40 flex min-h-11 w-[calc(100vw-24px)] -translate-x-1/2 items-center justify-center rounded-b-3xl bg-brand px-5 py-3 text-[10px] font-medium tracking-wide text-white shadow-lg shadow-brand/25 sm:w-[calc(100vw-40px)] sm:px-8 sm:text-xs md:w-fit md:min-w-[510px]"
    >
      <AnimatePresence mode="wait">
        <motion.div key={notice} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }} className="flex items-center gap-2">
          {notices[notice].icon}<span>{notices[notice].text}</span><span className="hidden border-l border-white/60 pl-5 sm:inline">Est. 2010</span>
        </motion.div>
      </AnimatePresence>
    </motion.aside>}
  </AnimatePresence>;
}
