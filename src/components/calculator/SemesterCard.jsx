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
      <Card className={`p-5 transition ${selected ? 'ring-2 ring-indigo-500' : ''}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">{semester.name}</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {semester.subjects.length} subjects
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-3 text-white">
            <BookText size={20} />
          </div>
        </div>
      </Card>
    </motion.button>
  );
}
