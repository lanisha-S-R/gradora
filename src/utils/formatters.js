export function formatNumber(value, digits = 2) {
  return Number(value || 0).toFixed(digits);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function initials(text) {
  return text
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
