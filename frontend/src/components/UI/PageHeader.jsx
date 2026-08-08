export default function PageHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-normal text-white">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
