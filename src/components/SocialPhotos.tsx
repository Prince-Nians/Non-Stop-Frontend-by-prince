"use client";

import { useEffect, useRef, useState } from "react";

type Item = {
  image: string | null;
  alt: string | null;
  url: string | null;
  instagram_url: string | null;
  video: string | null;
};

// Only official Instagram permalinks are ever embedded.
const IG = /^https:\/\/www\.instagram\.com\/(reel|p|tv)\/[\w-]+\/$/;

/**
 * The three tilted social cards (first three items that have a cover photo). Hover brings a card
 * forward (CSS); click opens the item in a popup that can step through every reel/post with the
 * arrows. An uploaded reel video autoplays (muted, with a sound button); without one the Instagram
 * embed is used (it cannot autoplay). Embeds/videos only exist while the popup is open.
 */
export default function SocialPhotos({ photos }: { photos: Item[] }) {
  const items = photos.filter((p) => p.image || p.video || (p.instagram_url && IG.test(p.instagram_url)));
  const cards = items
    .map((p, idx) => ({ p, idx }))
    .filter((x) => x.p.image || x.p.video)
    .slice(0, 3);

  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open !== null && !dlg.open) dlg.showModal();
    if (open === null && dlg.open) dlg.close();
  }, [open]);

  const close = () => {
    setOpen(null);
    lastFocus.current?.focus();
  };
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length));
  const current = open !== null ? items[open] : null;
  const video = current?.video ?? null;

  // Card reels play silently while the section is on screen and pause when it is not (saves battery and data).
  useEffect(() => {
    const wrap = cardsRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vids = Array.from(wrap.querySelectorAll("video"));
    if (reduce || !vids.length) return;
    const io = new IntersectionObserver(
      ([entry]) => vids.forEach((v) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause())),
      { threshold: 0.2 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [cards.length]);

  // Start the reel as soon as it is shown. Browsers only allow this while muted.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !video) return;
    setMuted(true);
    v.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) v.play().catch(() => {});
  }, [video, open]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };
  const embed = current?.instagram_url && IG.test(current.instagram_url) ? current.instagram_url : null;

  const openCard = (el: HTMLElement, idx: number) => {
    lastFocus.current = el;
    setOpen(idx);
  };

  return (
    <>
      <div className="social-photos" ref={cardsRef}>
        {cards.map(({ p, idx }, i) => (
          <div key={idx} className={`sp sp-${i + 1}`}>
            <div
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Open larger: ${p.alt ?? "NON STOP on Instagram"}`}
              onClick={(e) => openCard(e.currentTarget, idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openCard(e.currentTarget, idx);
                }
              }}
            >
              {p.video ? (
                <video
                  className="sp-card-video"
                  src={`${p.video}#t=0.1`}
                  poster={p.image ?? undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  aria-hidden
                  tabIndex={-1}
                />
              ) : (
                <img src={p.image!} alt={p.alt ?? "NON STOP on Instagram"} />
              )}
              {p.instagram_url && !p.video && (
                <span className="sp-badge" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="sp-modal"
        aria-label={current?.alt ?? "NON STOP on Instagram"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          // A click on the dark backdrop (the dialog element itself) closes it.
          if (e.target === dialogRef.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
      >
        <button type="button" className="sp-modal-close" aria-label="Close" onClick={close}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {current && items.length > 1 && (
          <>
            <button type="button" className="sp-modal-nav sp-modal-prev" aria-label="Previous" onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" className="sp-modal-nav sp-modal-next" aria-label="Next" onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {current && (
          <figure className="sp-modal-figure">
            {video ? (
              <div className="sp-modal-video-wrap">
                <video
                  key={video}
                  ref={videoRef}
                  className="sp-modal-video"
                  src={video}
                  poster={current.image ?? undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  controlsList="nodownload noremoteplayback"
                  preload="auto"
                  aria-label={current.alt ?? "NON STOP reel"}
                />
                <button
                  type="button"
                  className="sp-sound"
                  aria-label={muted ? "Turn sound on" : "Turn sound off"}
                  aria-pressed={!muted}
                  onClick={toggleSound}
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" className="sp-sound-body" />
                    {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" />}
                  </svg>
                </button>
              </div>
            ) : embed ? (
              <div className="sp-modal-embed-wrap">
                <span className="sp-spinner" aria-hidden />
                <iframe
                  key={embed}
                  className="sp-modal-embed"
                  src={`${embed}embed/`}
                  title={current.alt ?? "Instagram"}
                  loading="lazy"
                  allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <img className="sp-modal-img" src={current.image!} alt={current.alt ?? "NON STOP on Instagram"} />
            )}
            <figcaption className="sp-modal-caption">
              {items.length > 1 && (
                <span>
                  {open! + 1} / {items.length}
                </span>
              )}
              {(embed || current.url) && (
                <a href={embed ?? current.url!} target="_blank" rel="noopener noreferrer">
                  {embed ? "View on Instagram" : "View original"}
                </a>
              )}
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
