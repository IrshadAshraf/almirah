import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  X,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { removeFromCart } from "./ui";

const primaryLinks = [
  ["About", "#about-us"],
  ["Collections", "#collections"],
  ["Our Process", "#how-it-works"],
  ["Gallery", "#gallary"],
];
const discoverLinks = [
  ["Browse Categories", "#browse-categories"],
  ["Gift Giving", "#gift-giving"],
  ["Why Women Love Us", "#women-affection"],
  ["Excellence", "#excellence"],
  ["Best Sellers", "#hot-sellings"],
  ["Style Stories", "#style-transformation"],
  ["FAQ", "#faqs"],
];
const iconButton =
  "relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-10 sm:w-10";

const getStoredItems = (key) => {
  try {
    const items = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
};

export default function Navbar() {
  const headerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [activeDialog, setActiveDialog] = useState(null);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  useEffect(() => {
    const update = () => {
      setCartItems(getStoredItems("almirah-cart"));
      setLikedItems(getStoredItems("almirah-likes"));
    };
    update();
    addEventListener("almirah-cart-change", update);
    addEventListener("almirah-likes-change", update);
    return () => {
      removeEventListener("almirah-cart-change", update);
      removeEventListener("almirah-likes-change", update);
    };
  }, []);

  useEffect(() => {
    const update = (event) => setNoticeVisible(event.detail.visible);
    addEventListener("almirah-notice-visibility", update);
    return () => removeEventListener("almirah-notice-visibility", update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) =>
      event.key === "Escape" && setActiveDialog(null);
    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    let frame;

    const updateTheme = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const header = headerRef.current;
        if (!header) return;

        const bounds = header.getBoundingClientRect();
        const sampleX = window.innerWidth / 2;
        const sampleY = Math.min(
          window.innerHeight - 1,
          Math.max(0, bounds.top + bounds.height / 2),
        );
        const backgroundSection = document
          .elementsFromPoint(sampleX, sampleY)
          .map((element) =>
            element.closest(
              "section[data-navbar-theme], footer[data-navbar-theme], section[id]",
            ),
          )
          .find(Boolean);

        setIsDarkBackground(backgroundSection?.dataset.navbarTheme === "dark");
      });
    };

    updateTheme();
    addEventListener("scroll", updateTheme, { passive: true });
    addEventListener("resize", updateTheme);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", updateTheme);
      removeEventListener("resize", updateTheme);
    };
  }, [noticeVisible]);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.qty || 1),
    0,
  );
  const likeCount = likedItems.length;
  const close = () => {
    setMobileOpen(false);
    setDiscoverOpen(false);
  };
  const goToProducts = () =>
    document
      .querySelector("#collections")
      ?.scrollIntoView({ behavior: "smooth" });
  const openDialog = (type) => {
    setCartItems(getStoredItems("almirah-cart"));
    setLikedItems(getStoredItems("almirah-likes"));
    setActiveDialog(type);
  };
  const dialogItems = activeDialog === "cart" ? cartItems : likedItems;
  const themedIconButton = `${iconButton} ${
    isDarkBackground
      ? "text-white hover:bg-white/15 focus-visible:outline-white"
      : "text-stone-900 hover:bg-stone-900/10 focus-visible:outline-stone-900"
  }`;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -42, opacity: 0 }}
        animate={{ y: noticeVisible ? 38 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed left-0 top-3 z-30 w-full px-3 sm:px-5 md:px-[4vw]"
      >
        <nav
          className={`relative mx-auto flex h-auto min-w-0 max-w-[1640px] items-center justify-between rounded-full border px-3 py-2 shadow-md backdrop-blur-2xl transition-[background-color,border-color,color,box-shadow] duration-500 sm:px-4 md:px-8 ${
            isDarkBackground
              ? "border-white/45 bg-stone-950/10 text-white"
              : "border-stone-900/10 bg-white/75 text-stone-900"
          }`}
        >
          <HashLink
            smooth
            to="#hero"
            aria-label="Almirah home"
            onClick={close}
            className="shrink-0"
          >
            <img
              className="w-18 rounded-full object-contain sm:w-26"
              src="/assets/navbar/image 3726.png"
              alt="Almirah Collective"
            />
          </HashLink>
          <div className="hidden items-center gap-7 lg:flex">
            {primaryLinks.map(([label, to]) => (
              <HashLink
                key={to}
                smooth
                to={to}
                className={`text-sm font-medium transition ${isDarkBackground ? "hover:text-[#f7d0b5]" : "hover:text-brand"}`}
              >
                {label}
              </HashLink>
            ))}
            <button
              onClick={() => setDiscoverOpen(!discoverOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition ${isDarkBackground ? "hover:text-[#f7d0b5]" : "hover:text-brand"}`}
            >
              Discover{" "}
              <ChevronDown
                className={`h-4 w-4 transition ${discoverOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="flex min-w-0 shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={themedIconButton}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => openDialog("likes")}
              className={themedIconButton}
              aria-label="Liked items"
            >
              <Heart
                className="h-5 w-5"
                fill={likeCount ? "currentColor" : "none"}
              />
              {likeCount > 0 && <Badge>{likeCount}</Badge>}
            </button>
            <button
              onClick={() => openDialog("cart")}
              className={themedIconButton}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </button>
            <button
              className={`${themedIconButton} lg:hidden`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                onSubmit={(event) => {
                  event.preventDefault();
                  goToProducts();
                  setSearchOpen(false);
                }}
                className={`absolute right-3 top-[78px] flex w-[min(360px,calc(100vw-24px))] overflow-hidden rounded-2xl border p-1 shadow-md backdrop-blur-2xl transition-colors duration-500 ${
                  isDarkBackground
                    ? "border-white/45 bg-stone-950/35 text-white"
                    : "border-stone-900/10 bg-white/80 text-stone-900"
                }`}
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className={`min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none ${isDarkBackground ? "placeholder:text-white/55" : "placeholder:text-stone-500"}`}
                  placeholder="Search the collection"
                />
                <button className="rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-[#7b3d18]">
                  Go
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {mobileOpen && <MobileMenu onClose={close} />}
          </AnimatePresence>
        </nav>
        <AnimatePresence>
          {discoverOpen && (
            <DesktopMenu dark={isDarkBackground} onClose={close} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {mobileOpen && <MobileMenu dark={isDarkBackground} onClose={close} />}
        </AnimatePresence>
      </motion.header>
      {createPortal(
        <AnimatePresence>
          {activeDialog && (
            <ItemsDialog
              type={activeDialog}
              items={dialogItems}
              onClose={() => setActiveDialog(null)}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function ItemsDialog({ type, items, onClose }) {
  const isCart = type === "cart";
  const title = isCart ? "Your shopping bag" : "Your saved pieces";
  const removeItem = (name) => removeFromCart(name);
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
        initial={{ opacity: 0, y: 36, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 290, damping: 25 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-items-title"
        className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-[#fffaf7]/70 shadow-2xl shadow-stone-950/45 backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
              Almirah Collective
            </p>
            <h2
              id="saved-items-title"
              className="mt-1 font-serif text-2xl text-stone-900"
            >
              {title}
            </h2>
          </div>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
        <div className="max-h-[min(55vh,430px)] overflow-y-auto p-5 sm:p-6">
          <AnimatePresence mode="popLayout">
            {items.length ? (
              <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                  <motion.article
                    key={item.name}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 rounded-2xl bg-white/80 p-3 shadow-lg shadow-stone-900/10 backdrop-blur-sm"
                  >
                    <img
                      src={`/assets/collections/${item.image}`}
                      alt=""
                      className="h-16 w-14 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-serif text-lg text-stone-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-stone-500">{item.type}</p>
                    </div>
                    {isCart && (
                      <span className="rounded-full bg-[#f3e6dc] px-3 py-1 text-xs font-bold text-brand">
                        Qty {item.qty || 1}
                      </span>
                    )}
                    {isCart ? (
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.name)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    ) : (
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    )}
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid min-h-48 place-items-center px-5 text-center"
              >
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f3e6dc] text-brand">
                    {isCart ? <ShoppingBag /> : <Heart />}
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-stone-900">
                    Nothing here yet
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {isCart
                      ? "Your chosen pieces will appear here."
                      : "Tap the heart on a piece you love to save it here."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-t border-stone-200 bg-white/70 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-stone-900 py-3 text-sm font-bold text-white transition hover:bg-brand"
          >
            Continue exploring
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

function Badge({ children }) {
  return (
    <motion.b
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] text-white"
    >
      {children}
    </motion.b>
  );
}
function DesktopMenu({ dark, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute left-1/2 top-[78px] grid w-[440px] -translate-x-1/2 grid-cols-2 gap-1 rounded-3xl border p-3 shadow-md backdrop-blur-3xl transition-colors duration-500 ${
        dark
          ? "border-white/45 bg-stone-950/35 text-white"
          : "border-stone-900/10 bg-white/80 text-stone-900"
      }`}
    >
      {discoverLinks.map(([label, to]) => (
        <HashLink
          key={to}
          smooth
          to={to}
          onClick={onClose}
          className={`rounded-2xl px-4 py-3 text-sm transition ${dark ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-stone-700 hover:bg-stone-900/10 hover:text-brand"}`}
        >
          {label}
        </HashLink>
      ))}
    </motion.div>
  );
}
function MobileMenu({ dark, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className={`absolute left-3 right-3 top-[78px] overflow-hidden rounded-3xl border p-3 shadow-md backdrop-blur-3xl transition-colors duration-500 sm:left-5 sm:right-5 md:left-[4vw] md:right-[4vw] lg:hidden ${
        dark
          ? "border-white/45 bg-stone-950/35 text-white"
          : "border-stone-900/10 bg-white/80 text-stone-900"
      }`}
    >
      {[...primaryLinks, ...discoverLinks].map(([label, to]) => (
        <HashLink
          key={to}
          smooth
          to={to}
          onClick={onClose}
          className={`block rounded-xl px-5 py-3 text-sm transition ${dark ? "hover:bg-white/10" : "hover:bg-stone-900/10 hover:text-brand"}`}
        >
          {label}
        </HashLink>
      ))}
    </motion.div>
  );
}
