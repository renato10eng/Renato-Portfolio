
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { EngineeringFields } from "@/components/EngineeringFields";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ServicesSection } from "@/components/ServicesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { StatsSection } from "@/components/StatsSection";
import { ContactSection } from "@/components/ContactSection";
import { Layout } from "@/components/Layout";
import "@/styles/methodologyStyles.css";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <EngineeringFields />
      <FeaturedProjects />
      <StatsSection />
      <SkillsSection />
      <ServicesSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
