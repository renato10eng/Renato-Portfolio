
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export function EngineeringFields() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <h2 className="section-title text-center">{t('specialization_areas')}</h2>
        <p className="section-subtitle text-center">
          {t('specialization_subtitle')}
        </p>
        
        <Tabs defaultValue="engineering" className="mt-12 max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="engineering" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {t('engineering_production')}
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              {t('logistics')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="engineering" className="mt-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>{t('engineering_production')}</CardTitle>
                <CardDescription>
                  {t('processes_optimization')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {t('production_engineering_desc')}
                </p>
                <h4 className="font-medium text-lg mt-6">{t('main_areas')}</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-medium">{t('operations_management')}:</span> {t('operations_desc')}</li>
                  <li><span className="font-medium">{t('quality_engineering')}:</span> {t('quality_desc')}</li>
                  <li><span className="font-medium">{t('economic_engineering')}:</span> {t('economic_desc')}</li>
                  <li><span className="font-medium">{t('ergonomics')}:</span> {t('ergonomics_desc')}</li>
                  <li><span className="font-medium">{t('lean_manufacturing')}:</span> {t('lean_desc')}</li>
                </ul>
                <p className="mt-4">
                  {t('production_importance')}
                </p>
                <div className="mt-6">
                  <Button variant="outline" asChild className="group">
                    <Link to="/engenharia">
                      {t('learn_more_engineering')}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logistics" className="mt-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>{t('logistics')}</CardTitle>
                <CardDescription>
                  {t('logistics_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {t('logistics_description')}
                </p>
                <h4 className="font-medium text-lg mt-6">{t('main_areas')}</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-medium">{t('supply_chain')}:</span> {t('supply_chain_desc')}</li>
                  <li><span className="font-medium">{t('transport_logistics')}:</span> {t('transport_desc')}</li>
                  <li><span className="font-medium">{t('warehouse_management')}:</span> {t('warehouse_desc')}</li>
                  <li><span className="font-medium">{t('international_logistics')}:</span> {t('international_desc')}</li>
                  <li><span className="font-medium">{t('reverse_logistics')}:</span> {t('reverse_desc')}</li>
                </ul>
                <p className="mt-4">
                  {t('logistics_importance')}
                </p>
                <div className="mt-6">
                  <Button variant="outline" asChild className="group">
                    <Link to="/logistica">
                      {t('learn_more_logistics')}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
