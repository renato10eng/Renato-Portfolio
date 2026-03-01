
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart, Truck, LineChart, Workflow, Settings, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useServicesData } from "@/hooks/useStrapi";

interface Service {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

const iconMap: { [key: string]: React.ReactNode } = {
  'workflow': <Workflow className="h-12 w-12 text-primary" />,
  'truck': <Truck className="h-12 w-12 text-primary" />,
  'bar-chart': <BarChart className="h-12 w-12 text-primary" />,
  'line-chart': <LineChart className="h-12 w-12 text-primary" />,
  'settings': <Settings className="h-12 w-12 text-primary" />,
  'shield-check': <ShieldCheck className="h-12 w-12 text-primary" />,
};

export function ServicesSection() {
  const { t } = useLanguage();
  const { data: servicesData, loading, error } = useServicesData();

  const fallbackServices: Service[] = [
    {
      titleKey: "process_optimization",
      descriptionKey: "process_optimization_desc",
      icon: <Workflow className="h-12 w-12 text-primary" />,
    },
    {
      titleKey: "supply_chain_management_service",
      descriptionKey: "scm_service_desc",
      icon: <Truck className="h-12 w-12 text-primary" />,
    },
    {
      titleKey: "data_analysis",
      descriptionKey: "data_analysis_desc",
      icon: <BarChart className="h-12 w-12 text-primary" />,
    },
    {
      titleKey: "production_planning",
      descriptionKey: "production_planning_desc",
      icon: <Settings className="h-12 w-12 text-primary" />,
    },
    {
      titleKey: "quality_management",
      descriptionKey: "quality_management_desc",
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    },
    {
      titleKey: "indicators_modeling",
      descriptionKey: "indicators_desc",
      icon: <LineChart className="h-12 w-12 text-primary" />,
    },
  ];

  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  const services = servicesData && servicesData.length > 0 ? servicesData : fallbackServices;

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="section-title text-center">{t('services_offered')}</h2>
        <p className="section-subtitle text-center">
          {t('services_subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => {
            // Verificar se é um serviço do CMS ou fallback
            const isCmsService = 'id' in service;

            return (
              <Card key={isCmsService ? service.id : index} className="card-hover">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  {isCmsService ? (
                    iconMap[service.icon] || <Workflow className="h-12 w-12 text-primary" />
                  ) : (
                    service.icon
                  )}
                  <CardTitle className="text-xl">
                    {isCmsService ? service.title : t(service.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {isCmsService ? service.description : t(service.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button className="group">
            {t('view_all_services')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
