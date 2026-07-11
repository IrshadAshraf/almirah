import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import PageLoader from "@/components/PageLoader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    let cancelled = false;
    let finishTimer;

    const waitForEvent = (target, successEvent) =>
      new Promise((resolve) => {
        const settle = () => {
          target.removeEventListener(successEvent, settle);
          target.removeEventListener("error", settle);
          resolve();
        };
        target.addEventListener(successEvent, settle, { once: true });
        target.addEventListener("error", settle, { once: true });
      });

    const waitForAssets = async () => {
      const windowReady =
        document.readyState === "complete"
          ? Promise.resolve()
          : waitForEvent(window, "load");

      const imageReady = [...document.images].map((image) => {
        if (!image.complete) return waitForEvent(image, "load");
        return image.decode?.().catch(() => {}) ?? Promise.resolve();
      });

      const videoReady = [...document.querySelectorAll("video")].map((video) =>
        video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA
          ? Promise.resolve()
          : waitForEvent(video, "canplaythrough"),
      );

      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      await Promise.all([windowReady, fontsReady, ...imageReady, ...videoReady]);
      if (cancelled) return;

      const remaining = Math.max(0, 1000 - (performance.now() - startedAt));
      finishTimer = setTimeout(() => setLoading(false), remaining);
    };

    waitForAssets();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelled = true;
      clearTimeout(finishTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!loading) document.body.style.overflow = "";
  }, [loading]);

  return (
    <div className="relative min-h-screen text-base">
      <AnimatePresence>{loading && <PageLoader />}</AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
