import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import PartnerBand from "@/components/PartnerBand";
import About from "@/components/About";
import Social from "@/components/Social";
import Events from "@/components/Events";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page" id="top">
      <Header />
      <main>
        <Hero />
        <Products />
        <PartnerBand />
        <About />
        <Social />
        <Events />
        <Blogs />
      </main>
      <Footer />
    </div>
  );
}
