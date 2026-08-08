export default function Button({ className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-cyan-400 text-surface-950 hover:bg-cyan-300",
    secondary: "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
  };

  return (
    <button
      className={[
        "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant] || variants.primary,
        className,
      ].join(" ")}
      type="button"
      {...props}
    />
  );
}
