import HeroSection from '@/sections/hero/HeroSection';
import AboutSection from '@/sections/about/AboutSection';
import SkillsSection from '@/sections/skills/SkillsSection';
import ProjectsSection from '@/sections/projects/ProjectsSection';
import AchievementsSection from '@/sections/achievements/AchievementsSection';
import CertificatesSection from '@/sections/certificates/CertificatesSection';
import JourneySection from '@/sections/journey/JourneySection';
import EducationSection from '@/sections/education/EducationSection';
import ResumeSection from '@/sections/resume/ResumeSection';
import ContactSection from '@/sections/contact/ContactSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <CertificatesSection />
      <JourneySection />
      <EducationSection />
      <ResumeSection />
      <ContactSection />
    </div>
  );
}
