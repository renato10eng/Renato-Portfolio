import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";
import { Code2, Zap } from "lucide-react";

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

  const renderSkillBar = (skill: Skill, color: 'primary' | 'secondary') => (
    <div key={`${skill.nameKey}-${skill.level}`} className="space-y-3 group">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{t(skill.nameKey)}</span>
        <span className={`font-bold text-sm ${color === 'primary' ? 'text-primary' : 'text-secondary'}`}>{skill.level}%</span>
      </div>
      <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
        <Progress 
          value={skill.level} 
          className="h-full"
        />
        <div className={`absolute inset-0 bg-gradient-to-r h-2.5 ${color === 'primary' ? 'from-primary/60 to-primary' : 'from-secondary/60 to-secondary'} rounded-full`}
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-30 -z-10 animate-float animation-delay-500" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-20 -z-10 animate-float animation-delay-300" />

      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/5 border border-primary/30 dark:border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
            <Zap className="h-3.5 w-3.5" />
            {t('professional_skills')}
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-foreground leading-tight">
            {t('skills_subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Expertise comprovada em gestão, otimização e inovação contínua
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Engineering Skills Card */}
          <div className="glass-card p-8 md:p-12 space-y-8 animate-slide-up group">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-foreground">
                  {t('engineering_production')}
                </h3>
              </div>
            </div>

            <div className="space-y-7">
              {engineeringSkills.map((skill) => renderSkillBar(skill, 'primary'))}
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Expertise em gestão estratégica e otimização de processos
              </p>
            </div>
          </div>

          {/* Logistics Skills Card */}
          <div className="glass-card p-8 md:p-12 space-y-8 animate-slide-up animation-delay-200 group">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-secondary to-accent" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-foreground">
                  {t('logistics')}
                </h3>
              </div>
            </div>

            <div className="space-y-7">
              {logisticsSkills.map((skill) => renderSkillBar(skill, 'secondary'))}
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Expertise em supply chain e gestão de inventário
              </p>
            </div>
          </div>
        </div>

        {/* Skills Stats */}
        <div className="grid grid-cols-3 gap-4 mt-20 animate-fade-in-up animation-delay-400">
          <div className="glass-card p-6 text-center group hover:border-primary/50 transition-all">
            <p className="text-3xl font-black text-primary group-hover:scale-110 transition-transform">15+</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-2">Projetos</p>
          </div>
          <div className="glass-card p-6 text-center group hover:border-secondary/50 transition-all">
            <p className="text-3xl font-black text-secondary group-hover:scale-110 transition-transform">8</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-2">Competências</p>
          </div>
          <div className="glass-card p-6 text-center group hover:border-accent/50 transition-all">
            <p className="text-3xl font-black text-accent group-hover:scale-110 transition-transform">85%</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-2">Avançado</p>
          </div>
        </div>
      </div>
    </section>
  );
}
