
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart, Truck, LineChart, Workflow, Settings, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useServicesData } from "@/hooks/useStrapi";

interface Service {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

const iconMap: { [key: string]: React.ReactNode } = {
  'workflow': <Workflow className="h-8 w-8" />,
  'truck': <Truck className="h-8 w-8" />,
  'bar-chart': <BarChart className="h-8 w-8" />,
  'line-chart': <LineChart className="h-8 w-8" />,
  'settings': <Settings className="h-8 w-8" />,
  'shield-check': <ShieldCheck className="h-8 w-8" />,
};

export function ServicesSection() {
  const { t } = useLanguage();
  const { data: servicesData, loading, error } = useServicesData();

  const fallbackServices: Service[] = [
    {
      titleKey: "process_optimization",
      descriptionKey: "process_optimization_desc",
      icon: <Workflow className="h-8 w-8" />,
    },
    {
      titleKey: "supply_chain_management_service",
      descriptionKey: "scm_service_desc",
      icon: <Truck className="h-8 w-8" />,
    },
    {
      titleKey: "data_analysis",
      descriptionKey: "data_analysis_desc",
      icon: <BarChart className="h-8 w-8" />,
    },
    {
      titleKey: "production_planning",
      descriptionKey: "production_planning_desc",
      icon: <Settings className="h-8 w-8" />,
    },
    {
      titleKey: "quality_management",
      descriptionKey: "quality_management_desc",
      icon: <ShieldCheck className="h-8 w-8" />,
    },
    {
      titleKey: "indicators_modeling",
      descriptionKey: "indicators_desc",
      icon: <LineChart className="h-8 w-8" />,
    },
  ];

  if (loading) {
    return (
      <section className="py-32 bg-background">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-muted border-t-primary"></div>
              </div>
              <p className="mt-4 text-muted-foreground">{t('loading')}...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const services = servicesData && servicesData.length > 0 ? servicesData : fallbackServices;

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-30 -z-10 animate-float animation-delay-300" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] opacity-20 -z-10 animate-float animation-delay-500" />

      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 dark:bg-accent/5 border border-accent/30 dark:border-accent/20 text-accent text-xs font-bold tracking-widest uppercase w-fit mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            {t('services_offered')}
          </div>
          <div className="space-y-4">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-black text-foreground leading-tight">
              {t('services_offered')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              {t('services_subtitle')}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up animation-delay-200">
          {services.map((service, index) => {
            const isCmsService = 'id' in service;
            const colors = ['primary', 'secondary', 'accent'];
            const color = colors[index % colors.length];
            const colorClasses = {
              primary: 'from-primary/20 to-primary/5 text-primary',
              secondary: 'from-secondary/20 to-secondary/5 text-secondary',
              accent: 'from-accent/20 to-accent/5 text-accent',
            };

            return (
              <Card 
                key={isCmsService ? service.id : index} 
                className="group glass-card border border-white/10 dark:border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className={`inline-flex w-fit p-3 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform duration-300`}>
                    {isCmsService ? (
                      iconMap[service.icon] || <Workflow className="h-8 w-8" />
                    ) : (
                      service.icon
                    )}
                  </div>
                  <CardTitle className="text-2xl font-heading font-bold mt-4 text-foreground group-hover:text-primary transition-colors">
                    {isCmsService ? service.title : t(service.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {isCmsService ? service.description : t(service.descriptionKey)}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Saiba mais</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-20 text-center animate-fade-in-up animation-delay-400">
          <Button 
            size="lg"
            className="rounded-lg px-10 h-14 text-base font-semibold shadow-xl shadow-accent/30 hover:shadow-2xl transition-all duration-300"
          >
            {t('view_all_services')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
