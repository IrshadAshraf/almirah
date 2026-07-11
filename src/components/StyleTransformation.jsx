import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const assetPath = "/assets/style transformation/";

const features = [
  {
    icon: "Vector (7).png",
    title: "Everyday Elegance For Every Occasion",
    text: "Versatile pieces selected to move effortlessly from everyday moments to meaningful occasions.",
    highlighted: true,
  },
  {
    icon: "Vector (8).png",
    title: "Fashion You’ll Love, Quality You’ll Trust",
    text: "Considered fabrics, refined finishes, and styles designed to stay in your wardrobe.",
  },
];

const testimonials = [
  {
    quote:
      "Every piece feels thoughtfully chosen. The quality is beautiful, and styling it feels completely effortless.",
    name: "Aarav Mehta",
    role: "VERIFIED CLIENT",
    avatar: "avatar.png",
  },
  {
    quote:
      "Almirah helped me find something distinctive without the usual endless searching. I absolutely love the edit.",
    name: "Meera Kapoor",
    role: "VERIFIED CLIENT",
    avatar: "avatar1.png",
  },
];

const allReviews = [
  ...testimonials,
  {
    quote:
      "The fabric feels premium and the fit was exactly as described. It became an instant wardrobe favourite.",
    name: "Riya Sharma",
    role: "VERIFIED CLIENT",
    avatar: "avatar1.png",
  },
  {
    quote:
      "A beautifully edited collection. I found an occasion look in minutes and received so many compliments.",
    name: "Kabir Malhotra",
    role: "RETURNING CLIENT",
    avatar: "avatar.png",
  },
  {
    quote:
      "The entire experience felt considered—from discovering the piece to the careful packaging and delivery.",
    name: "Ananya Iyer",
    role: "VERIFIED CLIENT",
    avatar: "avatar1.png",
  },
  {
    quote:
      "I appreciate that the collection feels focused rather than overwhelming. Every option genuinely feels special.",
    name: "Dev Khanna",
    role: "VERIFIED CLIENT",
    avatar: "avatar.png",
  },
  {
    quote:
      "Elegant, comfortable, and easy to style. The quality has held up beautifully after repeated wear.",
    name: "Sara Ahmed",
    role: "RETURNING CLIENT",
    avatar: "avatar1.png",
  },
];

