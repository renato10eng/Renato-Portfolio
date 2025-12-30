
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
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "border-b border-border bg-background/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">EP</span>
            <span className={cn("font-heading text-xl font-bold tracking-tight", getTextColor())}>Renato Dev</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    getTextColor(),
                    isActive("/") ? "bg-primary/20" : "hover:bg-primary/10"
                  )}
                >
                  {t('home')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/sobre" 
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    getTextColor(),
                    isActive("/sobre") ? "bg-primary/20" : "hover:bg-primary/10"
                  )}
                >
                  {t('about')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/projetos" 
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    getTextColor(),
                    isActive("/projetos") ? "bg-primary/20" : "hover:bg-primary/10"
                  )}
                >
                  {t('projects')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/blog" 
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    getTextColor(),
                    isActive("/blog") ? "bg-primary/20" : "hover:bg-primary/10"
                  )}
                >
                  {t('blog')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/contato" 
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    getTextColor(),
                    isActive("/contato") ? "bg-primary/20" : "hover:bg-primary/10"
                  )}
                >
                  {t('contact')}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage} 
            className={cn("rounded-full", getTextColor())}
            aria-label="Toggle Language"
          >
            <Globe className="h-5 w-5" />
            <span className="ml-1 text-xs font-medium">{language.toUpperCase()}</span>
          </Button>
          <ThemeToggle />
          <Button size="sm" className="rounded-full gap-1.5" variant="default" asChild>
            <a href={`${import.meta.env.BASE_URL}renato_santos_curriculo.pdf`} download>
              <Download className="h-4 w-4" />
              <span>{t('download_cv')}</span>
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage} 
            className={cn("rounded-full", getTextColor())}
            aria-label="Toggle Language"
          >
            <Globe className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu" className={getTextColor()}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
