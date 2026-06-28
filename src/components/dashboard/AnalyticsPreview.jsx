import Card from '../ui/Card';
import { useSupabaseData } from '../../context/SupabaseDataContext';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from '../../utils/formatters';

export default function AnalyticsPreview() {
  const { semesterRecords } = useSupabaseData();

  const data = [...semesterRecords]
    .sort((a, b) => a.semesterId - b.semesterId)
    .map((item) => ({
      name: item.semesterName.replace('Semester ', 'S'),
      sgpa: Number(formatNumber(item.sgpa)),
      cgpa: Number(formatNumber(item.cgpaAtSave || item.sgpa)),
    }));

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">GPA Trend</h3>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="sgpaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Area type="monotone" dataKey="sgpa" stroke="#4f46e5" fill="url(#sgpaGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
