export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      {(title || subtitle) && (
        <div className="mb-8 max-w-2xl sm:mb-10">
          {title && <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
