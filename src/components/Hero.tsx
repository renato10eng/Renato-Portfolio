
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Award, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useHeroData } from "@/hooks/useStrapi";

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

  const hero = heroData[0] as unknown as HeroData | undefined;

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary Blue Glow - Top Left */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-40 -translate-x-1/3 -translate-y-1/3 animate-float" />
        
        {/* Secondary Cyan Glow - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[120px] opacity-30 translate-x-1/4 translate-y-1/4 animate-float animation-delay-300" />
        
        {/* Accent Purple Glow - Center */}
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-25 animate-float animation-delay-500" />
      </div>

      {/* Main Content Container */}
      <div className="container-padding max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/5 border border-primary/30 dark:border-primary/20 text-primary text-xs font-bold tracking-widest uppercase w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{content.subtitle}</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-black leading-[0.95] tracking-tighter text-foreground">
                {hero ? (
                  hero.title
                ) : (
                  <>
                    <span className="block">{t('portfolio_title')}</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Renato</span>
                  </>
                )}
              </h1>
              
              {/* Subtle line divider */}
              <div className="section-divider mt-6" />
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg font-light">
              {content.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                size="lg" 
                className="rounded-lg px-8 h-14 text-base font-semibold shadow-xl shadow-primary/30 dark:shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 group"
                asChild
              >
                <Link to={content.cta_primary_url}>
                  {content.cta_primary_text}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              {content.cta_secondary_text && content.cta_secondary_url && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-lg px-8 h-14 text-base font-semibold border-secondary/30 text-secondary hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-all duration-300"
                  asChild
                >
                  <Link to={content.cta_secondary_url}>{content.cta_secondary_text}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Right: Visual Metrics Grid */}
          <div className="relative hidden lg:block animate-fade-in-up animation-delay-200">
            <div className="relative z-10 grid grid-cols-2 gap-5">
              {(hero?.metrics && hero.metrics.length > 0) ? (
                hero.metrics.map((metric: HeroMetric, idx: number) => (
                  <div 
                    key={metric.id} 
                    className={`glass-card p-8 flex flex-col items-center justify-center text-center space-y-3 group hover:border-primary/50 transition-all duration-300 ${
                      idx % 2 !== 0 ? 'translate-y-8' : ''
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-accent transition-all duration-300">{metric.value}</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</span>
                  </div>
                ))
              ) : (
                <>
                  {/* Metric Card 1 */}
                  <div className="glass-card p-8 flex flex-col items-center justify-center space-y-4 group hover:border-primary/50 transition-all duration-300">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{t('process_automation')}</h3>
                  </div>

                  {/* Metric Card 2 */}
                  <div className="glass-card p-8 flex flex-col items-center justify-center space-y-4 translate-y-8 group hover:border-secondary/50 transition-all duration-300">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 text-secondary group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{t('awarded_projects')}</h3>
                  </div>

                  {/* Metric Card 3 */}
                  <div className="glass-card p-8 flex flex-col items-center justify-center space-y-4 group hover:border-accent/50 transition-all duration-300">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 text-accent group-hover:scale-110 transition-transform duration-300">
                      <Layers className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{t('integrated_solutions')}</h3>
                  </div>

                  {/* Metric Card 4 */}
                  <div className="glass-card p-8 flex flex-col items-center justify-center space-y-3 translate-y-8 group hover:border-primary/50 transition-all duration-300">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">+15</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('projects_implemented')}</span>
                  </div>
                </>
              )}
            </div>

            {/* Decorative background gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 blur-3xl -z-10 rounded-full pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-[2px] h-8 bg-gradient-to-b from-primary to-transparent rounded-full" />
      </div>
    </section>
  );
}
