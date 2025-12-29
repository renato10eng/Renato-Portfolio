
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Zap, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-black text-white pt-28 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-white/5"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white/10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full bg-secondary/10"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="container relative z-10 max-w-full px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left space-y-5 animate-fade-in max-w-3xl mx-auto lg:mx-0">
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-secondary-300 font-medium mb-1 mt-0">
              {t('production_engineer')}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block mb-3">{t('portfolio_title')}</span>
              <span className="text-secondary-300">Renato</span> <span className="text-accent-orange">{t('engineer')}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {t('transform_challenges')}
            </p>
            
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start pt-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 border-0 shadow-lg shadow-primary-500/30" asChild>
                <Link to="/projetos">
                  {t('explore_projects')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-medium bg-white/10 hover:bg-white/20 border-white/20" asChild>
                <Link to="/contato">{t('contact_me')}</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 animate-fade-in max-w-lg w-full">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl h-36 flex flex-col justify-center transform hover:translate-y-[-5px] transition-all duration-300 border border-white/10">
                <Zap className="h-10 w-10 text-primary-300 mb-2" />
                <h3 className="font-semibold text-lg">{t('process_automation')}</h3>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl h-48 flex flex-col justify-center transform hover:translate-y-[-5px] transition-all duration-300 border border-white/10">
                <Award className="h-10 w-10 text-secondary-300 mb-2" />
                <h3 className="font-semibold text-lg">{t('awarded_projects')}</h3>
                <p className="text-sm text-white/70 mt-1">{t('recognition')}</p>
              </div>
            </div>
            <div className="space-y-4 mt-10">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl h-48 flex flex-col justify-center transform hover:translate-y-[-5px] transition-all duration-300 border border-white/10">
                <Layers className="h-10 w-10 text-accent-orange mb-2" />
                <h3 className="font-semibold text-lg">{t('integrated_solutions')}</h3>
                <p className="text-sm text-white/70 mt-1">{t('engineering_logistics')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl h-36 flex flex-col justify-center transform hover:translate-y-[-5px] transition-all duration-300 border border-white/10">
                <div className="font-bold text-4xl text-secondary-300">+15</div>
                <p className="text-sm text-white/70">{t('projects_implemented')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
