
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Briefcase, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="flex flex-col gap-12 lg:flex-row items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-block">
              <span className="bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 px-4 py-2 rounded-md text-sm font-medium">
                {t('about_title')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              {t('specialist_in')} <span className="text-primary">{t('engineering')}</span> {t('and')} <span className="text-secondary">{t('logistics')}</span>
            </h2>
            <p className="text-muted-foreground">
              {t('experience_description')}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-center">
                <div className="bg-primary-50 dark:bg-primary-900/50 p-3 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('certifications')}</h4>
                  <p className="text-sm text-muted-foreground">{t('certifications_list')}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-primary-50 dark:bg-primary-900/50 p-3 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('education')}</h4>
                  <p className="text-sm text-muted-foreground">{t('education_details')}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-primary-50 dark:bg-primary-900/50 p-3 rounded-full">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('projects')}</h4>
                  <p className="text-sm text-muted-foreground">{t('projects_count')}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-primary-50 dark:bg-primary-900/50 p-3 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('clients')}</h4>
                  <p className="text-sm text-muted-foreground">{t('clients_type')}</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button asChild className="group">
                <Link to="/sobre">
                  {t('learn_more')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-6 animate-fade-in">
            <div className="space-y-6">
              <img 
                src="https://cdn.prod.website-files.com/6468316c421de37f67128485/67236c500cfae485f1d98256_o-que-e-logistica-automatizada.jpg" 
                alt={t('engineering_production')}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt={t('processes_optimization')}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="pt-12 space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt={t('logistics')}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"  
                alt={t('project_management')}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
