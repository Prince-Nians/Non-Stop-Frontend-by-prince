import { Fragment } from "react";

/** Renders text where "\n" is the desktop-only line break from the Figma design. */
export function Lines({ text, className = "br-desktop" }: { text?: string | null; className?: string }) {
  const parts = (text ?? "").split("\n");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && <br className={className} />}
          {p}
        </Fragment>
      ))}
    </>
  );
}

export function formatDate(iso?: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
