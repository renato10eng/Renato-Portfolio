import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, CheckCircle, Award, Users, BarChart2, Zap, Download, ExternalLink, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Project } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { projectContent, defaultContent } from "@/data/projectDetails"


const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Zap": return <Zap className="h-6 w-6 text-emerald-500" />;
    case "Users": return <Users className="h-6 w-6 text-red-500" />;
    case "BarChart2": return <BarChart2 className="h-6 w-6 text-blue-500" />;
    case "Award": return <Award className="h-6 w-6 text-purple-500" />;
    case "MapPin": return <MapPin className="h-6 w-6 text-blue-500" />;
    default: return <Zap className="h-6 w-6 text-emerald-500" />;
  }
};

// Get button variant based on category
const getButtonVariant = (category: string) => {
  switch (category) {
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
        <div className="container py-20 text-center flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="container py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
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
  const projectTags = language === 'en' && project.tagsEn ? project.tagsEn : project.tags || [];
  const projectDate = language === 'en' && project.dateEn ? project.dateEn : project.date;

  // Get project specific content or use default
  const projectSpecificContent = projectContent[project.id as keyof typeof projectContent];
  const content = projectSpecificContent
    ? (language === 'en' ? projectSpecificContent.en : projectSpecificContent.pt)
    : (language === 'en' ? defaultContent.en : defaultContent.pt);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
        </div>

        <div className="container-padding max-w-7xl mx-auto relative z-10">
          <Link to="/projetos" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors hover:-translate-x-1 duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back_to_projects')}
          </Link>

          <div className="mt-2 animate-fade-in">
            <div className="flex flex-wrap gap-2 mb-6">
              {projectTags.map((tag, index) => (
                <Badge key={index} className="bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-sm px-3 py-1">
                  <Tag className="mr-1.5 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">{projectTitle}</h1>

            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              {projectDescription}
            </p>

            <div className="flex items-center mt-8 text-white/80 font-medium">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{projectDate}</span>
            </div>

            {project.status === 'in-progress' && (
              <div className="mt-8 bg-amber-500/20 border border-amber-500/50 rounded-xl p-4 backdrop-blur-sm animate-fade-in flex items-center gap-4 max-w-2xl">
                <div className="p-2 bg-amber-500/20 rounded-full shrink-0">
                  <Zap className="h-6 w-6 text-amber-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-100 mb-1">{language === 'en' ? 'Project Under Active Development' : 'Projeto em Desenvolvimento Ativo'}</h3>
                  <p className="text-sm text-amber-200/80">
                    {language === 'en'
                      ? 'This project is currently being built. Metrics and methodology are subject to change.'
                      : 'Este projeto está sendo construído neste momento. Métricas e metodologia estão sujeitas a alterações.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Main Content */}
      <section className="py-20 bg-background">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12 animate-slide-up">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 border border-border/50">
                <img
                  src={project.image}
                  alt={projectTitle}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold font-heading mb-4 text-foreground">{t('overview')}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {content.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      {t('challenges')}
                    </h3>
                    <ul className="space-y-3">
                      {content.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start text-muted-foreground">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      {t('solutions')}
                    </h3>
                    <ul className="space-y-3">
                      {content.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start text-muted-foreground">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="py-8">
                  <h3 className="font-bold text-2xl font-heading mb-6 text-foreground">{t('methodology')}</h3>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    {content.methodology}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="glass-card p-4 text-center group hover:border-primary/50 transition-colors">
                      <div className="font-bold text-primary mb-2 text-lg">{t('define')}</div>
                      <div className="text-xs text-muted-foreground">{t('defineDetail')}</div>
                    </div>
                    <div className="glass-card p-4 text-center group hover:border-primary/50 transition-colors">
                      <div className="font-bold text-primary mb-2 text-lg">{t('measure')}</div>
                      <div className="text-xs text-muted-foreground">{t('measureDetail')}</div>
                    </div>
                    <div className="glass-card p-4 text-center group hover:border-primary/50 transition-colors">
                      <div className="font-bold text-primary mb-2 text-lg">{t('analyze')}</div>
                      <div className="text-xs text-muted-foreground">{t('analyzeDetail')}</div>
                    </div>
                    <div className="glass-card p-4 text-center group hover:border-primary/50 transition-colors">
                      <div className="font-bold text-primary mb-2 text-lg">{t('implement')}</div>
                      <div className="text-xs text-muted-foreground">{t('implementDetail')}</div>
                    </div>
                    <div className="glass-card p-4 text-center group hover:border-primary/50 transition-colors">
                      <div className="font-bold text-primary mb-2 text-lg">{t('control')}</div>
                      <div className="text-xs text-muted-foreground">{t('controlDetail')}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-10">
                  <h3 className="font-bold text-2xl font-heading mb-8 text-foreground">{t('results')}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center gap-5 glass-card p-5">
                        <div className={`
                          ${metric.icon === 'Zap' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                            metric.icon === 'Users' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                              metric.icon === 'BarChart2' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                metric.icon === 'MapPin' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                  'bg-purple-100 text-purple-600 dark:bg-purple-900/30'} 
                          p-4 rounded-full transition-transform hover:scale-110 duration-300`}>
                          {getIconComponent(metric.icon)}
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-foreground tracking-tight">{metric.value}</div>
                          <div className="text-muted-foreground font-medium">{metric.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 animate-slide-up animation-delay-200">
              <div className="glass-card p-6 md:p-8 space-y-6 sticky top-24">
                <h3 className="font-bold text-xl font-heading text-foreground">{t('project_detail')}</h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-border/50 pb-3">
                    <span className="text-muted-foreground">{t('client_detail')}:</span>
                    <span className="font-semibold text-foreground">{content.details.client}</span>
                  </div>

                  <div className="flex justify-between border-b border-border/50 pb-3">
                    <span className="text-muted-foreground">{t('category_detail')}:</span>
                    <span className="font-semibold text-foreground">{language === 'en' ? content.details.category.replace('Engenharia', 'Engineering').replace('Logística', 'Logistics') : content.details.category}</span>
                  </div>

                  <div className="flex justify-between border-b border-border/50 pb-3">
                    <span className="text-muted-foreground">{t('duration_detail')}:</span>
                    <span className="font-semibold text-foreground">{content.details.duration}</span>
                  </div>

                  <div className="flex justify-between border-b border-border/50 pb-3">
                    <span className="text-muted-foreground">{t('location_detail')}:</span>
                    <span className="font-semibold text-foreground">{content.details.location}</span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-muted-foreground">{t('completion_detail')}:</span>
                    <span className="font-semibold text-foreground">{content.details.completion}</span>
                  </div>
                </div>

                {/* External URL button */}
                <div className="pt-4 space-y-3">
                  <Button
                    variant={getButtonVariant(project.category)}
                    className="w-full gap-2 font-bold shadow-lg shadow-primary/20 h-12 rounded-xl"
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

                  <Button className="w-full gap-2 h-12 rounded-xl" variant="outline" asChild>
                    <a href=" " download>
                      <Download className="h-4 w-4" />
                      {t('download_case')}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="glass-card p-6 md:p-8">
                <h3 className="font-bold text-xl font-heading mb-4 text-foreground">{t('used_tech')}</h3>

                <div className="flex flex-wrap gap-2">
                  {content.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground border-0 px-3 py-1.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 md:p-8">
                <h3 className="font-bold text-xl font-heading mb-4 text-foreground">{t('project_team')}</h3>

                <ul className="space-y-4">
                  {project.id === 10 ? (
                    // Show only Renato for Modais de Transporte project
                    <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        RP
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Renato Santos</div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {language === 'en' ? 'Project Coordinator and Creator' : 'Coordenador e Criador do Projeto'}
                        </div>
                      </div>
                    </li>
                  ) : (
                    // For other projects, show full team
                    <>
                      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          RP
                        </div>
                        <div>
                          <div className="font-bold text-foreground">Renato</div>
                          <div className="text-xs text-muted-foreground font-medium">{language === 'en' ? 'Project Manager' : 'Gerente de Projeto'}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                          MS
                        </div>
                        <div>
                          <div className="font-bold text-foreground">Marina Silva</div>
                          <div className="text-xs text-muted-foreground font-medium">{language === 'en' ? 'Automation Engineer' : 'Engenheira de Automação'}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                          RC
                        </div>
                        <div>
                          <div className="font-bold text-foreground">Rafael Costa</div>
                          <div className="text-xs text-muted-foreground font-medium">{language === 'en' ? 'IoT Specialist' : 'Especialista em IoT'}</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          LP
                        </div>
                        <div>
                          <div className="font-bold text-foreground">Luiz Pereira</div>
                          <div className="text-xs text-muted-foreground font-medium">{language === 'en' ? 'Data Analyst' : 'Analista de Dados'}</div>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/10">
                <h3 className="font-bold text-lg mb-2 font-heading text-foreground">{t('need_project')}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {t('contact_help')}
                </p>
                <Button asChild className="w-full rounded-xl shadow-md">
                  <Link to="/contato">
                    {t('contact_me')}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
