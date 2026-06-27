import { animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedCounter({ value, decimals = 2, className = '' }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Number(latest).toFixed(decimals));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: 'easeOut' });
    return controls.stop;
  }, [count, value]);

  return <span className={className}>{rounded.get()}</span>;
}