export default function StyleTransformation() {
  const [reviewsOpen, setReviewsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) =>
      event.key === "Escape" && setReviewsOpen(false);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#191919] px-6 py-20 text-white md:px-[5vw] lg:py-24">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_-5%,rgba(151,81,36,.75),transparent_35%),radial-gradient(circle_at_55%_70%,rgba(255,255,255,.06),transparent_35%)]" />
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-0 left-[22%] -z-10 h-[55%] w-[58%] rounded-[50%] border border-white/10 bg-[repeating-radial-gradient(ellipse_at_center,transparent_0_13px,rgba(255,255,255,.08)_14px_15px)] blur-[1px]"
        />
        <img
          aria-hidden="true"
          src={`${assetPath}Vector to place at bottom right in background.png`}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 -z-10 w-20 opacity-25 md:w-28"
        />

        <div className="relative z-10 mx-auto grid max-w-[1640px] grid-cols-1 gap-x-12 gap-y-9 xl:grid-cols-12 xl:items-start">
          <motion.div
            initial={{ opacity: 0, x: -55, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="xl:col-span-6"
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative inline-flex rounded-full border border-white/35 bg-white/[.03] px-5 py-2 text-xs font-bold tracking-[.14em] text-white/90 backdrop-blur-sm"
            >
              <WhiteBorderTrail />
              Real Style Transformations
            </motion.span>
            <h2 className="mt-7 max-w-2xl text-2xl font-bold leading-[1.18] tracking-tight md:text-5xl lg:text-[3.35rem]">
              Discover Our Thoughtfully
              <br />
              Curated Collections
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300">
              Discover expressive fashion selected for comfort, confidence, and
              lasting personal style—whatever the moment calls for.
            </p>
          </motion.div>

          <div className="grid gap-6 xl:col-span-6 xl:pt-2">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[28px] xl:col-span-6 xl:col-start-1 xl:row-start-2"
          >
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-[330px] w-full object-cover object-top sm:h-[390px]"
              src={`${assetPath}handsome-caucasian-male-financier-planning-budget-for-expenses-dating.png`}
              alt="Almirah style transformation"
            />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 xl:col-span-8 xl:col-start-5 xl:row-start-2 xl:self-center">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={testimonial.name}
                {...testimonial}
                index={index}
              />
            ))}
            <motion.button
              type="button"
              onClick={() => setReviewsOpen(true)}
              whileHover={{ y: -4, scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="group relative mx-auto mt-1 overflow-hidden rounded-full border border-white/35 bg-white/[.06] px-7 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md sm:col-span-2"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative transition-colors duration-300 group-hover:text-brand">
                Explore all reviews
              </span>
            </motion.button>
          </div>
        </div>
      </section>
      {createPortal(
        <AnimatePresence>
          {reviewsOpen && (
            <ReviewsDialog onClose={() => setReviewsOpen(false)} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function WhiteBorderTrail() {
  const duration = 3.4;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full"
    >
      {Array.from({ length: 16 }, (_, index) => (
        <motion.i
          key={index}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay: index === 0 ? 0 : -(duration - index * 0.02),
          }}
          className="absolute left-0 top-0 rounded-full bg-white"
          style={{
            offsetPath: "inset(1px round 999px)",
            offsetRotate: "0deg",
            width: `${3.5 - (index / 15) * 2.5}px`,
            height: `${3.5 - (index / 15) * 2.5}px`,
            opacity: 0.82 * (1 - index / 16),
            boxShadow: "0 0 7px 1px rgba(255,255,255,.75)",
          }}
        />
      ))}
      <motion.i
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{
          offsetPath: "inset(1px round 999px)",
          offsetRotate: "0deg",
          boxShadow:
            "0 0 7px 2px rgba(255,255,255,.95), 0 0 17px 5px rgba(255,255,255,.45)",
        }}
      />
    </span>
  );
}

function Feature({ icon, title, text, highlighted, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 55, y: index * 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay: index * 0.14, ease: "easeOut" }}
      whileHover={
        index === 0
          ? {
              x: -8,
              y: -4,
              scale: 1.018,
              boxShadow: "0 22px 42px rgba(151,81,36,.28)",
              transition: { duration: 0.25 },
            }
          : {
              x: 8,
              rotate: 0.7,
              scale: 1.015,
              boxShadow: "0 18px 38px rgba(255,255,255,.09)",
              transition: { duration: 0.25 },
            }
      }
      className={`relative flex items-start gap-5 overflow-hidden rounded-[28px] p-7 ${
        highlighted
          ? "bg-[linear-gradient(110deg,rgba(0,0,0,.9),rgba(39,20,11,.88),rgba(151,81,36,.92))] shadow-xl"
          : "bg-white/[.025]"
      }`}
    >
      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/[.08] p-3">
        <img
          src={`${assetPath}${icon}`}
          alt=""
          className="h-8 w-8 object-contain"
        />
      </span>
      <div className="relative">
        <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
        <p className="mt-2 leading-relaxed text-stone-300">{text}</p>
      </div>
    </motion.article>
  );
}

