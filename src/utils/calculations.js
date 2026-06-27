import { GRADE_POINTS, PERFORMANCE_BADGES } from '../data/constants';

export function getGradePoint(grade) {
  return GRADE_POINTS[grade] ?? 0;
}

export function calculateSemesterResult(subjects, gradesMap) {
  const rows = subjects.map((subject) => {
    const grade = gradesMap[subject.code] || '';
    const point = getGradePoint(grade);
    const weightedPoints = point * subject.credit;
    const passed = !['RA', 'AB', ''].includes(grade);
    const earnedCredits = passed ? subject.credit : 0;

    return {
      ...subject,
      grade,
      point,
      weightedPoints,
      earnedCredits,
      passed,
    };
  });

  const totalCredits = rows.reduce((sum, row) => sum + row.credit, 0);
  const totalWeightedPoints = rows.reduce((sum, row) => sum + row.weightedPoints, 0);
  const earnedCredits = rows.reduce((sum, row) => sum + row.earnedCredits, 0);
  const enteredCount = rows.filter((row) => row.grade).length;
  const allGradesEntered = enteredCount === rows.length && rows.length > 0;
  const sgpa = totalCredits ? totalWeightedPoints / totalCredits : 0;
  const percentage = sgpa * 10;
  const averageGradePoint = rows.length ? totalWeightedPoints / totalCredits : 0;

  return {
    rows,
    totalCredits,
    totalWeightedPoints,
    earnedCredits,
    enteredCount,
    allGradesEntered,
    sgpa,
    percentage,
    averageGradePoint,
  };
}

export function calculateCGPA(savedSemesters) {
  if (!savedSemesters.length) {
    return {
      cgpa: 0,
      completedCredits: 0,
      completedSemesters: 0,
      totalWeightedPoints: 0,
      recentSemester: null,
      highestSemester: null,
      lowestSemester: null,
      averageGpa: 0,
    };
  }

  const totalWeightedPoints = savedSemesters.reduce(
    (sum, sem) => sum + sem.totalWeightedPoints,
    0
  );

  const completedCredits = savedSemesters.reduce(
    (sum, sem) => sum + sem.totalCredits,
    0
  );

  const cgpa = completedCredits ? totalWeightedPoints / completedCredits : 0;
  const sorted = [...savedSemesters].sort((a, b) => a.semesterId - b.semesterId);
  const byGpa = [...savedSemesters].sort((a, b) => b.sgpa - a.sgpa);

  return {
    cgpa,
    completedCredits,
    completedSemesters: savedSemesters.length,
    totalWeightedPoints,
    recentSemester: sorted[sorted.length - 1] ?? null,
    highestSemester: byGpa[0] ?? null,
    lowestSemester: byGpa[byGpa.length - 1] ?? null,
    averageGpa:
      savedSemesters.reduce((sum, sem) => sum + sem.sgpa, 0) / savedSemesters.length,
  };
}

export function getPerformanceBadge(score) {
  return PERFORMANCE_BADGES.find((badge) => score >= badge.min) || PERFORMANCE_BADGES.at(-1);
}

export function calculateTargetGpa(currentWeightedPoints, currentCredits, futureCredits, targetCgpa) {
  if (futureCredits <= 0) return null;
  const required = ((targetCgpa * (currentCredits + futureCredits)) - currentWeightedPoints) / futureCredits;
  return Math.max(0, Math.min(10, required));
}
