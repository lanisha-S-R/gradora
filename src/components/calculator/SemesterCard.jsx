import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { BookText } from 'lucide-react';

export default function SemesterCard({ semester, selected, onSelect }) {
  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className="w-full text-left"
    >
      <Card className={`p-4 transition sm:p-5 ${selected ? 'ring-2 ring-indigo-500' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">{semester.name}</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {semester.subjects.length} subjects
            </div>
          </div>
          <div className="shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-3 text-white">
            <BookText size={20} />
          </div>
        </div>
      </Card>
    </motion.button>
  );
}
