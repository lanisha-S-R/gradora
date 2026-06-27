export default function LoadingSkeleton({ className = 'h-24 w-full' }) {
  return (
    <div className={`animate-pulse rounded-[24px] bg-slate-200/70 dark:bg-slate-800 ${className}`} />
  );
}
