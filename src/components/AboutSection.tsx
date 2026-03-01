
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
    <section id="about" className="py-32 lg:py-40 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] opacity-30 -z-10 animate-float animation-delay-400" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-20 -z-10 animate-float animation-delay-300" />

      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex flex-col gap-16 lg:gap-24 lg:flex-row items-center">
          
          {/* Left: Text Content */}
          <div className="flex-1 space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 dark:bg-secondary/5 border border-secondary/30 dark:border-secondary/20 text-secondary text-xs font-bold tracking-widest uppercase w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              {t('about_title')}
            </div>

            {/* Title */}
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-black text-foreground leading-tight">
              {t('specialist_in')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('engineering')}</span>
              <br />
              {t('and')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">{t('logistics')}</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
              {content.biography}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-8">
              <div className="glass-card p-6 group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm uppercase tracking-wide mb-1">{t('certifications')}</h4>
                    <p className="text-xs text-muted-foreground">{content.certifications || t('certifications_list')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 group hover:border-secondary/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 text-secondary group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm uppercase tracking-wide mb-1">{t('education')}</h4>
                    <p className="text-xs text-muted-foreground">{content.education || t('education_details')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 group hover:border-accent/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 text-accent group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm uppercase tracking-wide mb-1">{t('projects')}</h4>
                    <p className="text-xs text-muted-foreground">{content.projects_completed} {t('projects_completed')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm uppercase tracking-wide mb-1">{t('clients')}</h4>
                    <p className="text-xs text-muted-foreground">{content.clients_served ? `${content.clients_served} ${t('clients_served')}` : t('clients_type')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button asChild className="group rounded-lg px-8 h-12 font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl transition-all duration-300" size="lg">
                <Link to="/sobre">
                  {t('learn_more')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Gallery Grid */}
          <div className="flex-1 hidden lg:grid grid-cols-2 gap-4 md:gap-6 animate-fade-in-up animation-delay-200">
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              {content.profile_image ? (
                <img
                  src={`${STRAPI_URL}${content.profile_image.url}`}
                  alt="Renato Santos"
                  className="w-full h-auto rounded-xl shadow-xl hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-500 object-cover aspect-square"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-muted to-muted/50 rounded-xl shadow-xl flex items-center justify-center">
                  <Award className="h-12 w-12 text-muted-foreground/30" />
                </div>
              )}
              <img
                src={content.gallery_images?.[0]?.url
                  ? `${STRAPI_URL}${content.gallery_images[0].url}`
                  : "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                alt={t('processes_optimization')}
                className="w-full h-auto rounded-xl shadow-xl hover:shadow-2xl hover:shadow-secondary/20 hover:scale-[1.02] transition-all duration-500 object-cover aspect-square"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <img
                src={content.gallery_images?.[1]?.url
                  ? `${STRAPI_URL}${content.gallery_images[1].url}`
                  : "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                alt={t('logistics')}
                className="w-full h-auto rounded-xl shadow-xl hover:shadow-2xl hover:shadow-accent/20 hover:scale-[1.02] transition-all duration-500 object-cover aspect-square"
                loading="lazy"
              />
              <img
                src={content.gallery_images?.[2]?.url
                  ? `${STRAPI_URL}${content.gallery_images[2].url}`
                  : "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                alt={t('project_management')}
                className="w-full h-auto rounded-xl shadow-xl hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-500 object-cover aspect-square"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
