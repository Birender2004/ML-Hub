export default function Loader() {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-300" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
      Loading
    </div>
  );
}
