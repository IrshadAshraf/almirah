import React from "react";
import { motion } from "framer-motion";

export default function AnimatedPillLabel({ children }) {
  return (
    <motion.span
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      className="relative inline-flex items-center rounded-full border border-white/70 bg-brand/20 px-4 py-2 text-base font-bold tracking-widest text-brand backdrop-blur-sm"
    >
      <BrownBorderTrail />● &nbsp; {children}
    </motion.span>
  );
}

function BrownBorderTrail() {
  const duration = 3;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full"
    >
      {Array.from({ length: 18 }, (_, index) => (
        <motion.span
          key={index}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "circInOut",
            delay: index === 0 ? 0 : -(duration - index * 0.018),
          }}
          className="absolute left-0 top-0 rounded-full bg-[#975124]"
          style={{
            offsetPath: "inset(1px round 999px)",
            offsetRotate: "0deg",
            width: `${4 - (index / 17) * 3}px`,
            height: `${4 - (index / 17) * 3}px`,
            opacity: 0.62 * (1 - index / 18),
            boxShadow: `0 0 ${5 - (index / 17) * 3}px ${1 - (index / 17) * 0.8}px rgba(151,81,36,.48)`,
          }}
        />
      ))}
      <motion.span
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration, repeat: Infinity, ease: "circInOut" }}
        className="absolute left-0 top-0 z-10 h-1.5 w-1.5 rounded-full bg-[#975124]"
        style={{
          offsetPath: "inset(1px round 999px)",
          offsetRotate: "0deg",
          boxShadow:
            "0 0 7px 2px rgba(151,81,36,.9), 0 0 17px 5px rgba(151,81,36,.42)",
        }}
      />
    </span>
  );
}
