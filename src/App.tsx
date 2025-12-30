
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectModalTransporte from "./pages/ProjectModalTransporte";
import ModaisTransporte from "./pages/ModaisTransporte";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import EngineeringPage from "./pages/EngineeringPage";
import LogisticsPage from "./pages/LogisticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Detectar preferência de tema do sistema ao iniciar
  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      root.classList.add(savedTheme);
    } else {
      root.classList.add(isDark ? "dark" : "light");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/projetos/:id" element={<ProjectDetail />} />
              <Route path="/projetos/10" element={<ProjectModalTransporte />} />
              <Route path="/modais-transporte" element={<ModaisTransporte />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/frontend" element={<EngineeringPage />} />
              <Route path="/backend" element={<LogisticsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
