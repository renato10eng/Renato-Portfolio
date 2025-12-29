
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Stat {
  value: number;
  label: string;
  labelKey: string;
  prefix?: string;
  suffix?: string;
}

export function StatsSection() {
  const { t } = useLanguage();
  
  const stats: Stat[] = [
    { value: 10, label: "Anos de Experiência", labelKey: "years_exp", suffix: "+" },
    { value: 50, label: "Projetos Concluídos", labelKey: "projects_completed", suffix: "+" },
    { value: 30, label: "Clientes Satisfeitos", labelKey: "satisfied_clients", suffix: "+" },
    { value: 98, label: "Taxa de Sucesso", labelKey: "success_rate", suffix: "%" }
  ];

  // Para animação de contagem
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
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
  }, []);

  return (
    <section className="py-16 bg-primary-800 dark:bg-primary-900 text-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold font-heading">
                {stat.prefix}{Math.round(counts[index])}{stat.suffix}
              </div>
              <p className="text-primary-200">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
