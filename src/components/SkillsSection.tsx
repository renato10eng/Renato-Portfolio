
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";

interface Skill {
  name: string;
  nameKey: string;
  level: number;
  category: string;
}

export function SkillsSection() {
  const { t } = useLanguage();
  
  const skills: Skill[] = [
    { name: "Gestão de Projetos", nameKey: "project_management", level: 85, category: "engenharia" },
    { name: "Análise de Processos", nameKey: "process_analysis", level: 80, category: "engenharia" },
    { name: "Controle de Qualidade", nameKey: "quality_control", level: 75, category: "engenharia" },
    { name: "Lean Manufacturing", nameKey: "lean_manufacturing", level: 90, category: "engenharia" },
    { name: "Gestão da Cadeia de Suprimentos", nameKey: "supply_chain_management", level: 90, category: "logistica" },
    { name: "Gestão de Inventário", nameKey: "inventory_management", level: 85, category: "logistica" },
    { name: "Planejamento de Rotas", nameKey: "route_planning", level: 70, category: "logistica" },
    { name: "Otimização de Armazenamento", nameKey: "storage_optimization", level: 80, category: "logistica" },
  ];

  const engineeringSkills = skills.filter(skill => skill.category === "engenharia");
  const logisticsSkills = skills.filter(skill => skill.category === "logistica");

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="section-title text-center">{t('professional_skills')}</h2>
        <p className="section-subtitle text-center">
          {t('skills_subtitle')}
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 font-heading text-primary-800 dark:text-primary-400">
              {t('engineering_production')}
            </h3>
            <div className="space-y-6">
              {engineeringSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{t(skill.nameKey)}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 font-heading text-secondary-700 dark:text-secondary-400">
              {t('logistics')}
            </h3>
            <div className="space-y-6">
              {logisticsSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{t(skill.nameKey)}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
