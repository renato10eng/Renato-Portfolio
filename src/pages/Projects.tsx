import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useProjectsData } from "@/hooks/useStrapi";
import { projects as staticProjects } from "@/data/projects";

const Projects = () => {
  // Estados para filtro de categoria e busca
  const [filter, setFilter] = useState<"todos" | "engenharia" | "logistica">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { language, t } = useLanguage();

  // Fetch projects from Strapi
  const { data: rawProjectsData, loading, error } = useProjectsData({
    locale: language === 'en' ? 'en' : 'pt-BR',
    sort: ['order:asc', 'publishedAt:desc']
  });

  // Combine Strapi data with static "In Progress" / "Planned" projects for demonstration
  const strapiProjects = rawProjectsData as unknown as Project[] || [];
  const strategicStaticProjects = staticProjects.filter(p => p.status === 'in-progress' || p.status === 'planned');
  const projectsData = [...strapiProjects, ...strategicStaticProjects];

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!projectsData) return;

    const results = projectsData.filter(project => {
      // 1. Filter by Category (Engineering vs Logistics)
      let categoryMatch = true;
      if (filter === "engenharia") {
        categoryMatch = ['frontend', 'backend', 'fullstack'].includes(project.category);
      } else if (filter === "logistica") {
        categoryMatch = ['mobile', 'other'].includes(project.category);
      }
      // 'todos' matches everything

      // 2. Filter by Search Query
      let searchMatch = true;
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const title = project.title.toLowerCase();
        const description = project.description.toLowerCase();
        const techs = project.technologies?.map(t => t.name.toLowerCase()) || [];

        searchMatch = (
          title.includes(query) ||
          description.includes(query) ||
          techs.some(tag => tag.includes(query))
        );
      }

      return categoryMatch && searchMatch;
    });

    setFilteredProjects(results);

  }, [projectsData, filter, searchQuery]);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 pt-36 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute bottom-10 right-[10%] w-48 h-48 rounded-full bg-white/5"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 font-heading text-white">{t('my_projects')}</h1>
            <p className="text-xl text-white/90">
              {t('projects_description')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="glass-card rounded-2xl p-6 mb-12 animate-fade-in delay-100">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search_projects')}
                  className="pl-10 w-full bg-background/50 border-primary/20 focus:border-primary rounded-xl h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Button
                  variant={filter === "todos" ? "default" : "outline"}
                  onClick={() => setFilter("todos")}
                  size="sm"
                  className="rounded-full px-6 transition-all"
                >
                  {t('all_projects')}
                </Button>
                <Button
                  variant={filter === "engenharia" ? "default" : "outline"}
                  onClick={() => setFilter("engenharia")}
                  size="sm"
                  className="rounded-full px-6 transition-all"
                >
                  {t('engineering')}
                </Button>
                <Button
                  variant={filter === "logistica" ? "default" : "outline"}
                  onClick={() => setFilter("logistica")}
                  size="sm"
                  className="rounded-full px-6 transition-all"
                >
                  {t('logistics')}
                </Button>
              </div>
            </div>

            {searchQuery && (
              <div className="flex items-center gap-2 mt-4 ml-1">
                <span className="text-sm text-muted-foreground">
                  {t('searching_for')}: <span className="text-primary font-medium">"{searchQuery}"</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="space-y-20">
              {/* 1. Projetos Concluídos */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold font-heading">{t('completed_projects') || "Entregas & Produção"}</h2>
                  <div className="h-px bg-border flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.filter(p => !p.status || p.status === 'completed').map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              {/* 2. Em Desenvolvimento */}
              {filteredProjects.some(p => p.status === 'in-progress') && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse"></div>
                    <h2 className="text-3xl font-bold font-heading text-amber-500/90">{t('in_progress_projects') || "Em Desenvolvimento (WIP)"}</h2>
                    <div className="h-px bg-amber-500/20 flex-grow"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.filter(p => p.status === 'in-progress').map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Roadmap / Futuro */}
              {filteredProjects.some(p => p.status === 'planned') && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold font-heading text-muted-foreground">{t('future_projects') || "Roadmap Tecnológico"}</h2>
                    <div className="h-px bg-border flex-grow"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-90">
                    {filteredProjects.filter(p => p.status === 'planned').map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-2xl glass-card">
              <h3 className="text-2xl font-bold mb-3">{t('no_projects_found')}</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                {t('adjust_filters')}
              </p>
              <Button
                variant="outline"
                className="rounded-full px-8"
                onClick={() => {
                  setSearchQuery("");
                  setFilter("todos");
                }}
              >
                {t('clear_filters')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
