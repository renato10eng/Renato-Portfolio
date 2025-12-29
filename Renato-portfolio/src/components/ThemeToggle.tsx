
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window !== "undefined" ? 
      (localStorage.getItem("theme") as "light" | "dark") || "light" 
      : "light"
  );
  const { t } = useLanguage();

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={theme === "light" ? t('switch_dark') : t('switch_light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{theme === "light" ? t('switch_dark') : t('switch_light')}</span>
    </Button>
  );
}
