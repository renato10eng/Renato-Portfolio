import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, ExternalLink, ArrowRight, Code2 } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const STRAPI_URL = 'http://localhost:1337';

export interface Project {
  id: number;
  title: string;
  slug?: string;
  description: string;
  overview?: string;
  featured_image?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  image?: string;
  gallery?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
  }>;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other' | string;
  status?: 'completed' | 'in-progress' | 'planned';
  start_date?: string;
  completion_date?: string;
  date?: string;
  dateEn?: string;
  client_name?: string;
  client_location?: string;
  project_url?: string;
  url?: string;
  externalUrl?: string;
  github_url?: string;
  technologies?: Array<{
    id: number;
    name: string;
    icon: string;
    category: string;
    color: string;
  }>;
  tags?: string[];
  tagsEn?: string[];
  titleEn?: string;
  descriptionEn?: string;
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

  const getCategoryColor = () => {
    switch (category) {
      case "engenharia":
        return "primary";
      case "logistica":
        return "secondary";
      case "ambos":
        return "accent";
      default:
        return "primary";
    }
  };

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
  const categoryColor = getCategoryColor();

  return (
    <Card className="group glass-card border border-white/10 dark:border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/10 hover:-translate-y-3 h-full flex flex-col">
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden relative bg-muted">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={project.featured_image?.alternativeText || project.title}
              className={cn(
                "object-cover w-full h-full transition-transform duration-700 will-change-transform",
                project.status === 'planned' 
                  ? "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-70" 
                  : "group-hover:scale-110"
              )}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <Code2 className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-20">
          {project.status === 'in-progress' && (
            <Badge className="bg-amber-500/90 text-white hover:bg-amber-500 backdrop-blur-md shadow-lg border-0 animate-pulse font-semibold text-xs">
              Desenvolvendo
            </Badge>
          )}
          {project.status === 'planned' && (
            <Badge variant="outline" className="bg-muted/80 backdrop-blur-md border-border text-muted-foreground font-semibold text-xs">
              Roadmap
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge className={cn(
            "backdrop-blur-md shadow-lg border-0 font-semibold text-xs",
            categoryColor === 'primary' ? "bg-primary/80 text-white hover:bg-primary" :
            categoryColor === 'secondary' ? "bg-secondary/80 text-white hover:bg-secondary" :
            "bg-accent/80 text-white hover:bg-accent"
          )}>
            {category === "engenharia" ? "Engenharia" : category === "logistica" ? "Logística" : "Híbrido"}
          </Badge>
        </div>

        {/* Hover Overlay with CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
          <Link
            to={projectLink}
            className={cn(
              "inline-flex items-center gap-2 font-bold text-white hover:text-primary transition-colors text-lg",
              project.status === 'planned' && "cursor-default pointer-events-none"
            )}
            onClick={(e) => project.status === 'planned' && e.preventDefault()}
          >
            {project.status === 'planned' ? "Em Breve" : t('view_details')}
            {project.status !== 'planned' && <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader className="pt-6 pb-2 px-6">
        <Link to={projectLink} className={cn("block group/title", project.status === 'planned' && "cursor-default")}>
          <h3 className="font-heading text-xl font-bold leading-snug group-hover/title:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="px-6 py-3 flex-grow">
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge 
                key={tech.id} 
                variant="secondary" 
                className="px-2 py-1 text-xs font-medium rounded bg-primary/10 text-primary dark:bg-primary/5 dark:text-primary group-hover:bg-primary/20 transition-colors"
              >
                {tech.name}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="px-2 py-1 text-xs font-bold bg-muted text-muted-foreground">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-6 pb-6 pt-4 mt-auto border-t border-border/50 flex justify-between items-center">
        {displayDate && (
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Calendar className={cn(
              "h-4 w-4",
              categoryColor === 'primary' ? "text-primary" :
              categoryColor === 'secondary' ? "text-secondary" :
              "text-accent"
            )} />
            <span>{displayDate}</span>
          </div>
        )}

        {project.status !== 'planned' && (
          <Link
            to={projectLink}
            className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
