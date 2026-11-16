import { getHome } from "@/lib/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import PartnerBand from "@/components/PartnerBand";
import About from "@/components/About";
import Social from "@/components/Social";
import Events from "@/components/Events";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";

export default async function Home() {
  const home = await getHome();
  return (
    <div className="page" id="top">
      <Header settings={home.settings} nav={home.nav.header} shops={home.shops} />
      <main>
        <Hero section={home.sections.hero} slides={home.hero_slides ?? []} />
        <Products section={home.sections.products} products={home.products} />
        <PartnerBand section={home.sections.partner} shops={home.shops} />
        <About section={home.sections.about} points={home.about_points} slides={home.about_slides ?? []} />
        <Social section={home.sections.social} photos={home.social_photos} />
        <Events section={home.sections.events} events={home.events} />
        <Blogs section={home.sections.blogs} posts={home.blogs} />
      </main>
      <Footer settings={home.settings} footer={home.nav.footer} legal={home.nav.legal} />
    </div>
  );
}
