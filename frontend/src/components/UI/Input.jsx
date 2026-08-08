export default function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "h-10 w-full rounded-lg border border-white/10 bg-surface-900 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
