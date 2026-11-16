import type { HeroSlide, Section } from "@/lib/content";
import HeroSlider from "./HeroSlider";

export default function Hero({ section, slides }: { section?: Section; slides: HeroSlide[] }) {
  const stadium = (
    <>
      <img className="hero-bg" src={section?.image ?? "/figma/hero-bg.png"} alt="" />
      <div className="hero-canvas">
        <img className="hero-title" src={section?.image_secondary ?? "/figma/hero-title.svg"} alt="" aria-hidden />

        {/* left cluster */}
        <div className="hero-cluster hero-cluster-l">
          <div className="hero-ellipse hero-ellipse-l">
            <div>
              <img src="/figma/hero-ellipse-l.svg" alt="" />
            </div>
          </div>
          <div className="hero-box hero-classic">
            <div className="hero-classic-in">
              <img src="/figma/hero-can-classic.png" alt="NON STOP Classic can" />
            </div>
          </div>
          <div className="hero-box hero-shadow-l">
            <div />
          </div>
          <div className="hero-box hero-jungle">
            <div className="hero-jungle-in">
              <img src="/figma/hero-can-jungle.png" alt="NON STOP Jungle can" />
            </div>
          </div>
        </div>

        <img className="hero-sparkle" src="/figma/hero-vec-261.svg" alt="" />

        {/* right cluster */}
        <div className="hero-cluster hero-cluster-r">
          <div className="hero-ellipse hero-ellipse-r">
            <div>
              <img src="/figma/hero-ellipse-r.svg" alt="" />
            </div>
          </div>
          <div className="hero-box hero-zero">
            <div className="hero-zero-in">
              <img src="/figma/hero-can-zero.png" alt="NON STOP Classic Zero Sugar can" />
            </div>
          </div>
          <div className="hero-box hero-shadow-r">
            <div />
          </div>
          <div className="hero-box hero-boost">
            <div className="hero-boost-in">
              <img src="/figma/hero-can-boost.png" alt="NON STOP Boost can" />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <HeroSlider slides={slides} title={section?.title ?? "Stay Nonstop"} stadium={stadium} />;
}
