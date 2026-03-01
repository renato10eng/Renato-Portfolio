
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Truck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export function EngineeringFields() {
  const { t } = useLanguage();
  
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-30 -z-10 animate-float animation-delay-300" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-20 -z-10 animate-float animation-delay-500" />

      <div className="container-padding max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/5 border border-primary/30 dark:border-primary/20 text-primary text-xs font-bold tracking-widest uppercase w-fit mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            {t('specialization_areas')}
          </div>
          <h2 className="text-6xl sm:text-7xl font-heading font-black text-foreground leading-tight">
            {t('specialization_areas')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            {t('specialization_subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="engineering" className="mt-12 animate-fade-in-up animation-delay-200">
          <TabsList className="grid grid-cols-2 w-full h-14 bg-muted/50 border border-border/50 rounded-lg p-1">
            <TabsTrigger value="engineering" className="flex items-center gap-2 font-semibold rounded-md data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <Activity className="h-5 w-5" />
              <span className="hidden sm:inline">{t('engineering_production')}</span>
              <span className="sm:hidden">{t('engineering')}</span>
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2 font-semibold rounded-md data-[state=active]:bg-secondary data-[state=active]:text-white transition-all">
              <Truck className="h-5 w-5" />
              <span className="hidden sm:inline">{t('logistics')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Engineering Tab */}
          <TabsContent value="engineering" className="mt-8 animate-fade-in">
            <Card className="glass-card border-white/10 dark:border-white/5">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-heading font-bold text-foreground">{t('engineering_production')}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {t('processes_optimization')}
                    </CardDescription>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Activity className="h-8 w-8" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  {t('production_engineering_desc')}
                </p>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-foreground">{t('main_areas')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: t('operations_management'), desc: t('operations_desc') },
                      { label: t('quality_engineering'), desc: t('quality_desc') },
                      { label: t('economic_engineering'), desc: t('economic_desc') },
                      { label: t('lean_manufacturing'), desc: t('lean_desc') },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors">
                        <p className="font-semibold text-foreground mb-1">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed font-light pt-4 border-t border-border/50">
                  {t('production_importance')}
                </p>

                <Button asChild className="group rounded-lg px-6 h-11 font-semibold shadow-lg shadow-primary/30 hover:shadow-xl transition-all">
                  <Link to="/engenharia">
                    {t('learn_more_engineering')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logistics Tab */}
          <TabsContent value="logistics" className="mt-8 animate-fade-in">
            <Card className="glass-card border-white/10 dark:border-white/5">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-heading font-bold text-foreground">{t('logistics')}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {t('logistics_desc')}
                    </CardDescription>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                    <Truck className="h-8 w-8" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  {t('logistics_description')}
                </p>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-foreground">{t('main_areas')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: t('supply_chain'), desc: t('supply_chain_desc') },
                      { label: t('transport_logistics'), desc: t('transport_desc') },
                      { label: t('warehouse_management'), desc: t('warehouse_desc') },
                      { label: t('reverse_logistics'), desc: t('reverse_desc') },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-secondary/5 border border-secondary/10 hover:border-secondary/30 transition-colors">
                        <p className="font-semibold text-foreground mb-1">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed font-light pt-4 border-t border-border/50">
                  {t('logistics_importance')}
                </p>

                <Button asChild className="group rounded-lg px-6 h-11 font-semibold shadow-lg shadow-secondary/30 hover:shadow-xl transition-all">
                  <Link to="/logistica">
                    {t('learn_more_logistics')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
