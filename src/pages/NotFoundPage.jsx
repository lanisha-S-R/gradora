import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="max-w-xl p-6 text-center sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
          <Compass size={24} />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          The page you are looking for has drifted out of your academic route. Return to the dashboard to continue.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/app/dashboard">
            <Button className="gap-2">
              <ArrowLeft size={16} />
              Back to dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
