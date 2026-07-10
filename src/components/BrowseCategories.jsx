import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const categories = [
  {
    name: "Women's Collection",
    image: "About.png",
    shift: { x: -4, y: 3 },
    delay: 0,
    offset: "md:mt-6",
    rear: { x: -7, y: 7 },
  },
  {
    name: "Men's Collection",
    image: "image (6).png",
    shift: { x: 4, y: -3 },
    delay: 0.22,
    offset: "md:-mt-5",
    rear: { x: -3, y: 6 },
  },
  {
    name: "Ethnic Wear",
    image: "image (5).png",
    shift: { x: -3, y: 4 },
    delay: 0.44,
    offset: "md:mt-5",
    rear: { x: 0, y: 7 },
  },
  {
    name: "New Arrivals",
    image: "image (7).png",
    shift: { x: 4, y: 2 },
    delay: 0.66,
    offset: "md:-mt-5",
    rear: { x: 3, y: 6 },
  },
  {
    name: "SALE",
    image: "About (1).png",
    shift: { x: -4, y: -2 },
    delay: 0.88,
    offset: "md:mt-6",
    rear: { x: 7, y: 7 },
  },
];

const categoryDetails = {
  "Women's Collection": { title: "Made for your every mood", description: "Discover thoughtfully chosen pieces that make getting dressed feel effortless, expressive, and entirely your own.", points: ["Everyday elegance", "Comfort-led silhouettes", "Pieces with personality"] },
  "Men's Collection": { title: "Easy confidence, well dressed", description: "Explore refined essentials and standout styles selected to bring polish to every day and every occasion.", points: ["Modern wardrobe staples", "Relaxed, elevated fits", "Smart finishing details"] },
  "Ethnic Wear": { title: "Tradition with a fresh point of view", description: "Celebrate expressive colour, graceful detail, and heritage-inspired silhouettes for moments worth dressing up for.", points: ["Craft-inspired details", "Festive-ready styles", "Timeless elegance"] },
  "New Arrivals": { title: "The latest pieces, just in", description: "Step into a newly refreshed edit of versatile styles chosen for the season and ready for your wardrobe.", points: ["Freshly curated styles", "Seasonal highlights", "New favourites to discover"] },
  SALE: { title: "A little extra to love", description: "Find special prices on selected styles without compromising on the considered design you expect from Almirah.", points: ["Limited-time favourites", "Curated price drops", "Styles worth saving"] },
};

export default function BrowseCategories() {
  const [activeCategory, setActiveCategory] = useState(null);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setActiveCategory(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <section className="overflow-hidden px-4 py-14 text-center sm:px-6 md:px-[5vw] md:py-16">
      <motion.h2
        initial={{ opacity: 0, scale: 0.75, y: 34 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 150, damping: 16 }}
        className="text-[clamp(1.5rem,8vw,3rem)] font-bold tracking-tight text-gray-700"
      >
        Browse By Category
      </motion.h2>
      <div className="mx-auto mt-9 grid max-w-[1280px] grid-cols-1 items-start gap-x-4 gap-y-10 px-1 pt-3 sm:gap-x-7 sm:gap-y-12 md:grid-cols-3 lg:gap-x-10 xl:grid-cols-5">
        {categories.map((category, index) => (
          <CategoryCard key={category.name} category={category} index={index} onClick={() => setActiveCategory(category)} />
        ))}
      </div>
      {createPortal(<AnimatePresence>{activeCategory && <CategoryDialog category={activeCategory} onClose={() => setActiveCategory(null)} />}</AnimatePresence>, document.body)}
    </section>
  );
}

