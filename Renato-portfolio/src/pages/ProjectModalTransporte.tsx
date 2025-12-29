import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle,
  Award,
  Users,
  BarChart2,
  Zap,
  Download,
  ExternalLink,
  ChevronRight,
  MapPin
} from "lucide-react";
import { useEffect, useState } from "react";
import { Project } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { projectContent, defaultContent } from "@/data/projectDetails";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Zap":
      return <Zap className="h-6 w-6 text-green-500" />;
    case "Users":
      return <Users className="h-6 w-6 text-red-500" />;
    case "BarChart2":
      return <BarChart2 className="h-6 w-6 text-blue-500" />;
    case "Award":
      return <Award className="h-6 w-6 text-purple-500" />;
    case "MapPin":
      return <MapPin className="h-6 w-6 text-blue-500" />;
    default:
      return <Zap className="h-6 w-6 text-green-500" />;
  }
};

const getButtonVariant = (category: string) => {
  switch (category) {
    case "engenharia":
      return "default"; // Azul para Engenharia
    case "logistica":
      return "secondary"; // Cor original para Logística 
    case "ambos":
      return "outline"; // Outline para ambos
    default:
      return "default";
  }
};

const ProjectModalTransporte = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Buscar o projeto pelo ID (nesse caso, espera-se que seja 10 para "Modal de Transporte")
    //const projectId = parseInt(id || "0");
    const foundProject = projects.find(p => p.id === 10);
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
          <h1 className="text-3xl font-bold mb-4">{t("project_not_found")}</h1>
          <p className="text-muted-foreground mb-6">{t("project_removed")}</p>
          <Button asChild>
            <Link to="/projetos">{t("back_to_projects")}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Variáveis para os textos do projeto, usando as versões em inglês caso estejam definidas
  const projectTitle =
    language === "en" && project.titleEn ? project.titleEn : project.title;
  const projectDescription =
    language === "en" && project.descriptionEn
      ? project.descriptionEn
      : project.description;
  const projectTags =
    language === "en" && project.tagsEn ? project.tagsEn : project.tags;
  const projectDate =
    language === "en" && project.dateEn ? project.dateEn : project.date;

  // Carrega o conteúdo específico do projeto (usando projectContent) ou conteúdo padrão
  const projectSpecificContent = projectContent[project.id as keyof typeof projectContent];
  const content = projectSpecificContent 
    ? (language === "en" ? projectSpecificContent.en : projectSpecificContent.pt)
    : (language === "en" ? defaultContent.en : defaultContent.pt);

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-secondary-300 to-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-white/5"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
        </div>

        <div className="container relative z-10">
          <Link
            to="/projetos"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("back_to_projects")}
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

            <p className="text-xl text-white/90 max-w-3xl">{projectDescription}</p>

            <div className="flex items-center mt-6 text-white/80">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{projectDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-12">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={project.image}
                  alt={projectTitle}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t("overview")}</h2>
                <p className="text-muted-foreground">{content.overview}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {/* Desafios / Objetivos */}
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-4">
                      {language === "en" ? "Project Objectives" : "Objetivos do Projeto"}
                    </h3>
                    <ul className="space-y-3">
                      {content.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Soluções / Recursos Implementados */}
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-4">
                      {language === "en" ? "Implemented Features" : "Recursos Implementados"}
                    </h3>
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

                {/* Seção: Modais de Transporte Analisados */}
                <div className="py-8">
                  <h3 className="font-bold text-2xl mb-6">
                    {language === "en" ? "Analyzed Transport Modes" : "Modais de Transporte Analisados"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === "en"
                      ? "Brazil uses five main transport modes, each with specific characteristics, advantages, and limitations. Their distribution varies significantly among states, reflecting each region's unique aspects."
                      : "O Brasil utiliza cinco principais modais de transporte, cada um com características, vantagens e limitações específicas. A distribuição destes modais varia significativamente entre os estados, refletindo as particularidades geográficas e econômicas de cada região."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-center border border-blue-100 dark:border-blue-900/30">
                      <div className="font-bold mb-1 text-blue-700 dark:text-blue-400">
                        {language === "en" ? "Road" : "Rodoviário"}
                      </div>
                      <div className="text-xs text-blue-600/70 dark:text-blue-400/70">
                        {language === "en"
                          ? "Main mode in Brazil"
                          : "Principal modal no Brasil"}
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg text-center border border-green-100 dark:border-green-900/30">
                      <div className="font-bold mb-1 text-green-700 dark:text-green-400">
                        {language === "en" ? "Rail" : "Ferroviário"}
                      </div>
                      <div className="text-xs text-green-600/70 dark:text-green-400/70">
                        {language === "en"
                          ? "High volumes & long distances"
                          : "Grandes volumes e distâncias"}
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg text-center border border-purple-100 dark:border-purple-900/30">
                      <div className="font-bold mb-1 text-purple-700 dark:text-purple-400">
                        {language === "en" ? "Water" : "Aquaviário"}
                      </div>
                      <div className="text-xs text-purple-600/70 dark:text-purple-400/70">
                        {language === "en"
                          ? "Fluvial & maritime"
                          : "Fluvial e marítimo"}
                      </div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg text-center border border-orange-100 dark:border-orange-900/30">
                      <div className="font-bold mb-1 text-orange-700 dark:text-orange-400">
                        {language === "en" ? "Air" : "Aéreo"}
                      </div>
                      <div className="text-xs text-orange-600/70 dark:text-orange-400/70">
                        {language === "en"
                          ? "High-value cargo"
                          : "Cargas de alto valor"}
                      </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg text-center border border-amber-100 dark:border-amber-900/30">
                      <div className="font-bold mb-1 text-amber-700 dark:text-amber-400">
                        {language === "en" ? "Pipeline" : "Dutoviário"}
                      </div>
                      <div className="text-xs text-amber-600/70 dark:text-amber-400/70">
                        {language === "en"
                          ? "Fluids & gases"
                          : "Fluidos e gases"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção: Métricas / Destaques */}
                <div className="border-t pt-8">
                  <h3 className="font-bold text-2xl mb-6">
                    {language === "en" ? "Analysis Highlights" : "Destaques da Análise"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {content.metrics.map((metric, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`bg-${
                          metric.icon === "Zap"
                            ? "green"
                            : metric.icon === "Users"
                            ? "red"
                            : metric.icon === "BarChart2"
                            ? "blue"
                            : metric.icon === "MapPin"
                            ? "blue"
                            : "purple"
                        }-100 dark:bg-${
                          metric.icon === "Zap"
                            ? "green"
                            : metric.icon === "Users"
                            ? "red"
                            : metric.icon === "BarChart2"
                            ? "blue"
                            : metric.icon === "MapPin"
                            ? "blue"
                            : "purple"
                        }-900/20 p-3 rounded-full`}>
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

            {/* Sidebar: Detalhes, Tecnologias, Equipe, etc. */}
            <div className="space-y-8">
              {/* Detalhes do Projeto */}
              <div className="bg-card rounded-xl border p-6 shadow-sm space-y-6">
                <h3 className="font-semibold text-lg">
                  {language === "en" ? "Project Details" : "Detalhes do Projeto"}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Client:" : "Cliente:"}
                    </span>
                    <span className="font-medium">{content.details.client}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Category:" : "Categoria:"}
                    </span>
                    <span className="font-medium">
                      {language === "en"
                        ? content.details.category.replace("Engenharia", "Engineering").replace("Logística", "Logistics")
                        : content.details.category}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Duration:" : "Duração:"}
                    </span>
                    <span className="font-medium">{content.details.duration}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Location:" : "Localização:"}
                    </span>
                    <span className="font-medium">{content.details.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Completion:" : "Conclusão:"}
                    </span>
                    <span className="font-medium">{content.details.completion}</span>
                  </div>
                </div>
                <div className="pt-2 space-y-3">
                  <Button
                    variant={getButtonVariant(project.category)}
                    className="w-full gap-2"
                    asChild
                  >
                    <Link
                      to="/modais-transporte"
                      target={project.externalUrl?.startsWith('/') ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {project.id === 10 ? (language === "en" ? "Access Interactive Platform" : "Acessar Plataforma Interativa") : (language === "en" ? "Access Project" : "Acessar Projeto")}
                    </Link>
                  </Button>
                  <Button className="w-full gap-2" variant="outline" asChild>
                    <a href=" " download>
                      <Download className="h-4 w-4" />
                      {language === "en" ? "Download Full Report" : "Download Relatório Completo"}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Tecnologias Utilizadas */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">
                  {language === "en" ? "Technologies Used" : "Tecnologias Utilizadas"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {content.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 hover:bg-primary/20 text-primary border-0"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Equipe / Coordenação do Projeto */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">
                  {language === "en" ? "Project Coordination" : "Coordenação do Projeto"}
                </h3>
                <ul className="space-y-4">
                  {project.id === 10 ? (
                    // Exibe apenas o coordenador específico para o projeto de Modais de Transporte
                    <li className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">RP</span>
                      </div>
                      <div>
                        <div className="font-medium">Renato Santos</div>
                        <div className="text-xs text-muted-foreground">
                          {language === "en"
                            ? "Project Coordinator and Creator"
                            : "Coordenador e Criador do Projeto"}
                        </div>
                      </div>
                    </li>
                  ) : (
                    // Para outros projetos, exibe a equipe completa
                    <>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">RP</span>
                        </div>
                        <div>
                          <div className="font-medium">Renato</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "en" ? "Project Manager" : "Gerente de Projeto"}
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">MS</span>
                        </div>
                        <div>
                          <div className="font-medium">Marina Silva</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "en" ? "Automation Engineer" : "Engenheira de Automação"}
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-sm font-medium">RC</span>
                        </div>
                        <div>
                          <div className="font-medium">Rafael Costa</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "en" ? "IoT Specialist" : "Especialista em IoT"}
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">LP</span>
                        </div>
                        <div>
                          <div className="font-medium">Luiz Pereira</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "en" ? "Data Analyst" : "Analista de Dados"}
                          </div>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Contato / Chamada para ação */}
              <div className="bg-primary-50 dark:bg-primary-950/30 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2 dark:text-black">
                  {language === "en" ? "Need a Project?" : "Precisa de um Projeto?"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "en"
                    ? "Contact us for a custom solution tailored to your needs."
                    : "Entre em contato para uma solução personalizada para as suas necessidades."}
                </p>
                <Button asChild className="w-full">
                  <Link to="/contato">
                    {language === "en" ? "Contact Me" : "Entrar em Contato"}
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

export default ProjectModalTransporte
