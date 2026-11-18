/** The circled ✕ used between the repeated "NON STOP" / "MAXIMUM EFFECT" words (same icon as the Contact page strip). */
export default function XMark({ className = "mq-x", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" />
    </svg>
  );
}
