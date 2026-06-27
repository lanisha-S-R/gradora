import { motion } from 'framer-motion';
import Card from '../ui/Card';

export default function StatCard({ title, value, icon: Icon, hint, accent = 'indigo', children }) {
  const accents = {
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-fuchsia-600',
    emerald: 'from-emerald-500 to-teal-600',
    amber: 'from-amber-400 to-orange-500',
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
            {hint && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{hint}</p>}
          </div>
          <div className={`rounded-2xl bg-gradient-to-br p-3 text-white ${accents[accent]}`}>
            <Icon size={20} />
          </div>
        </div>
        {children}
      </Card>
    </motion.div>
  );
}
