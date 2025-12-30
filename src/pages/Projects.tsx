
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

const Projects = () => {
  // Estados para filtro de categoria e busca
  const [filter, setFilter] = useState<"todos" | "frontend" | "backend" | "fullstack">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { language, t } = useLanguage();
  
  // Filtragem de projetos com base na categoria e busca
  const filteredProjects = projects
    .filter(project => {
      // Filtro por categoria
      if (filter !== "todos") {
        return project.category === filter || project.category === "ambos";
      }
      return true;
    })
    .filter(project => {
      // Filtro por busca
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        
        // Use o título e descrição apropriados com base no idioma
        const title = language === 'en' && project.titleEn ? project.titleEn.toLowerCase() : project.title.toLowerCase();
        const description = language === 'en' && project.descriptionEn ? project.descriptionEn.toLowerCase() : project.description.toLowerCase();
        const tags = language === 'en' && project.tagsEn ? project.tagsEn : project.tags;
        
        return (
          title.includes(query) ||
          description.includes(query) ||
          tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      return true;
    });

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-black text-white py-20 pt-36 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute bottom-10 right-[10%] w-48 h-48 rounded-full bg-white/5"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">{t('my_projects')}</h1>
            <p className="text-xl text-white/90">
              {t('projects_description')}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="bg-card rounded-xl shadow-sm border p-5 mb-10">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search_projects')}
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3 flex-wrap md:flex-nowrap">
                <Button 
                  variant="outline" 
                  size="icon"
                  className={cn(showFilters && "bg-muted")}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                
                <div className="flex gap-3 flex-wrap">
                  <Button 
                    variant={filter === "todos" ? "default" : "outline"}
                    onClick={() => setFilter("todos")}
                    size="sm"
                    className="rounded-full"
                  >
                    {t('all_projects')}
                  </Button>
                  <Button 
                    variant={filter === "frontend" ? "default" : "outline"}
                    onClick={() => setFilter("frontend")}
                    size="sm"
                    className="rounded-full"
                  >
                    Front-End
                  </Button>
                  <Button 
                    variant={filter === "backend" ? "default" : "outline"}
                    onClick={() => setFilter("backend")}
                    size="sm"
                    className="rounded-full"
                  >
                    Back-End
                  </Button>
                  <Button 
                    variant={filter === "fullstack" ? "default" : "outline"}
                    onClick={() => setFilter("fullstack")}
                    size="sm"
                    className="rounded-full"
                  >
                    Full-Stack
                  </Button>
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-5 pt-5 border-t grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                <div>
                  <h3 className="text-sm font-medium mb-3">{t('additional_filters')}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t('additional_filters_desc')}
                  </p>
                </div>
              </div>
            )}
            
            {searchQuery && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">
                  {t('searching_for')}: "{searchQuery}"
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5" 
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-xl">
              <h3 className="text-2xl font-medium mb-3">{t('no_projects_found')}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t('adjust_filters')}
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
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