function Testimonial({ quote, name, role, avatar, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: index ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay: 0.18 + index * 0.14,
        ease: "easeOut",
      }}
    >
      <motion.article
        animate={{ y: [0, index ? -7 : -10, 0] }}
        transition={{
          duration: 4.4 + index * 0.5,
          delay: index * 0.2,
          repeat: Infinity,
          ease: "easeInOut",
          scale: { duration: 0.4 },
        }}
        whileHover={
          index === 0
            ? {
                scale: 1.028,
                rotate: -1.2,
                boxShadow: "0 28px 55px rgba(151,81,36,.34)",
                transition: { duration: 0.25 },
              }
            : {
                scale: 1.025,
                rotate: 1.2,
                x: 6,
                boxShadow: "0 28px 55px rgba(255,255,255,.12)",
                transition: { duration: 0.25 },
              }
        }
        className="relative min-h-[295px] overflow-hidden rounded-[28px] border border-white/[.04] bg-black/90 p-7 shadow-2xl"
      >
        <TestimonialBorderTrail index={index} />
        <div
          className={`pointer-events-none absolute h-44 w-44 rounded-full bg-brand/45 blur-3xl ${index ? "-right-20 -top-24" : "-left-20 -top-24"}`}
        />
        <Stars />
        <p className="relative mt-8 text-base font-medium italic leading-relaxed text-white/90">
          “{quote}”
        </p>
        <div className="relative mt-7 flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-full border border-white/40 object-cover"
            src={`${assetPath}${avatar}`}
            alt={name}
          />
          <div>
            <p className="font-bold">{name}</p>
            <p className="mt-1 text-xs font-bold tracking-[.14em] text-orange-400">
              {role}
            </p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function TestimonialBorderTrail({ index }) {
  if (index === 0) {
    return (
      <span className="pointer-events-none absolute inset-0 z-20 rounded-[28px]">
        <motion.i
          animate={{ top: ["3%", "78%", "3%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-0.5 h-16 w-1 rounded-full bg-gradient-to-b from-transparent via-orange-300 to-white shadow-[0_0_9px_2px_rgba(251,146,60,.65)]"
        />
        <motion.i
          animate={{ bottom: ["3%", "78%", "3%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-0.5 h-16 w-1 rounded-full bg-gradient-to-t from-transparent via-orange-300 to-white shadow-[0_0_9px_2px_rgba(251,146,60,.65)]"
        />
      </span>
    );
  }

  return (
    <span className="pointer-events-none absolute inset-0 z-20 rounded-[28px]">
      <motion.i
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 top-0 h-[3px] w-14 rounded-full bg-gradient-to-r from-transparent via-orange-300 to-white shadow-[0_0_9px_2px_rgba(251,146,60,.7)]"
        style={{
          offsetPath: "inset(1px round 28px)",
          offsetRotate: "auto",
        }}
      />
    </span>
  );
}

function ReviewsDialog({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-stone-950/70 p-4 backdrop-blur-md sm:p-8"
      role="presentation"
    >
      <motion.section
        initial={{ opacity: 0, y: 42, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reviews-dialog-title"
        className="relative my-auto max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#171717]/95 p-6 text-left text-white shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-0 z-20 float-right grid h-10 w-10 place-items-center rounded-full bg-white text-stone-900 shadow-lg transition hover:rotate-90"
          aria-label="Close all reviews"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="pr-14 text-xs font-bold uppercase tracking-[.18em] text-orange-400">
          The Almirah community
        </p>
        <h2
          id="reviews-dialog-title"
          className="mt-3 pr-14 text-3xl font-bold sm:text-4xl"
        >
          Stories from our clients
        </h2>
        <p className="mt-3 max-w-2xl text-stone-400">
          Real experiences from customers who found confidence, comfort, and a
          style that feels distinctly their own.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {allReviews.map((review, index) => (
            <motion.article
              key={`${review.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[.055] p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[.08]"
            >
              <Stars staticStars />
              <p className="mt-5 italic leading-relaxed text-white/85">
                “{review.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={`${assetPath}${review.avatar}`}
                  alt={review.name}
                  className="h-11 w-11 rounded-full border border-white/30 object-cover"
                />
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="mt-1 text-[10px] font-bold tracking-[.13em] text-orange-400">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function Stars({ staticStars = false }) {
  return (
    <div className="relative flex gap-2 text-amber-400">
      {Array.from({ length: 5 }, (_, index) => (
        <motion.span
          key={index}
          animate={
            staticStars ? undefined : { scale: [1, 1.22, 1], rotate: [0, 8, 0] }
          }
          transition={
            staticStars
              ? undefined
              : { duration: 1.8, delay: index * 0.12, repeat: Infinity }
          }
        >
          <Star className="h-4 w-4" fill="currentColor" />
        </motion.span>
      ))}
    </div>
  );
}
