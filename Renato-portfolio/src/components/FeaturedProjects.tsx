
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedProjects() {
  // Estado para filtro de categoria
  const [filter, setFilter] = useState<"todos" | "engenharia" | "logistica">("todos");
  const { t } = useLanguage();
  
  // Encontrar projetos destacados - Modais (id 10) e Automação (id 4)
  const modaisProject = projects.find(p => p.id === 10);
  const automacaoProject = projects.find(p => p.id === 4);
  const otimizacaoProject = projects.find(p => p.id === 1);
  
  // Projetos a serem exibidos com base no filtro
  const [projectsToDisplay, setProjectsToDisplay] = useState<Array<typeof projects[0]>>([]);
  
  useEffect(() => {
    let filteredProjects = [];
    
    if (filter === "todos") {
      // Priorizar Modais e Automação no filtro "todos"
      const priorityProjects = [
        modaisProject,
        automacaoProject,
        otimizacaoProject
      ].filter(Boolean);
      
      filteredProjects = priorityProjects.slice(0, 3);
    } 
    else if (filter === "engenharia") {
      // Filtrar projetos de engenharia
      filteredProjects = projects
        .filter(p => p.category === "engenharia" || p.category === "ambos")
        .slice(0, 3);
        
      // Se automação estiver nos resultados, colocá-lo em primeiro
      if (filteredProjects.some(p => p.id === 4)) {
        filteredProjects = [
          automacaoProject,
          ...filteredProjects.filter(p => p.id !== 4)
        ].slice(0, 3);
      }
    } 
    else if (filter === "logistica") {
      // Filtrar projetos de logística
      filteredProjects = projects
        .filter(p => p.category === "logistica" || p.category === "ambos")
        .slice(0, 3);
        
      // Se modais estiver nos resultados, colocá-lo em primeiro
      if (filteredProjects.some(p => p.id === 10)) {
        filteredProjects = [
          modaisProject,
          ...filteredProjects.filter(p => p.id !== 10)
        ].slice(0, 3);
      }
    }
    
    setProjectsToDisplay(filteredProjects);
  }, [filter]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="section-title mb-3 text-left">{t('featured_projects')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('featured_description')}
            </p>
          </div>
          
          <div className="flex justify-start md:justify-end gap-3 mt-6 md:mt-0">
            <Button 
              variant={filter === "todos" ? "default" : "outline"}
              onClick={() => setFilter("todos")}
              size="sm"
              className="rounded-full"
            >
              {t('all')}
            </Button>
            <Button 
              variant={filter === "engenharia" ? "default" : "outline"}
              onClick={() => setFilter("engenharia")}
              size="sm"
              className="rounded-full"
            >
              {t('engineering')}
            </Button>
            <Button 
              variant={filter === "logistica" ? "default" : "outline"}
              onClick={() => setFilter("logistica")}
              size="sm"
              className="rounded-full"
            >
              {t('logistics')}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {projectsToDisplay.map((project) => (
            <ProjectCard key={project?.id} project={project!} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild className="group rounded-full px-8" size="lg">
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
