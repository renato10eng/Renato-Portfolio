import { Button } from "@/components/ui/button";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProjectsData } from "@/hooks/useStrapi";

export function FeaturedProjects() {
  const [filter, setFilter] = useState<"todos" | "engenharia" | "logistica">("todos");
  const { t } = useLanguage();
  const { data: rawProjectsData, loading, error } = useProjectsData();
  const projectsData = rawProjectsData as unknown as Project[];

  const [projectsToDisplay, setProjectsToDisplay] = useState<Project[]>([]);

  useEffect(() => {
    if (loading || !projectsData) return;

    let filteredProjects = [];

    if (filter === "todos") {
      filteredProjects = projectsData
        .filter(p => p.featured)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .slice(0, 6);
    }
    else if (filter === "engenharia") {
      filteredProjects = projectsData
        .filter(p => ['frontend', 'backend', 'fullstack'].includes(p.category))
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .slice(0, 6);
    }
    else if (filter === "logistica") {
      filteredProjects = projectsData
        .filter(p => p.category === 'mobile' || p.category === 'other')
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .slice(0, 6);
    }

    setProjectsToDisplay(filteredProjects);
  }, [filter, projectsData, loading]);

  if (loading) {
    return (
      <section className="py-32 bg-background">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-muted border-t-primary"></div>
              </div>
              <p className="mt-4 text-muted-foreground">{t('loading')}...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !projectsData || projectsData.length === 0) {
    return (
      <section className="py-32 bg-background">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h2 className="text-5xl font-heading font-bold text-foreground">{t('featured_projects')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              {t('featured_description')}
            </p>
            <Button asChild className="group rounded-lg px-10 h-12 text-base shadow-xl shadow-primary/20 hover:shadow-2xl transition-all">
              <Link to="/projetos">
                {t('view_all_projects')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[150px] opacity-30 -z-10 animate-float animation-delay-300" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-20 -z-10 animate-float animation-delay-500" />

      <div className="container-padding max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 dark:bg-secondary/5 border border-secondary/30 dark:border-secondary/20 text-secondary text-xs font-bold tracking-widest uppercase w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            {t('featured_projects')}
          </div>

          <div className="max-w-3xl">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-black leading-tight mb-6 text-foreground">
              {t('featured_projects')}
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              Seleção dos meus projetos mais impactantes em engenharia e logística
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-16 animate-fade-in-up animation-delay-100">
          {[
            { value: "todos", label: t('all') },
            { value: "engenharia", label: t('engineering') },
            { value: "logistica", label: t('logistics') },
          ].map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              onClick={() => setFilter(option.value as typeof filter)}
              size="sm"
              className="rounded-lg px-6 h-10 font-semibold text-sm transition-all duration-300 border-white/10 dark:border-white/5"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 animate-fade-in-up animation-delay-200">
          {projectsToDisplay.length > 0 ? (
            projectsToDisplay.map((project, index) => (
              <div key={project.id} style={{ animation: `fade-in-up 0.6s ease-out forwards`, animationDelay: `${100 + index * 100}ms` }} className="opacity-0">
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-muted-foreground">{t('no_projects_found')}</p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-24 text-center animate-fade-in-up animation-delay-300">
          <Button 
            asChild 
            size="lg"
            className="group rounded-lg px-10 h-14 text-base font-semibold shadow-xl shadow-primary/30 dark:shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300"
          >
            <Link to="/projetos">
              {t('view_all_projects')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
