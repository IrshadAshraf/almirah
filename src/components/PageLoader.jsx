import React from "react";
import { motion } from "framer-motion";

const dots = [0, 1, 2];

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025 }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#171717] text-white"
      role="status"
      aria-label="Loading Almirah Collective"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full border border-white/[.08] sm:h-[620px] sm:w-[620px]"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e7a475] shadow-[0_0_24px_7px_rgba(231,164,117,.55)]" />
      </motion.div>

      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-brand blur-[90px]"
      />

      <div className="relative flex w-full max-w-xs flex-col items-center px-8">
        <motion.img
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          src="/assets/footer/almirah-logo-white.png"
          alt="Almirah Collective"
          className="w-44 object-contain sm:w-52"
        />

        <div className="mt-9 flex gap-2" aria-hidden="true">
          {dots.map((dot) => (
            <motion.span
              key={dot}
              animate={{ y: [0, -7, 0], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 0.9,
                delay: dot * 0.14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-[#e7a475]"
            />
          ))}
        </div>

        <div className="mt-6 h-px w-full overflow-hidden bg-white/10">
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
            className="block h-full w-1/2 bg-gradient-to-r from-transparent via-[#e7a475] to-transparent shadow-[0_0_12px_rgba(231,164,117,.8)]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 text-[10px] font-semibold uppercase tracking-[.32em] text-stone-300"
        >
          Curating your experience
        </motion.p>
      </div>
    </motion.div>
  );
}
