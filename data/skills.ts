import { Skill } from '@/types';

export const skillsData: Skill[] = [
  // Programming
  {
    name: 'Python',
    category: 'Programming',
    iconName: 'Terminal',
    description: 'Object-oriented programming, data processing, algorithm implementations, scripting, and backend development.',
    relatedProjects: ['ai-climate-twin-india'],
  },
  {
    name: 'C',
    category: 'Programming',
    iconName: 'Cpu',
    description: 'Low-level memory management, pointers, and foundational computer architecture concepts.',
    relatedProjects: [],
  },
  {
    name: 'C++',
    category: 'Programming',
    iconName: 'Code2',
    description: 'Standard Template Library (STL) data structures, object-oriented concepts, and computational efficiency.',
    relatedProjects: [],
  },
  {
    name: 'Java',
    category: 'Programming',
    iconName: 'Coffee',
    description: 'Core object-oriented principles, classes, interfaces, inheritance, and structured software design.',
    relatedProjects: [],
  },

  // Web Technologies
  {
    name: 'HTML',
    category: 'Web Technologies',
    iconName: 'Layout',
    description: 'Semantic document structure, web standards, form elements, and accessible interfaces.',
    relatedProjects: ['voting-portal', 'rentogo', 'smart-store-management', 'krushiscan'],
  },
  {
    name: 'CSS',
    category: 'Web Technologies',
    iconName: 'Palette',
    description: 'Responsive styling, Flexbox, CSS Grid layouts, custom properties, and modern interface aesthetics.',
    relatedProjects: ['voting-portal', 'rentogo', 'smart-store-management', 'krushiscan'],
  },
  {
    name: 'JavaScript',
    category: 'Web Technologies',
    iconName: 'FileCode',
    description: 'Core ES6+ syntax, asynchronous programming, DOM manipulation, event handling, and modern frontend logic.',
    relatedProjects: ['voting-portal', 'rentogo', 'smart-store-management', 'krushiscan', 'kabadiwala-connect'],
  },
  {
    name: 'React',
    category: 'Web Technologies',
    iconName: 'Atom',
    description: 'Component-driven user interfaces, state management, custom hooks, and dynamic web applications.',
    relatedProjects: ['rentogo', 'ai-climate-twin-india', 'krushiscan', 'kabadiwala-connect'],
  },

  // Database
  {
    name: 'MySQL',
    category: 'Database',
    iconName: 'Database',
    description: 'Relational database schema design, normalization, structured queries, table relations, and data persistence.',
    relatedProjects: ['voting-portal', 'smart-store-management', 'kabadiwala-connect'],
  },

  // Frameworks / AI
  {
    name: 'FastAPI',
    category: 'Frameworks / AI',
    iconName: 'Zap',
    description: 'High-performance asynchronous Python REST APIs, endpoint routing, data validation, and backend service development.',
    relatedProjects: ['ai-climate-twin-india'],
  },
  {
    name: 'TensorFlow',
    category: 'Frameworks / AI',
    iconName: 'Brain',
    description: 'Machine learning workflows, predictive model implementation, dataset integration, and inference execution.',
    relatedProjects: ['ai-climate-twin-india'],
  },

  // Tools / Platforms
  {
    name: 'Git',
    category: 'Tools / Platforms',
    iconName: 'GitBranch',
    description: 'Version control, repository management, commit tracking, and branching workflows.',
    relatedProjects: ['voting-portal', 'rentogo', 'smart-store-management', 'ai-climate-twin-india', 'krushiscan', 'kabadiwala-connect'],
  },
  {
    name: 'GitHub',
    category: 'Tools / Platforms',
    iconName: 'Github',
    description: 'Remote code hosting, repository management, collaboration workflows, and project documentation.',
    relatedProjects: ['voting-portal', 'rentogo', 'smart-store-management', 'ai-climate-twin-india', 'krushiscan', 'kabadiwala-connect'],
  },
  {
    name: 'VS Code',
    category: 'Tools / Platforms',
    iconName: 'MonitorCheck',
    description: 'Developer workspace configuration, debugging tools, extensions, and code editing.',
    relatedProjects: ['voting-portal', 'rentogo', 'smart-store-management', 'ai-climate-twin-india', 'krushiscan', 'kabadiwala-connect'],
  },
];

