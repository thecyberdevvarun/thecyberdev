"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/section/Hero";
import Features from "../components/section/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Features/>
      </div>
      <Footer />
    </main>
  );
}
