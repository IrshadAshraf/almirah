import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import PageLoader from "@/components/PageLoader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    let finishTimer;
    const fallbackTimer = setTimeout(() => setLoading(false), 4000);

    const finishLoading = () => {
      const remaining = Math.max(0, 1000 - (performance.now() - startedAt));
      finishTimer = setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === "complete") finishLoading();
    else window.addEventListener("load", finishLoading, { once: true });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", finishLoading);
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
