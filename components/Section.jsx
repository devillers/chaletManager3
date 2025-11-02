export function Section({ title, children, className = "" }) {
  return (
    <section className={`mx-auto max-w-5xl px-4 py-12 ${className}`}>
      <div className="space-y-6">
        {title ? <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2> : null}
        <div className="space-y-4 text-neutral-600">{children}</div>
      </div>
    </section>
  );
}
