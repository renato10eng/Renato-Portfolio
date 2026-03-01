
import { Button } from "@/components/ui/button";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProjectsData } from "@/hooks/useStrapi";

export function FeaturedProjects() {
  // Estado para filtro de categoria
  const [filter, setFilter] = useState<"todos" | "engenharia" | "logistica">("todos");
  const { t } = useLanguage();
  const { data: rawProjectsData, loading, error } = useProjectsData();
  const projectsData = rawProjectsData as unknown as Project[];

  // Projetos a serem exibidos com base no filtro
  const [projectsToDisplay, setProjectsToDisplay] = useState<Project[]>([]);

  useEffect(() => {
    if (loading || !projectsData) return;

    let filteredProjects = [];

    if (filter === "todos") {
      // Mostrar projetos destacados primeiro
      filteredProjects = projectsData
        .filter(p => p.featured)
        .sort((a, b) => a.order - b.order)
        .slice(0, 3);
    }
    else if (filter === "engenharia") {
      // Filtrar projetos de engenharia (frontend, backend, fullstack)
      filteredProjects = projectsData
        .filter(p => ['frontend', 'backend', 'fullstack'].includes(p.category))
        .sort((a, b) => a.order - b.order)
        .slice(0, 3);
    }
    else if (filter === "logistica") {
      // Filtrar projetos de logística (mobile, outros relacionados)
      filteredProjects = projectsData
        .filter(p => p.category === 'mobile' || p.category === 'other')
        .sort((a, b) => a.order - b.order)
        .slice(0, 3);
    }

    setProjectsToDisplay(filteredProjects);
  }, [filter, projectsData, loading]);

  if (loading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !projectsData || projectsData.length === 0) {
    // Fallback para projetos estáticos se não conseguir carregar do CMS
    return (
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-3">{t('featured_projects')}</h2>
            <p className="text-muted-foreground">
              {t('featured_description')}
            </p>
            <div className="mt-8">
              <Button asChild className="group rounded-full px-8" size="lg">
                <Link to="/projetos">
                  {t('view_all_projects')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
              {t('featured_projects')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('featured_description')}
            </p>
          </div>

          <div className="flex flex-wrap justify-start md:justify-end gap-3">
            <Button
              variant={filter === "todos" ? "default" : "outline"}
              onClick={() => setFilter("todos")}
              size="sm"
              className="rounded-full px-6 transition-all shadow-sm"
            >
              {t('all')}
            </Button>
            <Button
              variant={filter === "engenharia" ? "default" : "outline"}
              onClick={() => setFilter("engenharia")}
              size="sm"
              className="rounded-full px-6 transition-all shadow-sm"
            >
              {t('engineering')}
            </Button>
            <Button
              variant={filter === "logistica" ? "default" : "outline"}
              onClick={() => setFilter("logistica")}
              size="sm"
              className="rounded-full px-6 transition-all shadow-sm"
            >
              {t('logistics')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projectsToDisplay.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button asChild className="group rounded-full px-10 h-12 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform" size="lg">
            <Link to="/projetos">
              {t('view_all_projects')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
