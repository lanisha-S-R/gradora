import { Download, History, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Move fast between calculation, history, and reporting.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Button onClick={() => navigate('/app/calculator')} className="gap-2">
          <PlusCircle size={16} />
          New Calculation
        </Button>
        <Button variant="secondary" onClick={() => navigate('/app/history')} className="gap-2">
          <History size={16} />
          View History
        </Button>
        <Button variant="secondary" onClick={() => navigate('/app/analytics')} className="gap-2">
          <Download size={16} />
          Analytics
        </Button>
      </div>
    </Card>
  );
}
