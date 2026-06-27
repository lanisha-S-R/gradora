import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-white/50 bg-white/60 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/60"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2 text-white shadow-lg shadow-indigo-500/30">
            <GraduationCap size={20} />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">GRADORA</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Academic Intelligence</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <NavLink to="/app/dashboard" className="hidden sm:block">
            <Button className="gap-2">
              Calculate GPA
              <ArrowRight size={16} />
            </Button>
          </NavLink>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-2xl border border-white/60 bg-white/70 p-2.5 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/60 bg-white/90 px-3 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 md:hidden">
          <div className="flex items-center justify-between pb-3">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Explore GRADORA</span>
            <ThemeToggle />
          </div>
          <div className="space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
            <NavLink
              to="/app/dashboard"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Calculate GPA
              <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>
      )}
    </motion.header>
  );
}
