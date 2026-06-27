import { DEPARTMENT, REGULATION } from './constants';

export const curriculum = {
  department: DEPARTMENT,
  regulation: REGULATION,
  semesters: [
    {
      id: 1,
      key: 'semester-1',
      name: 'Semester I',
      subjects: [
        { code: '24GE101', name: 'Heritage of Tamils', credit: 1 },
        { code: '24MA101', name: 'Matrices and Calculus', credit: 4 },
        { code: '24EN101', name: 'English for Engineers', credit: 2.5 },
        { code: '24PH101', name: 'Engineering Physics', credit: 4 },
        { code: '24CY101', name: 'Engineering Chemistry', credit: 4 },
        { code: '24ME201', name: 'Engineering Graphics and Design', credit: 3 },
        { code: '24CS201', name: 'Programming for Problem Solving using C', credit: 4 },
      ],
    },
    {
      id: 2,
      key: 'semester-2',
      name: 'Semester II',
      subjects: [
        { code: '24GE201', name: 'Tamil and Technology', credit: 1 },
        { code: '24MA201', name: 'Complex Variables and Transforms', credit: 4 },
        { code: '24EC302', name: 'Digital Logic Circuits and Design', credit: 4 },
        { code: '24EE204', name: 'Basics of Electrical and Electronics Engineering', credit: 4 },
        { code: '24EE404', name: 'IoT - Sensors and Devices', credit: 4 },
        { code: '24CS331', name: 'Programming using Python', credit: 1.5 },
        { code: '24GE231', name: 'Workshop Practices', credit: 1.5 },
        { code: '24EN201', name: 'Presentation and Language Skills Laboratory', credit: 1.5 },
      ],
    },
    {
      id: 3,
      key: 'semester-3',
      name: 'Semester III',
      subjects: [
        { code: '24MA301', name: 'Probability Random Process and Statistics', credit: 4 },
        { code: '24AI301', name: 'Operating Systems and Cloud Basics', credit: 3 },
        { code: '24AI302', name: 'Artificial Intelligence', credit: 4 },
        { code: '24AI303', name: 'Data Management and Database Management', credit: 4 },
        { code: '24CS301', name: 'Data Structures and Algorithms', credit: 4 },
        { code: '24CS302', name: 'Object Oriented Programming using Java', credit: 4 },
        { code: '24AI351', name: 'Mini Project I', credit: 1 },
      ],
    },
    {
      id: 4,
      key: 'semester-4',
      name: 'Semester IV',
      subjects: [
        { code: '24MA401', name: 'Discrete Mathematics', credit: 3 },
        { code: '24AI401', name: 'Data Engineering', credit: 3 },
        { code: '24CY401', name: 'Environmental Science', credit: 2 },
        { code: '24AI402', name: 'Optimization Techniques for AI', credit: 3 },
        { code: '24AI403', name: 'Foundations of Machine Learning', credit: 4 },
        { code: '24CS403', name: 'Computer Networks', credit: 3 },
        { code: '24AI404', name: 'Algorithms for Data Science', credit: 4 },
        { code: '24AI451', name: 'Mini Project II', credit: 1 },
        { code: '24EN451', name: 'Soft Skills Development', credit: 1 },
      ],
    },
  ],
};

export const getSemesterById = (semesterId) =>
  curriculum.semesters.find((semester) => semester.id === Number(semesterId));

