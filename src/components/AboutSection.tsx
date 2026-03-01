
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Briefcase, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAboutData } from "@/hooks/useStrapi";

const STRAPI_URL = 'http://localhost:1337';

interface AboutData {
  id: number;
  biography: string;
  certifications: string;
  education: string;
  projects_completed: string;
  clients_served: string;
  profile_image?: {
    url: string;
  };
  gallery_images?: {
    id: number;
    url: string;
  }[];
}

export function AboutSection() {
  const { t } = useLanguage();
  const { data: aboutData, loading, error } = useAboutData();

  const about = aboutData[0] as unknown as AboutData | undefined;

  // Loading state
  if (loading) {
    return (
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback content or empty if error
  const content = (error || !about) ? {
    biography: t('experience_description'),
    certifications: t('certifications_list'),
    education: t('education_details'),
    projects_completed: t('projects_count'),
    clients_served: t('clients_type'),
    profile_image: null,
    gallery_images: []
  } : about;

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-muted/50">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex flex-col gap-16 lg:flex-row items-center">
          <div className="flex-1 space-y-8 animate-slide-up">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                {t('about_title')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold font-heading text-foreground tracking-tight">
              {t('specialist_in')} <span className="text-primary">{t('engineering')}</span> {t('and')} <span className="text-accent">{t('logistics')}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.biography}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="glass-card p-5 group hover:border-primary/50 transition-colors">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <Award className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{t('certifications')}</h4>
                    <p className="text-sm text-muted-foreground leading-snug">{content.certifications || t('certifications_list')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 group hover:border-primary/50 transition-colors">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <GraduationCap className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{t('education')}</h4>
                    <p className="text-sm text-muted-foreground leading-snug">{content.education || t('education_details')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 group hover:border-primary/50 transition-colors">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <Briefcase className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{t('projects')}</h4>
                    <p className="text-sm text-muted-foreground leading-snug">{content.projects_completed} {t('projects_completed')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 group hover:border-primary/50 transition-colors">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <Users className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{t('clients')}</h4>
                    <p className="text-sm text-muted-foreground leading-snug">{content.clients_served ? `${content.clients_served} ${t('clients_served')}` : t('clients_type')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button asChild className="group rounded-full px-8 h-12 shadow-lg shadow-primary/20 hover:scale-105 transition-transform" size="lg">
                <Link to="/sobre">
                  {t('learn_more')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 animate-scale-in">
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              {content.profile_image ? (
                <img
                  src={`${STRAPI_URL}${content.profile_image.url}`}
                  alt="Renato Santos"
                  className="w-full h-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <img
                  src="https://cdn.prod.website-files.com/6468316c421de37f67128485/67236c500cfae485f1d98256_o-que-e-logistica-automatizada.jpg"
                  alt={t('engineering_production')}
                  className="w-full h-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
              )}
              {/* Gallery Image 1 Placeholder if missing */}
              <img
                src={content.gallery_images?.[0]?.url
                  ? `${STRAPI_URL}${content.gallery_images[0].url}`
                  : "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                alt={t('processes_optimization')}
                className="w-full h-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <img
                src={content.gallery_images?.[1]?.url
                  ? `${STRAPI_URL}${content.gallery_images[1].url}`
                  : "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                alt={t('logistics')}
                className="w-full h-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
              />
              <img
                src={content.gallery_images?.[2]?.url
                  ? `${STRAPI_URL}${content.gallery_images[2].url}`
                  : "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                alt={t('project_management')}
                className="w-full h-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
