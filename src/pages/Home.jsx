import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "../components/Hero";
import BrowseCategories from "@/components/BrowseCategories";
import AboutUs from "@/components/AboutUs";
import Collections from "@/components/Collections";
import GiftGiving from "@/components/GiftGiving";
import WomenAffection from "@/components/WomenAffection";
import Excellence from "@/components/Excellence";
import HowItWorks from "@/components/HowItWorks";
import Gallary from "@/components/Gallary";
import HotSellings from "@/components/HotSellings";
import StyleTransformation from "@/components/StyleTransformation";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import NotificationBar from "@/components/NotificationBar";

function Home() {
  return (
    <>
      <NotificationBar />
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="browse-categories">
        <BrowseCategories />
      </section>

      <section id="about-us">
        <AboutUs />
      </section>

      <section id="collections">
        <Collections />
      </section>

      <section id="gift-giving">
        <GiftGiving />
      </section>

      <section id="women-affection">
        <WomenAffection />
      </section>

      <section id="excellence">
        <Excellence />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="gallary">
        <Gallary />
      </section>

      <section id="hot-sellings">
        <HotSellings />
      </section>

      <section id="style-transformation">
        <StyleTransformation />
      </section>

      <section id="faqs">
        <Faqs />
      </section>

      <Footer />
    </>
  );
}

export default Home;
