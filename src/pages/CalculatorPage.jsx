import { useEffect, useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Stepper from '../components/calculator/Stepper';
import SemesterCard from '../components/calculator/SemesterCard';
import SubjectGradeRow from '../components/calculator/SubjectGradeRow';
import LiveResultsPanel from '../components/calculator/LiveResultsPanel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { calculateCGPA, calculateSemesterResult } from '../utils/calculations';

const steps = ['Choose Semester', 'Subjects Loaded', 'Select Grades', 'Live SGPA', 'Save Semester'];

export default function CalculatorPage() {
  const location = useLocation();
  const { curriculum, saveSemesterRecord, semesterRecords } = useAppContext();
  const [selectedSemesterId, setSelectedSemesterId] = useState(1);
  const [gradesMap, setGradesMap] = useState({});

  const selectedSemester = curriculum.semesters.find((sem) => sem.id === selectedSemesterId) ?? curriculum.semesters[0];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const semesterParam = params.get('semester');
    if (semesterParam) {
      setSelectedSemesterId(Number(semesterParam));
    }
  }, [location.search]);

  useEffect(() => {
    const existing = semesterRecords.find((record) => record.semesterId === selectedSemesterId);
    if (existing) {
      const map = Object.fromEntries(existing.subjects.map((subject) => [subject.code, subject.grade]));
      setGradesMap(map);
    } else {
      setGradesMap({});
    }
  }, [selectedSemesterId, semesterRecords]);

  const result = useMemo(
    () => calculateSemesterResult(selectedSemester.subjects, gradesMap),
    [selectedSemester, gradesMap]
  );

  const currentStep = useMemo(() => {
    if (!selectedSemesterId) return 0;
    if (selectedSemester.subjects.length && result.enteredCount === 0) return 1;
    if (result.enteredCount > 0 && !result.allGradesEntered) return 2;
    if (result.allGradesEntered) return 3;
    return 0;
  }, [selectedSemesterId, selectedSemester, result]);

  const handleGradeChange = (subjectCode, grade) => {
    setGradesMap((prev) => ({ ...prev, [subjectCode]: grade }));
  };

  const handleSave = () => {
    const recordsWithoutCurrent = semesterRecords.filter((item) => item.semesterId !== selectedSemesterId);
    const tempCurrent = {
      semesterId: selectedSemesterId,
      totalCredits: result.totalCredits,
      totalWeightedPoints: result.totalWeightedPoints,
      sgpa: result.sgpa,
    };
    const cgpaPreview = calculateCGPA([...recordsWithoutCurrent, tempCurrent]).cgpa;

    saveSemesterRecord(selectedSemesterId, {
      ...result,
      cgpaAtSave: cgpaPreview,
      subjects: result.rows,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calculate GPA"
        description="Choose a semester, let subjects auto-load, enter grades through dropdowns, and watch results update live."
        action={
          <Button onClick={handleSave} disabled={!result.allGradesEntered} className="gap-2">
            <Save size={16} />
            Save Semester
          </Button>
        }
      />

      <Stepper steps={steps} currentStep={currentStep} />

      <div className="grid gap-6 xl:grid-cols-[1.3fr,0.8fr]">
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Choose Semester</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {curriculum.semesters.map((semester) => (
                <SemesterCard
                  key={semester.id}
                  semester={semester}
                  selected={selectedSemesterId === semester.id}
                  onSelect={() => setSelectedSemesterId(semester.id)}
                />
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedSemester.name} Subjects</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Subjects, subject codes, and credits are loaded automatically.
            </p>

            <div className="mt-5 space-y-4">
              {selectedSemester.subjects.map((subject) => {
                const row = result.rows.find((item) => item.code === subject.code);
                return (
                  <SubjectGradeRow
                    key={subject.code}
                    subject={subject}
                    value={gradesMap[subject.code] || ''}
                    onChange={(grade) => handleGradeChange(subject.code, grade)}
                    point={row?.point || 0}
                    weightedPoints={row?.weightedPoints || 0}
                  />
                );
              })}
            </div>
          </Card>
        </div>

        <div>
          <LiveResultsPanel result={result} />
        </div>
      </div>
    </div>
  );
}