function CategoryCard({ category, index, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 55, rotate: index % 2 ? 5 : -5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 110,
        damping: 15,
      }}
      className={`group w-full ${category.offset}`}
    >
      <motion.button
        animate={{ y: [0, index % 2 ? -11 : -7, 0] }}
        transition={{
          duration: 4 + index * 0.25,
          delay: category.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ y: -7, scale: 1.035 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="relative mx-auto block aspect-[4/5] w-full max-w-[218px] focus:outline-none"
        aria-label={category.name}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[49%] border-[3px] border-black/90 bg-white"
          style={{
            transform: `translate(${category.rear.x}px, ${category.rear.y}px)`,
          }}
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            ease: "linear",
            delay: category.delay,
          }}
          className="absolute -inset-[2px] rounded-[49%] bg-[conic-gradient(from_20deg,transparent_0deg,transparent_110deg,rgba(151,81,36,.95)_165deg,rgba(255,255,255,1)_205deg,transparent_265deg)] opacity-45 blur-[2px] transition duration-500 group-hover:opacity-100 group-hover:blur-[3px]"
        />
        <motion.div
          animate={{
            x: [category.shift.x, -category.shift.x, category.shift.x],
            y: [category.shift.y, -category.shift.y, category.shift.y],
          }}
          transition={{
            duration: 4.5 + index * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-[49%]  bg-white p-[5px] shadow-[0_0_0_5px_white] transition duration-500 group-hover:border-brand group-hover:shadow-[0_0_0_5px_white,0_0_22px_rgba(151,81,36,.65)]"
        >
          <div className="h-full w-full overflow-hidden rounded-[49%] border border-black/30 bg-white p-[3px] transition duration-500 group-hover:border-brand/70">
            <img
              className="h-full w-full rounded-[49%] object-cover transition duration-700 group-hover:scale-110"
              src={`/src/assets/browse categories/${category.image}`}
              alt={category.name}
            />
          </div>
        </motion.div>
        <motion.span
          animate={{ opacity: [0, 0.85, 0], rotate: [0, 360] }}
          transition={{
            duration: 5,
            delay: category.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute -inset-2 rounded-[49%] border border-white/0 border-t-white/80"
        />
      </motion.button>
      <h3 className="mt-5 text-sm font-bold text-stone-800 sm:text-lg md:text-xl">
        {category.name}
      </h3>
    </motion.article>
  );
}

function CategoryDialog({ category, onClose }) {
  const detail = categoryDetails[category.name];
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-stone-950/55 p-5 backdrop-blur-md sm:p-8" onMouseDown={onClose} role="presentation">
    <motion.section initial={{ opacity: 0, y: 34, scale: .93 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .96 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="category-dialog-title" className="relative grid w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf7]/75 shadow-2xl shadow-stone-950/45 backdrop-blur-2xl md:grid-cols-[.82fr_1.18fr]">
      <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: .65, ease: "easeOut" }} className="relative min-h-56 overflow-hidden md:min-h-full"><img src={`/src/assets/browse categories/${category.image}`} alt={category.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" /><p className="absolute bottom-5 left-6 text-left text-xs font-bold uppercase tracking-[.2em] text-white">Almirah Collective</p></motion.div>
      <div className="relative p-7 text-left sm:p-9"><motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: .9 }} onClick={onClose} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white shadow-lg" aria-label="Close category details"><X className="h-5 w-5" /></motion.button><p className="pr-12 text-xs font-bold uppercase tracking-[.18em] text-brand">Explore the edit</p><h2 id="category-dialog-title" className="mt-3 font-serif text-3xl leading-tight text-stone-900">{category.name}</h2><h3 className="mt-3 text-lg font-semibold text-stone-700">{detail.title}</h3><p className="mt-3 leading-relaxed text-stone-600">{detail.description}</p><motion.ul initial="hidden" animate="visible" className="mt-6 space-y-3">{detail.points.map((point, index) => <motion.li key={point} variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }} transition={{ delay: .2 + index * .1 }} className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 text-sm font-medium text-stone-700 shadow-sm"><Check className="h-4 w-4 shrink-0 text-brand" />{point}</motion.li>)}</motion.ul><motion.button whileHover={{ x: 3 }} onClick={onClose} className="mt-7 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20">Continue exploring</motion.button></div>
    </motion.section>
  </motion.div>;
}
