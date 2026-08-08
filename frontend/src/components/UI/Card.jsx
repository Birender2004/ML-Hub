export default function Card({ className = "", ...props }) {
  return (
    <section
      className={[
        "rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-glow",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
