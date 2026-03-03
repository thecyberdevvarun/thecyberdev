"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Hero />
      </div>
      <Footer />
    </main>
  );
}
