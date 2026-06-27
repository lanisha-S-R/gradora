import clsx from 'clsx';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
              'rounded-2xl border p-4 transition',
              isCompleted && 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10',
              isCurrent && 'border-indigo-200 bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/10',
              !isCompleted && !isCurrent && 'border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/50'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                  isCompleted && 'bg-emerald-500 text-white',
                  isCurrent && 'bg-indigo-600 text-white',
                  !isCompleted && !isCurrent && 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200'
                )}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{step}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
