import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const { setSidebarOpen } = useAppContext();

  return (
    <div className="min-h-screen overflow-x-hidden lg:flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-30 border-b border-white/40 bg-white/55 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/50 lg:hidden">
          <div className="flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-2xl border border-white/50 bg-white/70 p-2.5 dark:border-slate-700 dark:bg-slate-900/60"
            >
              <Menu size={18} />
            </button>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">GRADORA</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Academic Dashboard</div>
            </div>
          </div>
        </div>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
