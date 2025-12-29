
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);
  
  return (
    <div className="flex min-h-screen flex-col bg-background w-full overflow-hidden">
      <Navbar />
      <main className="flex-1 animate-fade-in">{children}</main>
      <Footer />
    </div>
  );
}
