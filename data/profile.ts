import { Profile } from '@/types';
import { getAssetPath } from '@/lib/utils';

export const profileData: Profile = {
  name: 'ANAND MOHOD',
  title: 'Computer Engineering Student',
  tagline: 'Passionate About Building, Learning & Solving with Technology.',
  avatar: getAssetPath('/images/profile.jpg'),
  about: {
    lead: 'Computer Engineering student pursuing B.Tech with hands-on experience in Python, software development, databases, AI, and full-stack project development.',
    paragraphs: [
      'Built practical applications across voting, rental, retail, agriculture, climate-risk prediction, and recycling domains.',
      'Strong interest in Python and software development, with experience taking projects from concept and data sourcing through implementation and deployment. Seeking an internship to apply technical skills and gain industry experience.',
    ],
    highlights: [
      { label: 'Degree & Program', value: 'B.Tech – Computer Engineering' },
      { label: 'Current Status', value: '3rd Year, 5th Semester (2024–2028)' },
      { label: 'Academic Standing', value: 'CGPA: 7.9 (2nd Year)' },
      { label: 'Internship Goal', value: 'Seeking Software / Python Internship' },
    ],
  },
  contact: {
    phone: {
      display: '+91 7028393036',
      value: 'tel:+917028393036',
    },
    email: {
      display: 'officialanandmohod@gmail.com',
      value: 'mailto:officialanandmohod@gmail.com',
    },
    linkedin: {
      display: 'linkedin.com/in/anand-mohod-ab2a88428',
      url: 'https://www.linkedin.com/in/anand-mohod-ab2a88428',
    },
    github: {
      display: 'github.com/ANANDMOHOD17',
      url: 'https://github.com/ANANDMOHOD17',
    },
  },
  resumeUrl: '/resume',
};
