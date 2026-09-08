export interface Profile {
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  about: {
    lead: string;
    paragraphs: string[];
    highlights: { label: string; value: string }[];
  };
  contact: {
    phone: {
      display: string;
      value: string; // tel: link
    };
    email: {
      display: string;
      value: string; // mailto: link
    };
    linkedin: {
      display: string;
      url: string;
    };
    github: {
      display: string;
      url: string;
    };
  };
  resumeUrl: string;
}

export type SkillCategory = 'Programming' | 'Web Technologies' | 'Database' | 'Frameworks / AI' | 'Tools / Platforms';

export interface Skill {
  name: string;
  category: SkillCategory;
  iconName: string;
  description: string;
  relatedProjects: string[]; // project slugs
}

export type ProjectStatus = 'Completed' | 'In Progress' | 'Prototype' | 'Archived' | 'Hackathon Project' | string;
export type ProjectCategory = string;

export interface Project {
  title: string;
  subtitle?: string;
  slug: string;
  year?: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  gallery?: string[];
  githubUrl?: string | null; // only if real, else undefined/null
  liveUrl?: string | null;   // only if real, else undefined/null
  status: ProjectStatus;
  featured: boolean;
  features: string[];
  challenges?: string[];
  contributions?: string[];
  learnings: string[];
  architecture?: {
    summary: string;
    components: { name: string; role: string }[];
  };
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  image?: string;
  pdfUrl?: string;
  description: string;
  featured: boolean;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  organization: string;
  description: string;
  category: string;
  role?: string;
  relatedProjectSlug?: string;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  subtitle?: string;
  description: string;
  skillsAcquired: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  duration?: string;
  status?: string;
  score?: string;
  isPrimary?: boolean;
  coursework?: string[];
  focusAreas?: string[];
}

export type Education = EducationItem[];
