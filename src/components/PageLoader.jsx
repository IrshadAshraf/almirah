import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const dots = [0, 1, 2];
const LOADER_DURATION_MS = 3000;

export default function PageLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, LOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && <PageLoaderContent key="page-loader" />}
    </AnimatePresence>
  );
}

function PageLoaderContent() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] grid h-[100dvh] w-screen place-items-center overflow-hidden bg-[#171717] text-white"
      role="status"
      aria-label="Loading Almirah Collective"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
        className="pointer-events-none absolute aspect-square w-[clamp(220px,58vw,620px)] rounded-full border border-white/[.08]"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e7a475] shadow-[0_0_24px_7px_rgba(231,164,117,.55)]" />
      </motion.div>

      <motion.div
        animate={{ scale: [0.92, 1.12, 0.92], opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
        className="pointer-events-none absolute aspect-square w-[clamp(160px,40vw,256px)] rounded-full bg-brand blur-[90px]"
      />

      <div className="relative flex w-full max-w-xs flex-col items-center px-8">
        <motion.img
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src="/assets/footer/almirah-logo-white.png"
          alt="Almirah Collective"
          className="w-44 object-contain sm:w-52"
        />

        <div className="mt-9 flex gap-2" aria-hidden="true">
          {dots.map((dot) => (
            <motion.span
              key={dot}
              animate={{ y: [0, -6, 0], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 1.1,
                delay: dot * 0.16,
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
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
            className="block h-full w-1/2 bg-gradient-to-r from-transparent via-[#e7a475] to-transparent shadow-[0_0_12px_rgba(231,164,117,.8)]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="mt-5 text-[10px] font-semibold uppercase tracking-[.32em] text-stone-300"
        >
          Curating your experience
        </motion.p>
      </div>
    </motion.div>
  );
}
