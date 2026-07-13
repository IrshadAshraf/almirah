import React from "react";
import { motion } from "framer-motion";

export default function AnimatedSeparatorTrail({
  light = false,
  className = "",
}) {
  const color = light ? "#fff4ed" : "#975124";
  const glow = light ? "255,244,237" : "151,81,36";
  const duration = 3;

  return (
    <div aria-hidden="true" className={`relative h-3 ${className}`}>
      <span
        className={`absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 ${light ? "bg-gradient-to-r from-transparent via-white/25 to-transparent" : "bg-gradient-to-r from-transparent via-stone-300 to-transparent"}`}
      />
      {Array.from({ length: 18 }, (_, index) => (
        <motion.span
          key={index}
          animate={{ left: ["0%", "100%"] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "circInOut",
            delay: index === 0 ? 0 : -(duration - index * 0.018),
          }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${4 - (index / 17) * 3}px`,
            height: `${4 - (index / 17) * 3}px`,
            opacity: 0.62 * (1 - index / 18),
            backgroundColor: color,
            boxShadow: `0 0 ${5 - (index / 17) * 3}px ${1 - (index / 17) * 0.8}px rgba(${glow},.48)`,
          }}
        />
      ))}
      <motion.span
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration, repeat: Infinity, ease: "circInOut" }}
        className="absolute top-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 7px 2px rgba(${glow},.9), 0 0 17px 5px rgba(${glow},.42)`,
        }}
      />
    </div>
  );
}
