
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Download, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Define text color based on scroll state and theme
  const getTextColor = () => {
    if (!isScrolled) return "text-white";
    if (theme === "dark" && isScrolled) return "text-black";
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "glass-nav py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-padding max-w-7xl mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">R</span>
            <span className={cn("font-heading text-xl font-bold tracking-tight transition-colors", getTextColor())}>
              Renato<span className="text-primary">.Dev</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {[
                { path: "/", label: t('home') },
                { path: "/sobre", label: t('about') },
                { path: "/projetos", label: t('projects') },
                { path: "/blog", label: t('blog') },
                { path: "/contato", label: t('contact') },
              ].map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-semibold"
                        : cn("hover:bg-primary/5 hover:text-primary", getTextColor())
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className={cn("rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors", getTextColor())}
              aria-label="Toggle Language"
            >
              <Globe className="h-4 w-4" />
              <span className="ml-1 text-[10px] font-bold">{language.toUpperCase()}</span>
            </Button>
            <ThemeToggle />
            <Button size="sm" className="rounded-full gap-2 shadow-lg shadow-primary/25" variant="default" asChild>
              <a href={`${import.meta.env.BASE_URL}renato_santos_curriculo.pdf`} download>
                <Download className="h-4 w-4" />
                <span className="font-semibold">{t('download_cv')}</span>
              </a>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className={cn("rounded-full", getTextColor())}
          >
            <span className="text-xs font-bold">{language.toUpperCase()}</span>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className={getTextColor()}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden animate-fade-in">
          <nav className="container grid gap-4 p-6">
            <Link
              to="/"
              className={cn(
                "flex items-center justify-between py-4 px-2 text-base font-medium rounded-md",
                isActive("/") ? "text-primary bg-primary/5" : "hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              {t('home')} <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              to="/sobre"
              className={cn(
                "flex items-center justify-between py-4 px-2 text-base font-medium rounded-md",
                isActive("/sobre") ? "text-primary bg-primary/5" : "hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              {t('about')} <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              to="/projetos"
              className={cn(
                "flex items-center justify-between py-4 px-2 text-base font-medium rounded-md",
                isActive("/projetos") ? "text-primary bg-primary/5" : "hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              {t('projects')} <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              to="/blog"
              className={cn(
                "flex items-center justify-between py-4 px-2 text-base font-medium rounded-md",
                isActive("/blog") ? "text-primary bg-primary/5" : "hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              {t('blog')} <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contato"
              className={cn(
                "flex items-center justify-between py-4 px-2 text-base font-medium rounded-md",
                isActive("/contato") ? "text-primary bg-primary/5" : "hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              {t('contact')} <ChevronRight className="h-5 w-5" />
            </Link>
            <div className="pt-4">
              <Button className="w-full flex gap-2 items-center justify-center rounded-full" asChild>
                <a href={`${import.meta.env.BASE_URL}renato_santos_curriculo.pdf`} download>
                  <Download className="h-4 w-4" />
                  <span>{t('download_cv')}</span>
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
