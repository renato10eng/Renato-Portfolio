import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Tag, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const STRAPI_URL = 'http://localhost:1337';

export interface Project {
  id: number;
  title: string;
  slug?: string; // Slug might be optional in static data
  description: string;
  overview?: string;
  featured_image?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  image?: string; // Legacy static image
  gallery?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
  }>;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other' | string; // Allow string for flexibility
  status?: 'completed' | 'in-progress' | 'planned';
  start_date?: string;
  completion_date?: string;
  date?: string; // Legacy date
  dateEn?: string; // Legacy date
  client_name?: string;
  client_location?: string;
  project_url?: string;
  url?: string; // Legacy local url
  externalUrl?: string; // Legacy external url
  github_url?: string;
  technologies?: Array<{
    id: number;
    name: string;
    icon: string;
    category: string;
    color: string;
  }>;
  tags?: string[]; // Legacy tags
  tagsEn?: string[]; // Legacy tags
  titleEn?: string; // Legacy title
  descriptionEn?: string; // Legacy description
  challenges?: string;
  solutions?: string;
  methodology?: string;
  metrics?: any[];
  featured?: boolean;
  order?: number;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language, t } = useLanguage();

  // Mapeamento de categoria do CMS para o sistema atual
  const getCategoryDisplay = (category: string) => {
    switch (category) {
      case 'frontend':
      case 'backend':
      case 'fullstack':
        return 'engenharia';
      case 'mobile':
        return 'logistica';
      default:
        return 'ambos';
    }
  };

  const category = getCategoryDisplay(project.category);

  // Determinando as cores dos botões de acordo com a categoria
  const getButtonVariant = () => {
    switch (category) {
      case "engenharia":
        return "default"; // Blue for Engineering (secondary)
      case "logistica":
        return "secondary"; // Original color (primary) for Logistics
      case "ambos":
        return "outline"; // Outline for both
      default:
        return "default";
    }
  };

  // Formatar data
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'pt-BR', {
      year: 'numeric',
      month: 'short'
    });
  };

  const displayDate = formatDate(project.completion_date || project.start_date) || project.date;
  const imageUrl = project.featured_image ? `${STRAPI_URL}${project.featured_image.url}` : project.image;
  const projectLink = project.slug ? `/projeto/${project.slug}` : project.url || '#';

  return (
    <Card className="group glass-card border-0 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={imageUrl}
          alt={project.featured_image?.alternativeText || project.title}
          className={cn(
            "object-cover w-full h-full transition-transform duration-700 will-change-transform",
            project.status === 'planned' ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100" : "group-hover:scale-110"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Status Indicators */}
        <div className="absolute top-4 left-4 z-10">
          {project.status === 'in-progress' && (
            <Badge className="bg-amber-500/90 text-black hover:bg-amber-500 backdrop-blur-md shadow-lg border-0 animate-pulse">
              Em Desenvolvimento
            </Badge>
          )}
          {project.status === 'planned' && (
            <Badge variant="outline" className="bg-background/50 backdrop-blur-md border-white/20 text-white">
              Roadmap / Futuro
            </Badge>
          )}
        </div>

        <div className="absolute top-4 right-4 z-10 gap-2 flex flex-col items-end">
          {category === "engenharia" && <Badge className="bg-primary/90 hover:bg-primary backdrop-blur-md shadow-lg border-0">Engenharia</Badge>}
          {category === "logistica" && <Badge className="bg-secondary/90 hover:bg-secondary backdrop-blur-md shadow-lg border-0">Logística</Badge>}
          {category === "ambos" && <Badge className="bg-accent/90 hover:bg-accent backdrop-blur-md shadow-lg border-0">Híbrido</Badge>}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
          <Link
            to={projectLink}
            className={cn(
              "inline-flex items-center gap-2 font-semibold transition-colors mb-2 opacity-0 group-hover:opacity-100 duration-300 delay-100",
              project.status === 'planned' ? "text-white cursor-not-allowed" : "text-white hover:text-primary"
            )}
            onClick={(e) => project.status === 'planned' && e.preventDefault()}
          >
            {project.status === 'planned' ? "Em Breve" : t('view_details')}
            {project.status !== 'planned' && <ArrowUpRight className="h-4 w-4" />}
          </Link>
        </div>
      </div>

      <CardHeader className="pt-6 pb-2 px-6">
        <Link to={projectLink} className={cn("block", project.status === 'planned' && "cursor-default pointer-events-none")}>
          <h3 className="font-heading text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="px-6 py-2 flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-base leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map((tech) => (
            <Badge key={tech.id} variant="secondary" className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              {tech.name}
            </Badge>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground">+{project.technologies.length - 3}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-4 mt-auto border-t border-border/40 flex justify-between items-center text-sm text-muted-foreground">
        {displayDate && (
          <div className="flex items-center gap-2 font-medium">
            <Calendar className={cn("h-4 w-4", project.status === 'planned' ? "text-muted-foreground" : "text-primary")} />
            <span>{displayDate}</span>
          </div>
        )}

        {project.status !== 'planned' && (
          <Link
            to={projectLink}
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
