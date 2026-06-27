export const APP_NAME = 'GRADORA';
export const DEPARTMENT = 'Artificial Intelligence and Data Science';
export const REGULATION = 'R2024';

export const GRADE_POINTS = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  RA: 0,
  AB: 0,
};

export const GRADE_OPTIONS = ['O', 'A+', 'A', 'B+', 'B', 'C', 'RA', 'AB'];

export const STORAGE_KEYS = {
  semesters: 'gradora_semesters',
  theme: 'gradora_theme',
  settings: 'gradora_settings',
};

export const PERFORMANCE_BADGES = [
  { min: 9, label: 'Outstanding', color: 'emerald' },
  { min: 8, label: 'Excellent', color: 'indigo' },
  { min: 7, label: 'Very Good', color: 'purple' },
  { min: 6, label: 'Good', color: 'amber' },
  { min: 5, label: 'Satisfactory', color: 'orange' },
  { min: 0, label: 'Needs Improvement', color: 'rose' },
];
