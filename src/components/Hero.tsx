
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Zap, Layers, BarChart3, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useHeroData } from "@/hooks/useStrapi";

const STRAPI_URL = 'http://localhost:1337';

interface HeroMetric {
  id: number;
  value: string;
  label: string;
}

interface HeroData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
  background_image?: {
    url: string;
  };
  metrics?: HeroMetric[];
}

export function Hero() {
  const { t } = useLanguage();
  const { data: heroData, loading, error } = useHeroData();

  const hero = heroData[0] as unknown as HeroData | undefined; // Pegar o primeiro item (único)

  // Fallback content logic
  const content = (error || !hero || loading) ? {
    subtitle: t('production_engineer'),
    title: t('portfolio_title'),
    description: t('transform_challenges'),
    cta_primary_text: t('explore_projects'),
    cta_primary_url: "/projetos",
    cta_secondary_text: t('contact_me'),
    cta_secondary_url: "/contato",
    background_image: null
  } : hero;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[100px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        {hero?.background_image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
            style={{ backgroundImage: `url(${STRAPI_URL}${hero.background_image.url})` }}
          />
        )}
      </div>

      <div className="container-padding max-w-7xl mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {content.subtitle}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-[1.1] tracking-tight text-foreground">
            {hero ? (
              hero.title
            ) : (
              <>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">{t('portfolio_title')}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Renato Santos</span>
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {content.description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
              <Link to={content.cta_primary_url}>
                {content.cta_primary_text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {content.cta_secondary_text && content.cta_secondary_url && (
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold bg-background/50 backdrop-blur-sm border-border hover:bg-muted/50 transition-all" asChild>
                <Link to={content.cta_secondary_url}>{content.cta_secondary_text}</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Visual/Metrics Content */}
        <div className="relative hidden lg:block animate-fade-in-up animation-delay-200">
          <div className="relative z-10 grid grid-cols-2 gap-6">
            {/* Dynamic Metrics or Fallback */}
            {(hero?.metrics && hero.metrics.length > 0) ? (
              hero.metrics.map((metric: any, idx: number) => (
                <div key={metric.id} className={`glass-card p-8 flex flex-col items-center text-center justify-center space-y-2 hover:border-primary/50 transition-colors ${idx % 2 !== 0 ? 'translate-y-12' : ''}`}>
                  <span className="text-4xl font-bold text-primary">{metric.value}</span>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                </div>
              ))
            ) : (
              <>
                <div className="glass-card p-8 flex flex-col items-center text-center space-y-4 hover:border-primary/50 transition-colors transform hover:-translate-y-1 duration-300">
                  <div className="p-4 rounded-full bg-primary/10 text-primary">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t('process_automation')}</h3>
                  </div>
                </div>

                <div className="glass-card p-8 flex flex-col items-center text-center space-y-4 translate-y-12 hover:border-accent/50 transition-colors transform hover:-translate-y-1 duration-300">
                  <div className="p-4 rounded-full bg-accent/10 text-accent">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t('awarded_projects')}</h3>
                  </div>
                </div>

                <div className="glass-card p-8 flex flex-col items-center text-center space-y-4 hover:border-secondary/50 transition-colors transform hover:-translate-y-1 duration-300">
                  <div className="p-4 rounded-full bg-secondary/10 text-secondary">
                    <Layers className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t('integrated_solutions')}</h3>
                  </div>
                </div>

                <div className="glass-card p-8 flex flex-col items-center text-center space-y-2 translate-y-12 hover:border-primary/50 transition-colors transform hover:-translate-y-1 duration-300">
                  <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">+15</span>
                  <span className="text-sm font-bold text-muted-foreground uppercase">{t('projects_implemented')}</span>
                </div>
              </>
            )}
          </div>

          {/* Decorative Elements behind grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-3xl -z-10 rounded-full" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
