import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "./ui/badge";

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
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase">
            {t('professional_skills')}
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            {t('skills_subtitle')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="glass-card p-8 md:p-10 space-y-8 animate-slide-up">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-12 w-1 rounded-full bg-primary" />
              <h3 className="text-2xl font-bold font-heading text-foreground">
                {t('engineering_production')}
              </h3>
            </div>

            <div className="space-y-8 h-full">
              {engineeringSkills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-medium text-lg text-foreground/90">{t(skill.nameKey)}</span>
                    <span className="font-bold text-primary">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2.5 bg-muted" indicatorClassName="bg-gradient-to-r from-primary to-primary/70" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 space-y-8 animate-slide-up animation-delay-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-12 w-1 rounded-full bg-secondary" />
              <h3 className="text-2xl font-bold font-heading text-foreground">
                {t('logistics')}
              </h3>
            </div>

            <div className="space-y-8 h-full">
              {logisticsSkills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-medium text-lg text-foreground/90">{t(skill.nameKey)}</span>
                    <span className="font-bold text-secondary">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2.5 bg-muted" indicatorClassName="bg-gradient-to-r from-secondary to-secondary/70" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
