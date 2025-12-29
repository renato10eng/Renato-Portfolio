
// MapaBrasilinterativo.tsx
import React, { useRef, useEffect, useState } from 'react';
import MapaBrasilSVG from '@/assets/MapaBrasil.svg?react'; // MapaBrasil.svg?react';
import styles from './mapainterativo.module.css';

type Props = {
  onEstadoSelecionado?: (sigla: string) => void;
  getStateColor?: (sigla: string) => string;
  onDoubleClick?: () => void;
};

export default function MapaBrasilInterativo({ onEstadoSelecionado, getStateColor, onDoubleClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({ visible: false, text: '', x: 0, y: 0 });

  // 1) Posiciona siglas e aplica classe base a cada <g>
  useEffect(() => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;

    // Garante que todos os elementos de path tenham pointer-events
    svg.querySelectorAll('path').forEach(path => {
      path.style.pointerEvents = 'auto';
    });

    svg.querySelectorAll<SVGGElement>('g[id]').forEach((g) => {
      // Verifica se o ID corresponde a uma sigla de estado válida (2 letras maiúsculas)
      if (/^[A-Z]{2}$/.test(g.id)) {
        g.classList.add(styles.stateGroup);
        
        const path = g.querySelector<SVGPathElement>('path');
        const text = g.querySelector<SVGTextElement>('text');
        
        if (path && text) {
          path.style.pointerEvents = 'auto';
          
          // Centraliza o texto na path
          const { x, y, width, height } = path.getBBox();
          const cx = x + width / 2;
          const cy = y + height / 2;
          
          text.setAttribute('x', cx.toString());
          text.setAttribute('y', cy.toString());
          text.setAttribute('fill', '#000');
          text.setAttribute('font-size', '4200');
          text.setAttribute('font-weight', 'bold');
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('pointer-events', 'none');
          text.setAttribute('stroke', '#F1FAEE');
          text.setAttribute('stroke-width', '300');
          text.setAttribute('stroke-linecap', 'round');
          text.setAttribute('stroke-linejoin', 'round');
          text.setAttribute('dominant-baseline', 'central');
          text.setAttribute('paint-order', 'stroke');
        }
        
        // Adiciona evento de clique ao grupo do estado
        g.addEventListener('click', (evt) => {
          evt.stopPropagation();
          const newState = g.id === selectedState ? "todos" : g.id;
          onEstadoSelecionado?.(newState);
          
        });

         // Adicionar evento de duplo clique
        g.addEventListener('dblclick', (evt) => {
          evt.stopPropagation();
          if (onDoubleClick) {
            onDoubleClick();
          }
        });

      }
    });
  }, [onEstadoSelecionado, onDoubleClick, selectedState]);


  // Novo useEffect para atualizar cores
  useEffect(() => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg || !getStateColor) return;
  
    // Função otimizada para atualização de cores
    const updateColors = () => {
      const states = svg.querySelectorAll<SVGGElement>('g[id]');
      states.forEach(g => {
        const sigla = g.id;
        if (/^[A-Z]{2}$/.test(sigla)) {
          const path = g.querySelector<SVGPathElement>('path');
          if (path) {
            path.style.fill = getStateColor(sigla);
          }
        }
      });
    };
  
    // Executa apenas uma vez após renderização inicial
    updateColors();
    
    // Remove o MutationObserver e usa um event listener mais eficiente
    const timer = setInterval(updateColors, 500); // Atualiza a cada 500ms
    return () => clearInterval(timer);
  }, [getStateColor]);



  // Manipulador de mouse over
  const handleMouseOver = (event: React.MouseEvent) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    
    // Busca pelo elemento pai <g> com id (estado)
    let target = event.target as Element;
    
    while (target && target.tagName.toLowerCase() !== 'svg') {
      if (target.tagName.toLowerCase() === 'g' && target.id && /^[A-Z]{2}$/.test(target.id)) {
        // Adiciona classe de destaque
        target.classList.add(styles.highlighted);
        
        // Configura tooltip
        setTooltip({
          visible: true,
          text: target.id,
          x: event.clientX - box.left,
          y: event.clientY - box.top,
        });
        break;
      }
      target = target.parentElement as Element;
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!tooltip.visible) return;
    
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    
    setTooltip(prev => ({
      ...prev,
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    }));
  };

  // Mouse sai remove highlight e esconde tooltip
  const handleMouseOut = (event: React.MouseEvent) => {
    // Busca pelo elemento pai <g> com id (estado)
    let target = event.target as Element;
    
    while (target && target.tagName.toLowerCase() !== 'svg') {
      if (target.tagName.toLowerCase() === 'g' && target.id && /^[A-Z]{2}$/.test(target.id)) {
        // Remove classe de destaque
        target.classList.remove(styles.highlighted);
        
        // Esconde tooltip
        setTooltip(prev => ({ 
          ...prev, 
          visible: false 
        }));
        break;
      }
      target = target.parentElement as Element;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.mapContainer} w-full mx-auto`}
    >
      <MapaBrasilSVG
        onMouseOver={handleMouseOver}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        className="w-full h-auto"
        // Desativa o comportamento de drag padrão do SVG
        onDragStart={(e) => e.preventDefault()}
      />
      <div
        className={`${styles.tooltip} ${
          tooltip.visible ? styles.tooltipVisible : ''
        }`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        {tooltip.text}
      </div>
    </div>
  );
}