
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, CheckCircle, Award, Users, BarChart2, Zap, Download, ExternalLink, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Project } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { projectContent, defaultContent } from "@/data/projectDetails"


const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Zap": return <Zap className="h-6 w-6 text-green-500" />;
    case "Users": return <Users className="h-6 w-6 text-red-500" />;
    case "BarChart2": return <BarChart2 className="h-6 w-6 text-blue-500" />;
    case "Award": return <Award className="h-6 w-6 text-purple-500" />;
    case "MapPin": return <MapPin  className="h-6 w-6 text-blue-500" />;
    default: return <Zap className="h-6 w-6 text-green-500" />;
  }
};

// Get button variant based on category
const getButtonVariant = (category: string) => {
  switch(category) {
    case "engenharia":
      return "default"; // Blue for Engineering
    case "logistica":
      return "secondary"; // Original color for Logistics 
    case "ambos":
      return "outline"; // Outline for both
    default:
      return "default";
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();
  
  
  
  useEffect(() => {
    // Simular uma busca de projeto
    const projectId = parseInt(id || "0");
    const foundProject = projects.find(p => p.id === projectId);
    
    setTimeout(() => {
      setProject(foundProject || null);
      setLoading(false);
    }, 300);
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-8 bg-muted w-1/3 rounded"></div>
            <div className="h-4 bg-muted w-1/4 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!project) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{t('project_not_found')}</h1>
          <p className="text-muted-foreground mb-6">{t('project_removed')}</p>
          <Button asChild>
            <Link to="/projetos">{t('back_to_projects')}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Se chegou aqui, temos um projeto
  const projectTitle = language === 'en' && project.titleEn ? project.titleEn : project.title;
  const projectDescription = language === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
  const projectTags = language === 'en' && project.tagsEn ? project.tagsEn : project.tags;
  const projectDate = language === 'en' && project.dateEn ? project.dateEn : project.date;

  // Get project specific content or use default
  const projectSpecificContent = projectContent[project.id as keyof typeof projectContent];
  const content = projectSpecificContent 
    ? (language === 'en' ? projectSpecificContent.en : projectSpecificContent.pt) 
    : (language === 'en' ? defaultContent.en : defaultContent.pt);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-white/5"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="container relative z-10">
          <Link to="/projetos" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back_to_projects')}
          </Link>
          
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {projectTags.map((tag, index) => (
                <Badge key={index} className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{projectTitle}</h1>
            
            <p className="text-xl text-white/90 max-w-3xl">
              {projectDescription}
            </p>
            
            <div className="flex items-center mt-6 text-white/80">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{projectDate}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={project.image}  
                  alt={projectTitle}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t('overview')}</h2>
                <p className="text-muted-foreground">
                  {content.overview}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-4">{t('challenges')}</h3>
                    <ul className="space-y-3">
                      {content.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-4">{t('solutions')}</h3>
                    <ul className="space-y-3">
                      {content.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="py-8">
                  <h3 className="font-bold text-2xl mb-6">{t('methodology')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {content.methodology}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                    <div className="bg-primary-50 dark:bg-card p-4 rounded-lg text-center border border-primary/10">
                      <div className="methodology-step">{t('define')}</div>
                      <div className="methodology-step-detail">{t('defineDetail')}</div>
                    </div>
                    <div className="bg-primary-50 dark:bg-card p-4 rounded-lg text-center border border-primary/10">
                      <div className="methodology-step">{t('measure')}</div>
                      <div className="methodology-step-detail">{t('measureDetail')}</div>
                    </div>
                    <div className="bg-primary-50 dark:bg-card p-4 rounded-lg text-center border border-primary/10">
                      <div className="methodology-step">{t('analyze')}</div>
                      <div className="methodology-step-detail">{t('analyzeDetail')}</div>
                    </div>
                    <div className="bg-primary-50 dark:bg-card p-4 rounded-lg text-center border border-primary/10">
                      <div className="methodology-step">{t('implement')}</div>
                      <div className="methodology-step-detail">{t('implementDetail')}</div>
                    </div>
                    <div className="bg-primary-50 dark:bg-card p-4 rounded-lg text-center border border-primary/10">
                      <div className="methodology-step">{t('control')}</div>
                      <div className="methodology-step-detail">{t('controlDetail')}</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-8">
                  <h3 className="font-bold text-2xl mb-6">{t('results')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {content.metrics.map((metric, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`bg-${metric.icon === 'Zap' ? 'green' : metric.icon === 'Users' ? 'red' : metric.icon === 'BarChart2' ? 'blue' : metric.icon === 'MapPin' ? 'blue' : 'purple'}-100 dark:bg-${metric.icon === 'Zap' ? 'green' : metric.icon === 'Users' ? 'red' : metric.icon === 'BarChart2' ? 'blue' : metric.icon === 'MapPin' ? 'blue' : 'purple'}-900/20 p-3 rounded-full`}>
                          {getIconComponent(metric.icon)}
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{metric.value}</div>
                          <div className="text-muted-foreground">{metric.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-card rounded-xl border p-6 shadow-sm space-y-6">
                <h3 className="font-semibold text-lg">{t('project_detail')}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">{t('client_detail')}:</span>
                    <span className="font-medium">{content.details.client}</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">{t('category_detail')}:</span>
                    <span className="font-medium">{language === 'en' ? content.details.category.replace('Engenharia', 'Engineering').replace('Logística', 'Logistics') : content.details.category}</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">{t('duration_detail')}:</span>
                    <span className="font-medium">{content.details.duration}</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">{t('location_detail')}:</span>
                    <span className="font-medium">{content.details.location}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('completion_detail')}:</span>
                    <span className="font-medium">{content.details.completion}</span>
                  </div>
                </div>
                
                {/* External URL button */}
                <div className="pt-2 space-y-3">
                  <Button 
                    variant={getButtonVariant(project.category)} 
                    className="w-full gap-2" 
                    asChild
                  >
                    <a 
                      href={project.externalUrl || "#"} 
                      target={project.externalUrl?.startsWith('/') ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {project.id === 10 ? t('access_platform') : t('access_project')}
                    </a>
                  </Button>
                  
                  <Button className="w-full gap-2" variant="outline" asChild>
                    <a href=" " download>
                      <Download className="h-4 w-4" />
                      {t('download_case')}
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">{t('used_tech')}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {content.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary border-0">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">{t('project_team')}</h3>
                
                <ul className="space-y-4">
                  {project.id === 10 ? (
                    // Show only Renato for Modais de Transporte project
                    <li className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">RP</span>
                      </div>
                      <div>
                        <div className="font-medium">Renato Santos</div>
                        <div className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Project Coordinator and Creator' : 'Coordenador e Criador do Projeto'}
                        </div>
                      </div>
                    </li>
                  ) : (
                    // For other projects, show full team
                    <>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">RP</span>
                        </div>
                        <div>
                          <div className="font-medium">Renato</div>
                          <div className="text-xs text-muted-foreground">{language === 'en' ? 'Project Manager' : 'Gerente de Projeto'}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">MS</span>
                        </div>
                        <div>
                          <div className="font-medium">Marina Silva</div>
                          <div className="text-xs text-muted-foreground">{language === 'en' ? 'Automation Engineer' : 'Engenheira de Automação'}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-sm font-medium">RC</span>
                        </div>
                        <div>
                          <div className="font-medium">Rafael Costa</div>
                          <div className="text-xs text-muted-foreground">{language === 'en' ? 'IoT Specialist' : 'Especialista em IoT'}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">LP</span>
                        </div>
                        <div>
                          <div className="font-medium">Luiz Pereira</div>
                          <div className="text-xs text-muted-foreground">{language === 'en' ? 'Data Analyst' : 'Analista de Dados'}</div>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2 dark:text-black">{t('need_project')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('contact_help')}
                </p>
                <Button asChild className="w-full">
                  <Link to="/contato">
                    {t('contact_me')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
