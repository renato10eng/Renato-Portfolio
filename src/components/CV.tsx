
import React from 'react';
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";

// Componente de botão para download do CV
export const CVDownloadButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <a href={`${import.meta.env.BASE_URL}renato_santos_curriculo.pdf`} download>
      {children}
    </a>
  );
};

// Componente que exibe o CV em PDF
export const CVViewer = () => {
  return (
    <div className="flex justify-center">
      <Button className="flex items-center gap-2" asChild>
        <a href={`${import.meta.env.BASE_URL}renato_santos_curriculo.pdf`} download>
          <DownloadCloud className="h-4 w-4" />
          Baixar CV
        </a>
      </Button>
    </div>
  );
};
