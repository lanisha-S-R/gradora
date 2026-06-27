import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle2, GraduationCap, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Instant real-time GPA',
      desc: 'SGPA, credits, percentage, and weighted points update immediately on every grade selection.',
    },
    {
      icon: ShieldCheck,
      title: 'Curriculum auto-loaded',
      desc: 'Subjects, codes, and credits are preloaded by semester for AI & Data Science under R2024.',
    },
    {
      icon: BarChart3,
      title: 'Premium analytics',
      desc: 'Track semester-wise GPA, CGPA trend, credit flow, and academic performance in clean visuals.',
    },
  ];

  const faqs = [
    ['Do I need to type subjects manually?', 'No. Subjects, codes, and credits load automatically once you choose a semester.'],
    ['Does it support dark mode?', 'Yes. The interface includes a polished dark mode across landing, dashboard, and analytics.'],
    ['Can I edit saved semesters later?', 'Yes. You can save, edit, delete, and reset semester records from history.'],
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-sm text-indigo-700 dark:border-indigo-500/30 dark:bg-slate-900/50 dark:text-indigo-300">
              <Sparkles size={16} />
              Personal academic dashboard for focused performance tracking
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Calculate smarter with <span className="gradient-text">GRADORA</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A premium academic dashboard that auto-loads your curriculum, lets you enter only grades,
              and transforms semester performance into live insights, clean history, and polished reports.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/app/dashboard">
                <Button size="lg" className="gap-2">
                  Calculate GPA
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" size="lg">Explore Features</Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Auto-loaded curriculum</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Live SGPA & CGPA</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Beautiful PDF reports</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <Card className="relative overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-emerald-500/10" />
              <div className="relative grid gap-4">
                <div className="floaty rounded-[24px] bg-white/80 p-5 dark:bg-slate-900/60">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Current CGPA</div>
                  <div className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">9.12</div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="floaty rounded-[24px] bg-white/80 p-5 dark:bg-slate-900/60">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Semester III</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">9.35</div>
                  </div>
                  <div className="floaty rounded-[24px] bg-white/80 p-5 dark:bg-slate-900/60">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Credits Earned</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">48.5</div>
                  </div>
                </div>
                <div className="rounded-[24px] bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
                  <div className="text-sm text-indigo-100">Real-time performance intelligence</div>
                  <div className="mt-2 text-2xl font-bold">Only enter grades. Everything else is automatic.</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Section
        id="features"
        title="Built like a premium SaaS product"
        subtitle="Designed for clarity, speed, and a polished academic workflow."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-6">
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-3 text-white">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="how-it-works"
        title="How it works"
        subtitle="A single wizard. No manual subject entry. No unnecessary friction."
      >
        <div className="grid gap-4 md:grid-cols-5">
          {['Choose Semester', 'Subjects Auto Loaded', 'Select Grades', 'Live SGPA', 'Save & Track'].map((step, index) => (
            <Card key={step} className="p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                {index + 1}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{step}</h3>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="testimonials"
        title="Why this feels different"
        subtitle="The interface is tuned for a focused personal academic workflow."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            'Everything updates instantly, so there is no extra calculate step.',
            'The visuals make academic performance feel understandable, not overwhelming.',
            'It feels closer to a productivity product than a student project.',
          ].map((text, index) => (
            <Card key={index} className="p-6">
              <div className="text-lg font-medium text-slate-900 dark:text-white">"{text}"</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        title="Frequently asked questions"
        subtitle="A few important details about how GRADORA works."
      >
        <div className="space-y-4">
          {faqs.map(([q, a]) => (
            <Card key={q} className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">{q}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{a}</p>
            </Card>
          ))}
        </div>
      </Section>

      <footer className="border-t border-white/50 py-10 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-600 sm:px-6 lg:flex-row lg:px-8 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <GraduationCap size={18} />
            <span>GRADORA - Personal Academic Dashboard</span>
          </div>
          <Link to="/app/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
