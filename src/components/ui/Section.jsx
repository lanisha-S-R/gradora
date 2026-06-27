export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {(title || subtitle) && (
        <div className="mb-10 max-w-2xl">
          {title && <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>}
          {subtitle && <p className="mt-3 text-slate-600 dark:text-slate-300">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
