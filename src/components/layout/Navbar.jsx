import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../ui/Button';

export default function Navbar() {
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2 text-white shadow-lg shadow-indigo-500/30">
            <GraduationCap size={20} />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">GRADORA</div>
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

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NavLink to="/app/dashboard">
            <Button className="gap-2">
              Calculate GPA
              <ArrowRight size={16} />
            </Button>
          </NavLink>
        </div>
      </div>
    </motion.header>
  );
}
