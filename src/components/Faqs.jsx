import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./ui";

const faqItems = [
  [
    "How long does shipping take?",
    "Most orders are prepared within 1–2 business days. Delivery usually takes 3–7 business days depending on your location and the delivery option selected at checkout.",
  ],
  [
    "What payment methods do you accept?",
    "We accept major debit and credit cards along with supported secure digital payment methods shown during checkout.",
  ],
  [
    "Do you offer international shipping?",
    "International delivery is available for selected destinations. Eligible countries, costs, and estimated delivery windows appear at checkout.",
  ],
  [
    "How can I contact customer support?",
    "Our support team can help with products, orders, returns, and delivery questions through the contact options listed on our website.",
  ],
  [
    "Can I change or cancel my order?",
    "Contact us as soon as possible after ordering. We can usually make changes before dispatch, but shipped orders can no longer be edited or cancelled.",
  ],
  [
    "What is your return policy?",
    "Eligible unworn items with their original tags and packaging can be returned within the return window shown in your order confirmation.",
  ],
  [
    "How do I find the right size?",
    "Use the size guide on each product page and compare the listed measurements with a well-fitting piece you already own.",
  ],
  [
    "How can I track my order?",
    "Once your order ships, we send a tracking link by email or message. You can use it to follow every delivery update.",
  ],
  [
    "Are the product colours accurate?",
    "We photograph pieces carefully, though colour can vary slightly between screens. Product descriptions note important colour and finish details.",
  ],
  [
    "How should I care for my Almirah pieces?",
    "Always follow the care label included with your garment. Delicate fabrics generally benefit from gentle washing, cool temperatures, and air drying.",
  ],
  [
    "Will sold-out products return?",
    "Selected favourites may be restocked. Limited pieces may not return, so check New Arrivals regularly for refreshed options.",
  ],
  [
    "Do you offer gift-ready packaging?",
    "Selected orders can be prepared for gifting. Available packaging and message options are displayed during checkout.",
  ],
];

export default function Faqs() {
  const [open, setOpen] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) =>
      event.key === "Escape" && setDialogOpen(false);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <section className="mx-auto grid w-full max-w-[1640px] grid-cols-1 gap-10 px-6 py-12 text-left md:w-[92vw] md:grid-cols-2 md:gap-24 md:px-0 md:py-14">
        <Reveal>
          <div>
            <h2 className="m-0 text-4xl font-bold tracking-[-0.06em] text-[#12252b] md:text-5xl">
              Frequently Asked
              <br />
              Questions
            </h2>
            <p className="mt-10 text-sm leading-7 text-stone-600 md:text-base">
              Everything You Need to Know About Our Products &amp; Services
            </p>
            <div
              aria-hidden="true"
              className="my-7 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent md:my-12"
            />
            <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand" /> Top Quality Products
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand" /> Exceptional Customer
                Support
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid content-start gap-4">
          {faqItems.slice(0, 4).map(([question, answer], index) => (
            <Reveal delay={index * 0.08} key={question}>
              <AccordionItem
                question={question}
                answer={answer}
                isOpen={open === index}
                onToggle={() => setOpen(open === index ? -1 : index)}
              />
            </Reveal>
          ))}

          <motion.button
            type="button"
            onClick={() => setDialogOpen(true)}
            whileHover={{ y: -5, scale: 1.018 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mt-2 isolate overflow-hidden rounded-2xl border border-brand/25 bg-white px-6 py-4 text-sm font-bold text-brand shadow-sm transition-[border-color,box-shadow,color] duration-500 hover:border-brand hover:text-white hover:shadow-xl hover:shadow-brand/25"
          >
            <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-brand transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
            <span className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-brand transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[7]" />
            <span className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#b9764b] opacity-80 transition-transform delay-75 duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[7]" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm transition-transform delay-200 duration-700 group-hover:translate-x-[600%]" />
            <span className="relative inline-flex items-center gap-3">
              View all FAQs
              <span className="grid h-7 w-7 place-items-center rounded-full border border-brand/25 bg-brand/5 transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-white/50 group-hover:bg-white/15 group-hover:shadow-[0_0_14px_rgba(255,255,255,.5)]">
                <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </span>
            </span>
          </motion.button>
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {dialogOpen && <FaqDialog onClose={() => setDialogOpen(false)} />}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  compact = false,
}) {
  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "border-brand/20 bg-[#f8f4f0] shadow-[0_12px_28px_rgb(151_81_36_/_0.14)]"
          : "border-transparent bg-white shadow-[0_6px_22px_rgb(0_0_0_/_0.04)] hover:border-brand/10 hover:bg-[#faf7f4]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between gap-4 text-left text-[#10252b] ${compact ? "px-5 py-4" : "px-6 py-6"}`}
      >
        <span className="font-semibold">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.08 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.28, ease: "easeOut" },
            }}
          >
            <motion.p
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -5 }}
              transition={{ duration: 0.32 }}
              className={`text-sm leading-7 text-stone-600 ${compact ? "px-5 pb-5" : "px-6 pb-6"}`}
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function FaqDialog({ onClose }) {
  const [open, setOpen] = useState(0);
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
        aria-labelledby="faq-dialog-title"
        className="relative my-auto max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/60 bg-[#fffaf7]/95 p-6 text-left shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-0 z-20 float-right grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white shadow-lg transition hover:rotate-90"
          aria-label="Close all FAQs"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="pr-14 text-xs font-bold uppercase tracking-[.18em] text-brand">
          Help centre
        </p>
        <h2
          id="faq-dialog-title"
          className="mt-3 pr-14 text-2xl font-bold text-[#12252b] sm:text-3xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-3 max-w-xl text-stone-600">
          Quick, clear answers about ordering, delivery, returns, sizing, and
          caring for your Almirah pieces.
        </p>
        <div className="mt-8 grid gap-3">
          {faqItems.map(([question, answer], index) => (
            <AccordionItem
              key={question}
              question={question}
              answer={answer}
              isOpen={open === index}
              onToggle={() => setOpen(open === index ? -1 : index)}
              compact
            />
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
