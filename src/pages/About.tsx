
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, DownloadCloud, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 text-center">{t('about_page_title')}</h1>
          <p className="text-center text-xl max-w-2xl mx-auto text-white/80">
            {t('about_page_subtitle')}
          </p>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                //src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                src="images/img_sobre.png" 
                alt={t('professional_name')} 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading">{t('professional_name')}</h2>
              <p className="text-xl text-primary">{t('professional_title')}</p>
              
              <div className="space-y-4">
                <p>
                  {t('professional_bio')}
                </p>
                <p>
                  {t('professional_education')}
                </p>
                <p>
                  {t('professional_passion')}
                </p>
              </div>
              
              <Button className="flex items-center gap-2" asChild>
                <a href={`${import.meta.env.BASE_URL}renato_santos_curriculo.pdf`} download>
                  <DownloadCloud className="h-4 w-4" />
                  {t('download_cv')}
                </a>
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <CardTitle>{t('academic_formation')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('mba_period')}</p>
                  <h4 className="font-medium">{t('mba_title')}</h4>
                  <p className="text-sm">{t('mba_institution')}</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('undergrad_period')}</p>
                  <h4 className="font-medium">{t('undergrad_title')}</h4>
                  <p className="text-sm">{t('undergrad_institution')}</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('logistics_period')}</p>
                  <h4 className="font-medium">{t('logistics_title')}</h4>
                  <p className="text-sm">{t('logistics_institution')}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <Award className="h-8 w-8 text-primary" />
                <CardTitle>{t('certifications_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('sixsigma_period')}</p>
                  <h4 className="font-medium">{t('sixsigma_title')}</h4>
                  <p className="text-sm">{t('sixsigma_institution')}</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('scrum_period')}</p>
                  <h4 className="font-medium">{t('scrum_title')}</h4>
                  <p className="text-sm">{t('scrum_institution')}</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('oracle_period')}</p>
                  <h4 className="font-medium">{t('oracle_title')}</h4>
                  <p className="text-sm">{t('oracle_institution')}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <CardTitle>{t('professional_experience')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('current_job_period')}</p>
                  <h4 className="font-medium">{t('current_job_title')}</h4>
                  <p className="text-sm">{t('current_job_company')}</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('previous_job1_period')}</p>
                  <h4 className="font-medium">{t('previous_job1_title')}</h4>
                  <p className="text-sm">{t('previous_job1_company')}</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{t('previous_job2_period')}</p>
                  <h4 className="font-medium">{t('previous_job2_title')}</h4>
                  <p className="text-sm">{t('previous_job2_company')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
