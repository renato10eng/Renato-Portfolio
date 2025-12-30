
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const EngineeringPage = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 text-center">{t('engineering_page_title')}</h1>
          <p className="text-center text-xl max-w-2xl mx-auto text-white/80">
            {t('engineering_page_subtitle')}
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={t('engineering_page_title')} 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading">{t('what_is_engineering')}</h2>
              
              <p>
                {t('engineering_definition')}
              </p>
              
              <p>
                {t('engineer_focus')}
              </p>
              
              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p>{t('lean_implementation')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p>{t('processes_analysis')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p>{t('production_management')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p>{t('quality_implementation')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t('activity_areas')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('operations_management_title')}</CardTitle>
                <CardDescription>{t('operations_management_subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {t('operations_management_desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('quality_management_title')}</CardTitle>
                <CardDescription>{t('quality_management_subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {t('quality_management_full_desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('ergonomics_title')}</CardTitle>
                <CardDescription>{t('ergonomics_subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {t('ergonomics_desc2')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('operational_research_title')}</CardTitle>
                <CardDescription>{t('operational_research_subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {t('operational_research_desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('economic_engineering_title')}</CardTitle>
                <CardDescription>{t('economic_engineering_subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {t('economic_engineering_desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('industrial_sustainability_title')}</CardTitle>
                <CardDescription>{t('industrial_sustainability_subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {t('industrial_sustainability_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="group">
              <Link to="/projetos?categoria=engenharia">
                {t('view_engineering_projects')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">{t('methodologies_tools')}</h2>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">{t('lean_manufacturing_title')}</h3>
              <p>
                {t('lean_manufacturing_desc1')}
              </p>
              <p>
                {t('lean_manufacturing_desc2')}
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">{t('six_sigma_title')}</h3>
              <p>
                {t('six_sigma_desc1')}
              </p>
              <p>
                {t('six_sigma_desc2')}
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">{t('industry_4_title')}</h3>
              <p>
                {t('industry_4_desc1')}
              </p>
              <p>
                {t('industry_4_desc2')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EngineeringPage;
