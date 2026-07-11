import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Heart, Trash2, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { addToCart, removeFromCart, Reveal, toggleLike } from "./ui";

export const products = [
  ["Dark Pink Cotton", "Mind & Bloom", "Rectangle 1000002158 (7).png"],
  ["Black Women Dress", "Mind & Bloom", "Rectangle 1000002158 (5).png"],
  ["Party Wear", "Mind & Bloom", "Rectangle 1000002158 (1).png"],
  ["Linen Blend Shirt", "Mind & Bloom", "Rectangle 1000002158 (6).png"],
];
export const collectionProducts = [
  ...products,
  ["Urban Classic Shirt", "Mind & Bloom", "Rectangle 1000002158.png"],
  ["Checked Casual Shirt", "Mind & Bloom", "Rectangle 1000002158 (2).png"],
  ["Floral Evening Dress", "Mind & Bloom", "Rectangle 1000002158 (3).png"],
  ["Tailored Beige Set", "Mind & Bloom", "Rectangle 1000002158 (4).png"],
];
const getSaved = (key, name) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]").some(
      (item) => item.name === name,
    );
  } catch {
    return false;
  }
};

export default function ProductCards({ items = products }) {
  return (
    <div className="mx-auto grid max-w-[1640px] gap-7 text-left sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <Product key={item[0]} item={item} delay={index * 0.09} />
      ))}
    </div>
  );
}

