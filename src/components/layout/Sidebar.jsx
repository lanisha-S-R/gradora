import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Calculator,
  GraduationCap,
  History,
  Info,
  LayoutDashboard,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import ThemeToggle from '../common/ThemeToggle';

const navItems = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Calculate GPA', to: '/app/calculator', icon: Calculator },
  { label: 'Semester History', to: '/app/history', icon: History },
  { label: 'Analytics', to: '/app/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/app/settings', icon: Settings },
  { label: 'About', to: '/app/about', icon: Info },
];

function SidebarContent({ closeSidebar, user, onSignOut }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2 text-white">
            <GraduationCap size={20} />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">GRADORA</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">R2024</div>
          </div>
        </div>
        <button
          onClick={closeSidebar}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 px-2 sm:px-3">
        <div className="space-y-2">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="border-t border-white/50 px-4 py-4 sm:px-5 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Comfortable night view</div>
          </div>
          <ThemeToggle />
        </div>
        {user && (
          <button
            type="button"
            onClick={onSignOut}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/60 bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 dark:border-slate-700"
          >
            <LogOut size={16} />
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const { user, signOut } = useAuth();

  return (
    <>
      <aside className="hidden w-72 max-w-[85vw] border-r border-white/40 bg-white/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/40 lg:block">
        <SidebarContent closeSidebar={() => {}} user={user} onSignOut={signOut} />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-white/40 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 lg:hidden"
            >
              <SidebarContent closeSidebar={() => setSidebarOpen(false)} user={user} onSignOut={signOut} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
