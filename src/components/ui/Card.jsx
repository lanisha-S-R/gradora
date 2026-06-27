import clsx from 'clsx';

export default function Card({ children, className }) {
  return (
    <div
      className={clsx(
        'glass card-shadow rounded-[24px] border border-white/50 dark:border-slate-800/80',
        className
      )}
    >
      {children}
    </div>
  );
}
