import { Education } from '@/types';

export const educationData: Education = [
  {
    id: 'btech-computer-engineering',
    institution: 'Jagdamba College of Engineering and Technology, Yavatmal',
    degree: 'B.Tech – Computer Engineering',
    field: 'Computer Engineering',
    duration: '2024–2028',
    status: '3rd Year, 5th Semester',
    score: 'CGPA: 7.9 (2nd Year)',
    isPrimary: true,
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'Database Management Systems (DBMS)',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Theory of Computation',
      'Web Technologies',
    ],
    focusAreas: [
      'Python & Software Development',
      'Full-Stack Web Engineering',
      'Database Architecture (MySQL)',
      'Machine Learning & AI Integration',
    ],
  },
  {
    id: 'hsc-rural-institute',
    institution: 'Rural Institute, Amravati',
    degree: 'HSC',
    field: 'Higher Secondary Certificate',
    score: '12th Percentage: 60.33%',
    isPrimary: false,
  },
  {
    id: 'ssc-rathi-vidyalaya',
    institution: 'Shri Ganeshdas Rathi Vidyalaya, Amravati',
    degree: 'SSC',
    field: 'Secondary School Certificate',
    score: '10th Percentage: 73.60%',
    isPrimary: false,
  },
];

