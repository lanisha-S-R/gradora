import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import WelcomePanel from '../components/dashboard/WelcomePanel';
import OverviewCards from '../components/dashboard/OverviewCards';
import AnalyticsPreview from '../components/dashboard/AnalyticsPreview';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Overview"
        description="Keep momentum visible with real-time GPA insights, saved semesters, and a polished daily view of your progress."
        action={
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            <Sparkles size={16} />
            Premium workflow ready
          </motion.div>
        }
      />

      <WelcomePanel />
      <OverviewCards />

      <div className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
        <AnalyticsPreview />
        <div className="space-y-6">
          <ActivityFeed />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
