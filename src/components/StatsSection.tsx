
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useStatsData } from "@/hooks/useStrapi";

interface Stat {
  value: number;
  label: string;
  labelKey: string;
  prefix?: string;
  suffix?: string;
}

export function StatsSection() {
  const { t } = useLanguage();
  const { data: rawStatsData, loading, error } = useStatsData();
  const statsData = rawStatsData as any[]; // Cast to any because Strapi generic return might be unknown

  const fallbackStats: Stat[] = [
    { value: 10, label: "Anos de Experiência", labelKey: "years_exp", suffix: "+" },
    { value: 50, label: "Projetos Concluídos", labelKey: "projects_completed", suffix: "+" },
    { value: 30, label: "Clientes Satisfeitos", labelKey: "satisfied_clients", suffix: "+" },
    { value: 98, label: "Taxa de Sucesso", labelKey: "success_rate", suffix: "%" }
  ];

  const stats = statsData && statsData.length > 0 ? statsData.map(stat => ({
    value: parseInt(stat.value) || 0,
    label: stat.label,
    labelKey: stat.label,
    prefix: stat.prefix || '',
    suffix: stat.suffix || ''
  })) : fallbackStats;

  // Para animação de contagem
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    if (loading) return;

    stats.forEach((stat, index) => {
      const duration = 2000; // ms
      const increment = stat.value / (duration / 16); // 60fps ideal
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(Math.ceil(current), stat.value);
          return newCounts;
        });

        if (current >= stat.value) {
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    });
  }, [stats, loading]);

  if (loading) {
    return (
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-card relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] dark:bg-grid-white/[0.02] bg-grid-black/[0.02]"></div>
      <div className="absolute top-0 right-0 p-20 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 p-20 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3 group hover:-translate-y-1 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.prefix}{Math.round(counts[index] || 0)}{stat.suffix}
              </div>
              <p className="text-muted-foreground font-medium text-lg">
                {'id' in stat ? stat.label : t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
