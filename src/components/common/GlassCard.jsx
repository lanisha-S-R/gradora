import Card from '../ui/Card';

export default function GlassCard({ children, className }) {
  return <Card className={className}>{children}</Card>;
}
