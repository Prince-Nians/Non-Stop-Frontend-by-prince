import type { HeroSlide, Section } from "@/lib/content";
import HeroSlider from "./HeroSlider";
import { assetAlt, assetSrc, type Assets } from "@/lib/assets";
import type { Labels } from "@/lib/labels";

export default function Hero({
  section,
  slides,
  assets,
  labels,
}: {
  section?: Section;
  slides: HeroSlide[];
  assets?: Assets;
  labels: Labels;
}) {
  const stadium = (
    <>
      <img className="hero-bg" src={section?.image ?? "/figma/hero-bg.png"} alt="" />
      <div className="hero-canvas">
        <img className="hero-title" src={section?.image_secondary ?? "/figma/hero-title.svg"} alt="" aria-hidden />

        {/* left cluster */}
        <div className="hero-cluster hero-cluster-l">
          <div className="hero-ellipse hero-ellipse-l">
            <div>
              <img src={assetSrc(assets, "hero_ellipse_left")} alt="" />
            </div>
          </div>
          <div className="hero-box hero-classic">
            <div className="hero-classic-in">
              <img src={assetSrc(assets, "hero_can_classic")} alt={assetAlt(assets, "hero_can_classic", "NON STOP Classic can")} />
            </div>
          </div>
          <div className="hero-box hero-shadow-l">
            <div />
          </div>
          <div className="hero-box hero-jungle">
            <div className="hero-jungle-in">
              <img src={assetSrc(assets, "hero_can_jungle")} alt={assetAlt(assets, "hero_can_jungle", "NON STOP Jungle can")} />
            </div>
          </div>
        </div>

        <img className="hero-sparkle" src="/figma/hero-vec-261.svg" alt="" />

        {/* right cluster */}
        <div className="hero-cluster hero-cluster-r">
          <div className="hero-ellipse hero-ellipse-r">
            <div>
              <img src={assetSrc(assets, "hero_ellipse_right")} alt="" />
            </div>
          </div>
          <div className="hero-box hero-zero">
            <div className="hero-zero-in">
              <img src={assetSrc(assets, "hero_can_zero")} alt={assetAlt(assets, "hero_can_zero", "NON STOP Classic Zero Sugar can")} />
            </div>
          </div>
          <div className="hero-box hero-shadow-r">
            <div />
          </div>
          <div className="hero-box hero-boost">
            <div className="hero-boost-in">
              <img src={assetSrc(assets, "hero_can_boost")} alt={assetAlt(assets, "hero_can_boost", "NON STOP Boost can")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <HeroSlider
      slides={slides}
      title={section?.title ?? "Stay Nonstop"}
      stadium={stadium}
      stripSrc={assetSrc(assets, "strip_hero")}
      labels={labels}
    />
  );
}
