
import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, MapPin, ChevronRight, Phone, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-background pt-32 pb-12 border-t border-white/10 dark:border-white/5 mt-auto">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25 dark:shadow-primary/15">R</span>
              <span className="font-heading text-lg font-black tracking-tighter">
                Renato<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">.dev</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {t('company_description')}
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Mail, href: "mailto:contato@renatodev.com", label: "Email" },
                { icon: Smartphone, href: "https://wa.me/", label: "WhatsApp" },
              ].map((item, idx) => (
                <Button key={idx} size="icon" variant="outline" className="rounded-full h-10 w-10 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                    <item.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-6 text-foreground">{t('links')}</h3>
            <ul className="space-y-4">
              {[
                { path: "/", label: t('home') },
                { path: "/sobre", label: t('about') },
                { path: "/projetos", label: t('projects') },
                { path: "/contato", label: t('contact') },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-bold text-lg mb-6 text-foreground">{t('expertise_areas')}</h3>
            <ul className="space-y-4">
              {[
                t('engineering'),
                `${t('logistics')} & ${t('supply_chain')}`,
                t('project_management'),
                t('lean_manufacturing_footer'),
                t('industry_4_footer'),
              ].map((item, idx) => (
                <li key={idx} className="text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-bold text-lg mb-6 text-foreground">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground group">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="mt-1">São Paulo, Brasil</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground group">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="mt-1 break-all">{t('email_address')}</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground group">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Smartphone className="h-4 w-4" />
                </div>
                <span className="mt-1">{t('whatsapp')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Renato Dev. {t('rights_reserved')}
          </p>
          <div className="flex gap-8">
            <Link to="/politica-privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('privacy_policy')}
            </Link>
            <Link to="/termos-uso" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('terms_of_use')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