function Product({ item: [name, type, image], delay }) {
  const item = { name, type, image };
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  useEffect(() => {
    const syncSavedState = () => {
      setAdded(getSaved("almirah-cart", name));
      setLiked(getSaved("almirah-likes", name));
    };
    syncSavedState();
    addEventListener("almirah-cart-change", syncSavedState);
    addEventListener("almirah-likes-change", syncSavedState);
    return () => {
      removeEventListener("almirah-cart-change", syncSavedState);
      removeEventListener("almirah-likes-change", syncSavedState);
    };
  }, [name]);
  const toggleCart = () => (added ? removeFromCart(name) : addToCart(item));
  const toggleFavourite = () => setLiked(toggleLike(item));
  const stop = (event, action) => {
    event.stopPropagation();
    action();
  };
  const floatingImage = { scale: [1, 1.045, 1], x: [0, 3, 0], y: [0, -5, 0] };

  return (
    <Reveal delay={delay} effect="blur">
      <motion.article
        onClick={() => setDetailsOpen(true)}
        onKeyDown={(event) => event.key === "Enter" && setDetailsOpen(true)}
        role="button"
        tabIndex={0}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: [0, -5, 0] }}
        transition={{
          y: {
            duration: 4.2,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          boxShadow: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        whileHover={{
          scale: 1.025,
          boxShadow: "0 24px 38px rgba(41, 25, 14, .2)",
        }}
        className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md shadow-stone-900/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <div className="relative h-72 overflow-hidden">
          <motion.div
            animate={{ scale: hovered ? 1.075 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <motion.img
              animate={floatingImage}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full object-cover"
              src={`/src/assets/collections/${image}`}
              alt={name}
            />
          </motion.div>
          <motion.div
            animate={{ opacity: hovered ? 0.35 : 0.1 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.82 }}
          onClick={(event) => stop(event, toggleFavourite)}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/85 p-2 text-red-500 shadow-lg backdrop-blur transition hover:scale-110"
          aria-label={
            liked
              ? `Remove ${name} from favourites`
              : `Add ${name} to favourites`
          }
        >
          <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
        </motion.button>
        <div className="relative flex min-h-28 items-center justify-between gap-3 py-4 pl-28 pr-5">
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 240, damping: 18, delay }}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(event) => stop(event, toggleCart)}
            className={`absolute -top-8 left-5 grid h-16 w-16 place-items-center rounded-full border-[6px] border-white text-white shadow-xl transition-colors ${added ? "bg-red-500" : "bg-brand"}`}
            aria-label={
              added ? `Remove ${name} from cart` : `Add ${name} to cart`
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="remove"
                  initial={{ opacity: 0, rotate: -60 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 60 }}
                >
                  <Trash2 className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="cart"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                >
                  <FaShoppingCart className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <div className="min-w-0">
            <h3 className="font-serif text-lg text-stone-900">{name}</h3>
            <p className="mt-1 text-xs text-slate-500">{type}</p>
            <AnimatePresence>
              {added && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="mt-1 text-xs font-bold text-emerald-600"
                >
                  In your bag
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ y: -3, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 420, damping: 13 }}
            whileTap={{ scale: 0.85 }}
            onClick={(event) => stop(event, toggleCart)}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${added ? "bg-red-50 text-red-500" : "text-brand hover:bg-brand hover:text-white"}`}
            aria-label={
              added ? `Remove ${name} from cart` : `Add ${name} to cart`
            }
          >
            {added ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <FaShoppingCart className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </motion.article>
      {createPortal(
        <AnimatePresence>
          {detailsOpen && (
            <ProductDialog item={item} onClose={() => setDetailsOpen(false)} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </Reveal>
  );
}

function ProductDialog({ item, onClose }) {
  const [inCart, setInCart] = useState(() =>
    getSaved("almirah-cart", item.name),
  );
  const [liked, setLiked] = useState(() =>
    getSaved("almirah-likes", item.name),
  );
  useEffect(() => {
    const sync = () => {
      setInCart(getSaved("almirah-cart", item.name));
      setLiked(getSaved("almirah-likes", item.name));
    };
    addEventListener("almirah-cart-change", sync);
    addEventListener("almirah-likes-change", sync);
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    addEventListener("keydown", closeOnEscape);
    return () => {
      removeEventListener("almirah-cart-change", sync);
      removeEventListener("almirah-likes-change", sync);
      removeEventListener("keydown", closeOnEscape);
    };
  }, [item.name, onClose]);
  const toggleCart = () =>
    inCart ? removeFromCart(item.name) : addToCart(item);
  const toggleFavourite = () => setLiked(toggleLike(item));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-stone-950/55 p-5 backdrop-blur-md sm:p-8"
      onMouseDown={onClose}
      role="presentation"
    >
      <motion.section
        initial={{ opacity: 0, y: 34, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 22, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
        className="grid w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf7]/75 shadow-2xl shadow-stone-950/45 backdrop-blur-2xl md:grid-cols-2"
      >
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="h-72 w-full object-cover md:h-full"
          src={`/src/assets/collections/${item.image}`}
          alt={item.name}
        />
        <div className="relative p-7 sm:p-9">
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white shadow-lg"
            aria-label="Close product details"
          >
            <X className="h-5 w-5" />
          </motion.button>
          <p className="pr-12 text-xs font-bold uppercase tracking-[.18em] text-brand">
            {item.type}
          </p>
          <h2
            id="product-dialog-title"
            className="mt-3 font-serif text-3xl text-stone-900"
          >
            {item.name}
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            A considered addition to your wardrobe, selected for its versatile
            style, comfortable feel, and easy elegance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={toggleCart}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition ${inCart ? "bg-red-500" : "bg-brand"}`}
            >
              {inCart ? (
                <>
                  <Trash2 className="h-4 w-4" />
                  Remove from cart
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  Add to cart
                </>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleFavourite}
              className={`grid h-11 w-11 place-items-center rounded-xl border transition ${liked ? "border-red-200 bg-red-50 text-red-500" : "border-stone-200 bg-white text-stone-500"}`}
              aria-label={
                liked ? "Remove from favourites" : "Add to favourites"
              }
            >
              <Heart
                className="h-5 w-5"
                fill={liked ? "currentColor" : "none"}
              />
            </motion.button>
          </div>
          <AnimatePresence>
            {inCart && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600"
              >
                <Check className="h-4 w-4" />
                Added to your bag
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </motion.div>
  );
}
