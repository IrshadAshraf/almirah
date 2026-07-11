import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import AnimatedPillLabel from "./AnimatedPillLabel";
import { addToCart, Float, removeFromCart, Reveal, toggleLike } from "./ui";
const images = [
  { file: "image 3719.png", alt: "Floral occasion wear", rows: "row-span-9" },
  {
    file: "image 3720.png",
    alt: "Waterfront casual style",
    rows: "row-span-11",
  },
  { file: "image 3721.png", alt: "Classic tailored suit", rows: "row-span-8" },
  { file: "image 3722.png", alt: "Relaxed café style", rows: "row-span-8" },
  {
    file: "image 3723.png",
    alt: "Burgundy traditional wear",
    rows: "row-span-8",
  },
  { file: "image 3724.png", alt: "Checked casual shirt", rows: "row-span-10" },
];
const galleryProducts = [
  {
    name: "Blush Floral Ensemble",
    category: "Occasion Wear",
    price: "₹4,890",
    image: "image 3719.png",
  },
  {
    name: "Coastal Layered Look",
    category: "Contemporary Men",
    price: "₹3,290",
    image: "image 3720.png",
  },
  {
    name: "Midnight Tailored Suit",
    category: "Formal Edit",
    price: "₹7,490",
    image: "image 3721.png",
  },
  {
    name: "Sandstone Polo Set",
    category: "Relaxed Essentials",
    price: "₹2,690",
    image: "image 3722.png",
  },
  {
    name: "Burgundy Festive Set",
    category: "Ethnic Wear",
    price: "₹5,290",
    image: "image 3723.png",
  },
  {
    name: "Sage Checked Shirt",
    category: "Everyday Men",
    price: "₹2,390",
    image: "image 3724.png",
  },
];
export default function Gallary() {
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setDialog(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <section className="px-6 py-24 text-center md:px-[5vw]">
        <Reveal effect="blur">
          <AnimatedPillLabel>OUR GALLERY</AnimatedPillLabel>
          <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-6xl">
            Creativity in Every Detail
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-slate-500">
            Explore a collection of our finest products, thoughtfully crafted
            with quality materials, innovative designs, and exceptional
            attention to detail.
          </p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-[1640px] auto-rows-[12px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map(({ file, alt, rows }, i) => (
            <Float
              key={file}
              delay={i * 0.15}
              className={`${rows} h-full min-h-0`}
            >
              <GalleryTile file={file} alt={alt} index={i} />
            </Float>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <MagneticGalleryButton onClick={() => setDialog("explore")} primary>
            Explore Collection
          </MagneticGalleryButton>
          <MagneticGalleryButton onClick={() => setDialog("all")}>
            View All Products
          </MagneticGalleryButton>
        </div>
      </section>
      {createPortal(
        <AnimatePresence>
          {dialog && (
            <GalleryDialog type={dialog} onClose={() => setDialog(null)} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function MagneticGalleryButton({ children, onClick, primary = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.45 });

  const followCursor = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={followCursor}
      onMouseLeave={reset}
      onClick={onClick}
      className={`rounded-full px-7 py-3 text-sm font-bold transition-[background-color,color,box-shadow] duration-300 hover:shadow-xl ${
        primary
          ? "bg-brand text-white hover:shadow-brand/25"
          : "border border-slate-300 bg-white text-stone-900 hover:border-brand hover:text-brand"
      }`}
    >
      {children}
    </motion.button>
  );
}

function GalleryTile({ file, alt, index }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 170, damping: 20 });
  const rotateX = useSpring(rawY, { stiffness: 170, damping: 20 });

  const followCursor = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawX.set(x * 11);
    rawY.set(y * -11);
  };

  const resetTilt = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div className="h-full w-full" style={{ perspective: 900 }}>
      <motion.div
        onMouseMove={followCursor}
        onMouseLeave={resetTilt}
        whileHover={{ scale: 1.018 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_0_15px_#97512433]"
      >
        <img
          className="h-full w-full object-cover object-top"
          src={`/assets/gallary/${file}`}
          alt={alt}
        />
        <GalleryImageOverlay index={index} />
      </motion.div>
    </div>
  );
}

function GalleryImageOverlay({ index }) {
  const base = "pointer-events-none absolute z-10";

  if (index === 0) {
    return (
      <motion.span
        animate={{ x: ["-140%", "240%"] }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: "easeInOut",
        }}
        className={`${base} -inset-y-8 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm`}
      />
    );
  }

  if (index === 1) {
    return (
      <motion.span
        animate={{
          scale: [0.7, 1.35, 0.7],
          opacity: [0.14, 0.5, 0.14],
          x: [-20, 35, -20],
          y: [20, -30, 20],
        }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        className={`${base} left-[20%] top-[25%] h-44 w-44 rounded-full bg-white blur-3xl`}
      />
    );
  }

  if (index === 2) {
    return (
      <motion.span
        animate={{ y: ["-20%", "520%"] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "easeInOut",
        }}
        className={`${base} left-0 top-0 h-14 w-full bg-gradient-to-b from-transparent via-[#f5d4bf]/65 to-transparent blur-sm`}
      />
    );
  }

  if (index === 3) {
    return (
      <motion.span
        animate={{ rotate: [0, 360], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className={`${base} -inset-1/2 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,.58),transparent_32%,rgba(151,81,36,.38),transparent_68%)] blur-md`}
      />
    );
  }

  if (index === 4) {
    return (
      <motion.span
        animate={{ opacity: [0.1, 0.5, 0.1], scaleY: [0.75, 1.2, 0.75] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        className={`${base} inset-x-0 bottom-0 h-2/3 origin-bottom bg-gradient-to-t from-[#975124]/55 via-white/30 to-transparent blur-sm`}
      />
    );
  }

  return (
    <span className={`${base} inset-0 overflow-hidden`}>
      <motion.i
        animate={{ x: ["-120%", "220%"] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/4 rotate-12 bg-gradient-to-r from-transparent via-white/55 to-transparent blur-sm"
      />
      <motion.i
        animate={{ y: ["140%", "-140%"] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 h-1/4 -rotate-6 bg-gradient-to-b from-transparent via-[#f0b994]/50 to-transparent blur-sm"
      />
    </span>
  );
}

const savedNames = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]").map(
      (item) => item.name,
    );
  } catch {
    return [];
  }
};

function GalleryDialog({ type, onClose }) {
  const [cart, setCart] = useState(() => savedNames("almirah-cart"));
  const [likes, setLikes] = useState(() => savedNames("almirah-likes"));
  const products =
    type === "explore" ? galleryProducts.slice(0, 3) : galleryProducts;
  const isExplore = type === "explore";

  useEffect(() => {
    const syncCart = () => setCart(savedNames("almirah-cart"));
    const syncLikes = () => setLikes(savedNames("almirah-likes"));
    addEventListener("almirah-cart-change", syncCart);
    addEventListener("almirah-likes-change", syncLikes);
    return () => {
      removeEventListener("almirah-cart-change", syncCart);
      removeEventListener("almirah-likes-change", syncLikes);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-stone-950/60 p-4 backdrop-blur-md sm:p-8"
      role="presentation"
    >
      <motion.section
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-dialog-title"
        className="relative my-auto w-full max-w-5xl rounded-[2rem] border border-white/60 bg-[#fffaf7]/90 p-6 text-left shadow-2xl backdrop-blur-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-0 z-20 float-right grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white shadow-lg transition hover:rotate-90"
          aria-label="Close gallery products"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-14">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            {isExplore
              ? "A curated starting point"
              : "The complete gallery edit"}
          </p>
          <h2
            id="gallery-dialog-title"
            className="mt-2 text-3xl font-bold sm:text-4xl"
          >
            {isExplore
              ? "Explore our signature collection"
              : "Shop every gallery look"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            {isExplore
              ? "Three distinctive looks selected to introduce the mood, craftsmanship, and versatility of Almirah."
              : "Browse all six looks from the gallery and save your favourites or add pieces directly to your bag."}
          </p>
        </div>

        <div
          className={`mt-7 grid gap-5 ${isExplore ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}
        >
          {products.map((product, index) => {
            const liked = likes.includes(product.name);
            const added = cart.includes(product.name);
            const item = { ...product, type: product.category };
            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`/assets/gallary/${product.image}`}
                    alt={product.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => toggleLike(item)}
                    className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110 ${liked ? "text-red-500" : "text-stone-500"}`}
                    aria-label={
                      liked ? "Remove from favourites" : "Add to favourites"
                    }
                  >
                    <Heart
                      className="h-4 w-4"
                      fill={liked ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {product.category}
                  </p>
                  <div className="mt-1 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-stone-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-stone-600">
                        {product.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        added ? removeFromCart(product.name) : addToCart(item)
                      }
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-md transition hover:scale-110 ${added ? "bg-red-500" : "bg-brand"}`}
                      aria-label={added ? "Remove from cart" : "Add to cart"}
                    >
                      {added ? (
                        <Trash2 className="h-4 w-4" />
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p
                    className={`mt-3 text-xs font-bold ${added ? "text-emerald-600" : "text-stone-400"}`}
                  >
                    {added ? "Added to your bag" : "Ready to add"}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-5">
          <p className="text-sm text-stone-500">
            {cart.length} {cart.length === 1 ? "item" : "items"} currently in
            your bag
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            Continue browsing
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}
