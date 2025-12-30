
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Tag, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
  category: "engenharia" | "logistica" | "ambos";
  date?: string;
  titleEn?: string;
  descriptionEn?: string;
  tagsEn?: string[];
  dateEn?: string;
  externalUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language, t } = useLanguage();
  const showModaisLink = project.id === 10; // Modais de Transporte
  
  // Use English or Portuguese content based on language
  const title = language === 'en' && project.titleEn ? project.titleEn : project.title;
  const description = language === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
  const tags = language === 'en' && project.tagsEn ? project.tagsEn : project.tags;
  const date = language === 'en' && project.dateEn ? project.dateEn : project.date;
  
  // Determinando as cores dos botões de acordo com a categoria
  const getButtonVariant = () => {
    switch(project.category) {
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

  return (
    <Card className="overflow-hidden card-hover border border-muted/50 bg-card shadow-md transition-all duration-300">
      <div className="aspect-video overflow-hidden relative group">
        <img
          src={project.image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <Link
            to={project.url}
            className="text-white flex items-center gap-1 font-medium hover:underline"
          >
            {t('view_details')} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        
        {project.category === "engenharia" && ( // 
          <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary text-primary-foreground border-0 shadow-md">
            {t('engineering')}
          </Badge>
        )}
        {project.category === "logistica" && (
          <Badge className="absolute top-3 right-3 bg-secondary hover:bg-secondary text-secondary-foreground border-0 shadow-md">
            {t('logistics')}
          </Badge>
        )}
        {project.category === "ambos" && (
          <Badge className="absolute top-3 right-3 bg-accent hover:bg-accent text-accent-foreground border-0 shadow-md">
            {t('both')}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <Link to={project.url} className="hover:underline">
          <h3 className="font-heading text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">{title}</h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-muted/50 hover:bg-muted">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Botão para acessar URL externa ou plataforma */}
        <div className="mt-4">
          <Button 
            variant={getButtonVariant()}
            size="sm" 
            asChild 
            className="w-full"
          >
            <Link 
              to={project.externalUrl || "#"} 
              target={project.externalUrl?.startsWith('/') ? "_self" : "_blank"}
              rel="noopener noreferrer"
            >
              {showModaisLink ? t('access_platform') : t('access_project')}
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="pt- 0 flex justify-between items-center text-xs text-muted-foreground border-t border-border/50 mt-2 pt-3">
        {date && (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
        )}
        <Link
          to={project.url}
          className="flex items-center text-sm font-medium text-primary hover:underline gap-1 ml-auto"
        >
          {t('details')} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
