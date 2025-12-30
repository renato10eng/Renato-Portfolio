
import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, MapPin, ChevronRight, Phone, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-muted/50 pt-20 pb-10 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">EP</span>
              <span className="font-heading text-xl font-bold tracking-tight">Renato Dev</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              {t('company_description')}
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9" asChild>
                <a href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9" asChild>
                <a href="https://github.com" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9" asChild>
                <a href="mailto:contato@renatodev.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9" asChild>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <Smartphone className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-medium text-lg mb-4">{t('links')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span>{t('home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span>{t('about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span>{t('projects')}</span>
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span>{t('contact')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-medium text-lg mb-4">{t('expertise_areas')}</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 mt-1" />
                <span>{t('engineering')}</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 mt-1" />
                <span>{t('logistics')} & {t('supply_chain')}</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 mt-1" />
                <span>{t('project_management')}</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 mt-1" />
                <span>{t('lean_manufacturing_footer')}</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 mt-1" />
                <span>{t('industry_4_footer')}</span>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-medium text-lg mb-4">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>São Paulo, Brasil</span>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="break-all">{t('email_address')}</span>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>{t('phone_number')}</span>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Smartphone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>{t('whatsapp')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Renato Dev. {t('rights_reserved')}
          </p>
          <div className="flex gap-6">
            <Link to="/politica-privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('privacy_policy')}
            </Link>
            <Link to="/termos-uso" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('terms_of_use')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
