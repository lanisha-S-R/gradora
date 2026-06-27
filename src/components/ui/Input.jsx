import clsx from 'clsx';

export default function Input({ label, className, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>}
      <input
        className={clsx(
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white',
          className
        )}
        {...props}
      />
    </label>
  );
}
