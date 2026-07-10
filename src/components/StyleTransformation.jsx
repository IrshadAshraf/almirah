import React from "react";
import { BriefcaseBusiness, Users, Star } from "lucide-react";
import { Float, Reveal } from "./ui";
export default function StyleTransformation() {
  return (
    <section className="grid gap-10 overflow-hidden bg-[#181818] px-6 py-24 text-white md:grid-cols-2 md:px-[5vw]">
      <div>
        <span className="rounded-full border border-white/30 px-4 py-2 text-xs tracking-widest">
          REAL STYLE TRANSFORMATIONS
        </span>
        <h2 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
          Discover Our Thoughtfully
          <br />
          Curated Collections
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-stone-300">
          Pieces chosen to bring ease, confidence, and lasting style to your
          every day.
        </p>
        <Reveal effect="left" className="mt-9 overflow-hidden rounded-3xl">
          <img
            className="h-80 w-full object-cover"
            src="/src/assets/style transformation/handsome-caucasian-male-financier-planning-budget-for-expenses-dating.png"
            alt="Client style"
          />
        </Reveal>
      </div>
      <div className="grid content-center gap-6">
        <Top icon={<Users />} title="Everyday Elegance For Every Occasion" />
        <Top
          icon={<BriefcaseBusiness />}
          title="Fashion You'll Love, Quality You'll Trust"
        />
        <Float className="rounded-3xl bg-black p-7">
          <Stars />
          <p className="mt-6 italic leading-relaxed">
            “The perfect balance of comfort and confidence. Every piece feels
            intentionally made.”
          </p>
          <div className="mt-5 flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="/src/assets/style transformation/avatar.png"
              alt="John Doe"
            />
            <b>Mr. John Doe</b>
          </div>
        </Float>
      </div>
    </section>
  );
}
function Top({ icon, title }) {
  return (
    <Reveal
      effect="right"
      className="flex gap-5 rounded-3xl bg-gradient-to-r from-black to-[#5b301a] p-6"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
        {icon}
      </span>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-2 text-sm text-stone-300">
          Thoughtfully curated pieces made for the moments that matter.
        </p>
      </div>
    </Reveal>
  );
}
function Stars() {
  return (
    <div className="flex gap-1 text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-4 w-4" fill="currentColor" />
      ))}
    </div>
  );
}
