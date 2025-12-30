//ModaisTransporte.tsx

import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Info, BarChart2, PieChart, LineChart,
   TrainFront, Plane, Truck, Ship, Route
 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RePieChart, 
  Pie, 
  LineChart as ReLineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';
import { useLanguage } from "../context/LanguageContext";
import MapaBrasilInterativo from "@/components/MapaBrasilInterativo";
import { estadosDados, estadosBrasileiros, EstadoDados } from "../data/dadosEstados"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";



// Cores para os modais
const CORES_MODAIS = {
  rodoviario: "#FFB300",   //#1E88E5
  ferroviario: "#43A047",  //#43A047
  aquaviario: "#1E88E5",   //#5E35B1
  aereo: "#FF5722",        //#FF5722
  dutoviario: "#6D6A75"    //#FFB300
};

const tipos = [
  { key: "todos", label: "Todos", color: "" },
  { key: "rodoviario", label: "Rodoviário", color: "#FFB300" },
  { key: "ferroviario", label: "Ferroviário", color: "#43A047" },
  { key: "aquaviario", label: "Aquaviário", color: "#1E88E5" },
  { key: "aereo", label: "Aéreo", color: "#FF5722" },
  { key: "dutoviario", label: "Dutoviário", color: "#6D6A75" },
];

interface FonteDados {
  fonte: string;
  descricao: {
    pt: string;
    en: string;
  };
  data: string;
};

// Dados das fontes
const fontesDados: FonteDados[] = [
  {
    fonte: "DNIT",
    descricao: {
      pt: "Dados Painel de Business Intelligence com dados sobre emissões de CO₂ e Cadastro Nacional de Transportadores.",
      en: "Business Intelligence Panel data with information on CO₂ emissions and the National Registry of Transport Operators."
    },
    data: "2024"
  },
  {
    fonte: "ANTT",
    descricao: {
      pt: "Dados de transporte rodoviário e ferroviário.",
      en: "Road and rail transport data."
    },
    data: "2023"
  },
  {
    fonte: "ANTAQ",
    descricao: {
      pt: "Estatísticas de transporte aquaviário.",
      en: "Waterway transport statistics."
    },
    data: "2023"
  },
  {
    fonte: "ANAC",
    descricao: {
      pt: "Dados Informações sobre o setor aeronáutico, complementando a compreensão dos modais de transporte e região.",
      en: "Information on the aviation sector, complementing the understanding of transport modes and regions."
    },
    data: "2022"
  },
  {
    fonte: "IBGE",
    descricao: {
      pt: "Dados socio econômicos atualizados.",
      en: "Updated socioeconomic data."
    },
    data: "2024"
  },
  {
    fonte: "CNT",
    descricao: {
      pt: "Dados Análises comparativas por modal e região.",
      en: "Comparative modal and regional transport analyses."
    },
    data: "2023"
  },
  {
    fonte: "ONTL",
    descricao: {
      pt: "Séries históricas desde 2010 e projeções para 2035, e o Painel Nacional de Logística (2025) aponta tendências em automação e sustentabilidade.",
      en: "Historical series since 2010 and projections through 2035; the National Logistics Panel (2025) highlights trends in automation and sustainability."
    },
    data: "2024"
  }
];


// Informações dos modais
const modaisInfo = {
  rodoviario: {
    icon: "Truck",
    color: CORES_MODAIS.rodoviario,
    image: "images/rodoviario_img.jpg",
    //image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2675&auto=format&fit=crop",
   // text: "O modal rodoviário é o principal meio de transporte de cargas no Brasil, respondendo por 61% da movimentação logística nacional. Atualmente, sua participação na matriz de transporte chega a 62%, acompanhada de um aumento de 4,2% nos custos em 2024. A atuação deste setor é concentrada em estados como São Paulo, Minas Gerais e Paraná, que dispõem das mais extensas redes de rodovias. Em uma comparação global, o Brasil ocupa a 5ª posição em extensão rodoviária (1,7 milhões de km), mas enfrenta o desafio de que apenas 12% dessas rodovias são pavimentadas, enquanto nos EUA esse índice atinge 65%. Apesar de sua importância e flexibilidade, os altos custos operacionais, a necessidade constante de manutenção e os impactos ambientais ressaltam a urgência de investimentos e inovações para assegurar sua competitividade e sustentabilidade."
  },
  ferroviario: {
    icon: "TrainFront",
    color: CORES_MODAIS.ferroviario,
    image: "images/Trem  png.png",
   // image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=2670&auto=format&fit=crop",
   // text: "Responsável por 21% do transporte de cargas, o modal ferroviário destaca-se pela capacidade de movimentar grandes volumes com custos operacionais mais baixos e menor impacto ambiental. Este setor é especialmente relevante no transporte de minério, tendo movimentado 489,3 milhões de toneladas em 2023, com forte presença em estados como Minas Gerais, Pará e Maranhão. Em termos comparativos, a malha ferroviária brasileira, com 31 mil km, é 25 vezes menor que a dos EUA (300 mil km) e 4 vezes menor que a da China (124 mil km). Em 2023, foram investidos R$ 13,74 bilhões para expansão no Centro-Oeste, exemplificado por projetos como a Ferrovia Norte-Sul. Ademais, o potencial deste modal é evidente: cada trem pode substituir 220 caminhões, contribuindo para uma redução de 60% nas emissões de CO₂. Contudo, para reduzir a dependência dos modais tradicionais, torna-se imprescindível a modernização e a expansão contínua da malha ferroviária."
  },
  aquaviario: {
    icon: "Boat",
    color: CORES_MODAIS.aquaviario,
    image: "images/aquaviario_img.png",
    //image: "https://images.unsplash.com/photo-1624138230928-a9f607aaeec2?q=80&w=2671&auto=format&fit=crop",
    //text: "Com 13% da movimentação de cargas, o modal aquaviário desempenha um papel crucial, sobretudo na região Norte, onde o transporte fluvial é vital para conectar áreas com desafios geográficos. Em 2024, observou-se um crescimento expressivo de 90,46% na cabotagem no Nordeste, impulsionado por commodities como a soja. Comparativamente, o Brasil ocupa a 16ª posição em movimentação portuária, enquanto países como a Holanda, que figuram no 2º lugar, movimentam quatro vezes mais carga. A infraestrutura também se destaca por meio de hidrovias como a do Madeira (RO/AM), que transporta cerca de 1,5 milhão de toneladas anuais, embora apenas 1% dos investimentos logísticos seja destinado a esse setor. Investir na modernização dos portos e na ampliação das hidrovias é, portanto, essencial para promover uma logística mais integrada e eficiente."
  },
  aereo: {
    icon: "Plane",
    color: CORES_MODAIS.aereo,
    image: "images/aereo_img.jpg",
    //image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop",
   // text: "Embora o modal aéreo represente apenas 2% do volume total, ele é essencial para o transporte de cargas de alto valor agregado, como eletrônicos e fármacos. Em 2024, o setor registrou o transporte de 1,4 milhão de toneladas, com um crescimento de 12% especificamente no segmento de fármacos. Em uma análise comparativa, o Brasil conta com cerca de 3 mil aeroportos de carga, em contraste com os 13 mil dos EUA e 5 mil da China. Contudo, o modal aéreo enfrenta desafios significativos, como tarifas que podem ser até cinco vezes superiores às rodoviárias, além de uma infraestrutura concentrada majoritariamente em Guarulhos (SP), o que restringe sua expansão e eficiência."
  },
  dutoviario: {
    icon: "Route",
    color: CORES_MODAIS.dutoviario,
    image: "images/dutoviario_img.jpg",
   // image: "https://images.unsplash.com/photo-1578575752694-7b74ff3387a9?q=80&w=2670&auto=format&fit=crop",
  //text: "Utilizado principalmente para o transporte de líquidos e gases – como petróleo, gás natural e produtos químicos – o modal dutoviário representa 4% do transporte total, movimentando aproximadamente 170 milhões de m³/ano. Em comparação global, a rede dutoviária brasileira, com 1.600 km, é 500 vezes menor que a dos EUA, que possui cerca de 800 mil km. Projetos estratégicos, como o Gasoduto Bolívia-Brasil, que abastece 70% da demanda industrial do Sudeste, evidenciam a importância desse modal. Entre suas principais vantagens estão os custos operacionais até 80% menores e um risco quase nulo de roubos, tornando-o um componente fundamental para otimizar o fluxo de commodities e insumos energéticos, além de complementar os demais modais."
  }
};

// Sobre o Projeto
const sobreProjeto = {
  title: "Sobre o Projeto",
  icon: "Info",
  image: "images/Modais de Transporte no Brasil.jpg",
  //image: "https://images.unsplash.com/photo-1492168732976-2676c584c675?q=80&w=2670&auto=format&fit=crop",
 // text: "Este dashboard interativo analisa a distribuição dos modais de transporte no Brasil, integrando dados atualizados até 2024 e projeções estratégicas para 2025. Com uma abordagem inovadora e visualmente intuitiva, o projeto oferece insights profundos sobre a infraestrutura logística nacional e incorpora análises do Painel Nacional de Logística (2025), mapeando os principais desafios e oportunidades do setor. Ao integrar informações provenientes de fontes oficiais e confiáveis, a ferramenta se torna estratégica para gestores, formuladores de políticas públicas e empresas do setor, facilitando a tomada de decisões que impulsionem a eficiência e a competitividade do transporte no país. Por meio do compartilhamento transparente de dados e análises, este projeto contribui para um desenvolvimento logístico mais sustentável e integrado."
};




// Componente principal
function ModaisTransporte() {
 
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("todos");
  const [dadosEstado, setDadosEstado] = useState<EstadoDados | null>(null);
  const [tipoGrafico, setTipoGrafico] = useState<"barra" | "pizza" | "linha">("barra");
  const { language } = useLanguage();
  const [ativo, setAtivo] = useState("todos");
  const [modoRanking, setModoRanking] = useState(false);
  //const [showInfo, setShowInfo] = useState(false);
  
 
  // Translations
  
  const texts = {
    pt: {
      pageTitle: "Modais de Transporte no Brasil",
      pageSubtitle: "Análise interativa dos diferentes modais de transporte utilizados em cada estado brasileiro, com visualização geográfica e comparação de dados.",
      backToProject: "Voltar para detalhes do projeto",
      tags: ["Logística", "Modais", "Transporte", "Mapa Interativo"],
      dateLabel: "Data",
      visualizationTitle: "Visualização dos Modais de Transporte por Estado",
      selectState: "Selecione um estado",
      chartTypes: ["Barras", "Pizza", "Linha"],
      mapTitle: "Mapa Interativo do Brasil",
      mapDescription: "Mapa ilustrativo dos estados brasileiros. O estado selecionado ({state}) seria destacado, mostrando os modais de transporte predominantes.",
      stateSelected: "{state} selecionado",
      utilizationTitle: "Utilização de Modais: {state}",
      infoTitle: "Detalhes da Infraestrutura: {state}",
      transportModes: {
        road: "Rodoviário",
        rail: "Ferroviário",
        water: "Aquaviário",
        air: "Aéreo",
        pipeline: "Dutoviário"
      },
      infraDetails: {
        road: "Rodovias pavimentadas e não pavimentadas",
        rail: "Malha ferroviária operacional",
        water: "Vias navegáveis e hidrovias",
        air: "Comerciais e regionais",
        pipeline: "Dutos para transporte de produtos"
      },
      aboutTitle: "Sobre os Modais de Transporte",
      aboutP1: "O Brasil utiliza diversos modais de transporte para movimentar pessoas e cargas por todo seu vasto território. Cada estado possui características próprias em sua matriz de transportes, refletindo suas particularidades geográficas, econômicas e históricas.",
      aboutP2: "Esta ferramenta interativa permite analisar a distribuição percentual dos cinco principais modais de transporte em cada estado brasileiro, além de oferecer dados sobre a infraestrutura disponível, facilitando comparações e análises de potencial logístico regional.",
      aspectsTitle: "Principais Aspectos Analisados:",
      aspects: [
        "Distribuição percentual dos modais por estado",
        "Infraestrutura existente (quilometragem, número de aeroportos)",
        "Predominância regional de determinados modais",
        "Potencial de integração intermodal"
      ],
      modesTitle: "Modais de Transporte",
      modeDescriptions: {
        road: "Principal modal no Brasil, composto por rodovias federais, estaduais e municipais. Transporta a maior parte das cargas e passageiros no país.",
        rail: "Utilizado principalmente para transporte de cargas em longas distâncias, especialmente granéis sólidos, como minérios e grãos.",
        water: "Compreende navegação fluvial (rios) e marítima (costa). Fundamental em regiões como a Amazônia e para o comércio exterior.",
        air: "Utilizado principalmente para transporte de passageiros e cargas de alto valor agregado ou perecíveis que exigem rapidez.",
        pipeline: "Sistema de tubulações para transporte de fluidos, como petróleo, gás natural e derivados, interligando regiões produtoras, refinarias e centros consumidores."
      },
      backButton: "Voltar para detalhes do projeto",
      projectAbout: "Sobre o Projeto",
      textprojectAbout: "Este dashboard interativo analisa a distribuição dos modais de transporte no Brasil, integrando dados atualizados até 2024 e projeções estratégicas para 2025. Com uma abordagem inovadora e visualmente intuitiva, o projeto oferece insights profundos sobre a infraestrutura logística nacional e incorpora análises do Painel Nacional de Logística (2025), mapeando os principais desafios e oportunidades do setor. Ao integrar informações provenientes de fontes oficiais e confiáveis, a ferramenta se torna estratégica para gestores, formuladores de políticas públicas e empresas do setor, facilitando a tomada de decisões que impulsionem a eficiência e a competitividade do transporte no país. Por meio do compartilhamento transparente de dados e análises, este projeto contribui para um desenvolvimento logístico mais sustentável e integrado.",
      textRoad: "O modal rodoviário é o principal meio de transporte de cargas no Brasil, respondendo por 61% da movimentação logística nacional. Atualmente, sua participação na matriz de transporte chega a 62%, acompanhada de um aumento de 4,2% nos custos em 2024. A atuação deste setor é concentrada em estados como São Paulo, Minas Gerais e Paraná, que dispõem das mais extensas redes de rodovias. Em uma comparação global, o Brasil ocupa a 5ª posição em extensão rodoviária (1,7 milhões de km), mas enfrenta o desafio de que apenas 12% dessas rodovias são pavimentadas, enquanto nos EUA esse índice atinge 65%. Apesar de sua importância e flexibilidade, os altos custos operacionais, a necessidade constante de manutenção e os impactos ambientais ressaltam a urgência de investimentos e inovações para assegurar sua competitividade e sustentabilidade.",
      textRail: "Responsável por 21% do transporte de cargas, o modal ferroviário destaca-se pela capacidade de movimentar grandes volumes com custos operacionais mais baixos e menor impacto ambiental. Este setor é especialmente relevante no transporte de minério, tendo movimentado 489,3 milhões de toneladas em 2023, com forte presença em estados como Minas Gerais, Pará e Maranhão. Em termos comparativos, a malha ferroviária brasileira, com 31 mil km, é 25 vezes menor que a dos EUA (300 mil km) e 4 vezes menor que a da China (124 mil km). Em 2023, foram investidos R$ 13,74 bilhões para expansão no Centro-Oeste, exemplificado por projetos como a Ferrovia Norte-Sul. Ademais, o potencial deste modal é evidente: cada trem pode substituir 220 caminhões, contribuindo para uma redução de 60% nas emissões de CO₂. Contudo, para reduzir a dependência dos modais tradicionais, torna-se imprescindível a modernização e a expansão contínua da malha ferroviária.",
      textWaterway: "Com 13% da movimentação de cargas, o modal aquaviário desempenha um papel crucial, sobretudo na região Norte, onde o transporte fluvial é vital para conectar áreas com desafios geográficos. Em 2024, observou-se um crescimento expressivo de 90,46% na cabotagem no Nordeste, impulsionado por commodities como a soja. Comparativamente, o Brasil ocupa a 16ª posição em movimentação portuária, enquanto países como a Holanda, que figuram no 2º lugar, movimentam quatro vezes mais carga. A infraestrutura também se destaca por meio de hidrovias como a do Madeira (RO/AM), que transporta cerca de 1,5 milhão de toneladas anuais, embora apenas 1% dos investimentos logísticos seja destinado a esse setor. Investir na modernização dos portos e na ampliação das hidrovias é, portanto, essencial para promover uma logística mais integrada e eficiente.",
      textAir: "Embora o modal aéreo represente apenas 2% do volume total, ele é essencial para o transporte de cargas de alto valor agregado, como eletrônicos e fármacos. Em 2024, o setor registrou o transporte de 1,4 milhão de toneladas, com um crescimento de 12% especificamente no segmento de fármacos. Em uma análise comparativa, o Brasil conta com cerca de 3 mil aeroportos de carga, em contraste com os 13 mil dos EUA e 5 mil da China. Contudo, o modal aéreo enfrenta desafios significativos, como tarifas que podem ser até cinco vezes superiores às rodoviárias, além de uma infraestrutura concentrada majoritariamente em Guarulhos (SP), o que restringe sua expansão e eficiência.",
      textPipeline: "Utilizado principalmente para o transporte de líquidos e gases – como petróleo, gás natural e produtos químicos – o modal dutoviário representa 4% do transporte total, movimentando aproximadamente 170 milhões de m³/ano. Em comparação global, a rede dutoviária brasileira, com 1.600 km, é 500 vezes menor que a dos EUA, que possui cerca de 800 mil km. Projetos estratégicos, como o Gasoduto Bolívia-Brasil, que abastece 70% da demanda industrial do Sudeste, evidenciam a importância desse modal. Entre suas principais vantagens estão os custos operacionais até 80% menores e um risco quase nulo de roubos, tornando-o um componente fundamental para otimizar o fluxo de commodities e insumos energéticos, além de complementar os demais modais.",
      dataSources: "Fontes de Dados",
      source: "Fonte",
      description: "Descrição",
      modes: {
        road: "Rodoviário",
        rail: "Ferroviário",
        water: "Aquaviário",
        air: "Aéreo",
        pipeline: "Dutoviário"
      },
      learnMore: "Saiba Mais",
      closeButton: "Fechar",
      modalDetailsTitle: "Detalhes da Infraestrutura",
      readMore: "Leia mais",
      readLess: "Leia menos"
    },
    en: {
      pageTitle: "Transport Modes in Brazil",
      pageSubtitle: "Interactive analysis of the different transport modes used in each Brazilian state, with geographic visualization and data comparison.",
      backToProject: "Back to project details",
      tags: ["Logistics", "Modes", "Transport", "Interactive Map"],
      dateLabel: "Date",
      visualizationTitle: "Visualization of Transport Modes by State",
      selectState: "Select a state",
      chartTypes: ["Bar", "Pie", "Line"],
      mapTitle: "Interactive Map of Brazil",
      mapDescription: "Illustrative map of Brazilian states. The selected state ({state}) would be highlighted, showing the predominant transport modes.",
      stateSelected: "{state} selected",
      utilizationTitle: "Modal Utilization: {state}",
      infoTitle: "Infrastructure Details: {state}",
      transportModes: {
        road: "Road",
        rail: "Rail",
        water: "Waterway",
        air: "Air",
        pipeline: "Pipeline"
      },
      infraDetails: {
        road: "Paved and unpaved roads",
        rail: "Operational railway network",
        water: "Navigable waterways",
        air: "Commercial and regional",
        pipeline: "Pipelines for product transport"
      },
      aboutTitle: "About Transport Modes",
      aboutP1: "Brazil uses various transport modes to move people and cargo throughout its vast territory. Each state has its own characteristics in its transport matrix, reflecting its geographical, economic, and historical particularities.",
      aboutP2: "This interactive tool allows you to analyze the percentage distribution of the five main transport modes in each Brazilian state, in addition to offering data on the available infrastructure, facilitating comparisons and analyses of regional logistics potential.",
      aspectsTitle: "Main Aspects Analyzed:",
      aspects: [
        "Percentage distribution of modes by state",
        "Existing infrastructure (mileage, number of airports)",
        "Regional predominance of certain modes",
        "Intermodal integration potential"
      ],
      modesTitle: "Transport Modes",
      modeDescriptions: {
        road: "Main mode in Brazil, consisting of federal, state, and municipal highways. Transports most cargo and passengers in the country.",
        rail: "Mainly used for long-distance cargo transport, especially solid bulk, such as ores and grains.",
        water: "Includes river (fluvial) and sea (maritime) navigation. Fundamental in regions like the Amazon and for foreign trade.",
        air: "Mainly used for transporting passengers and high-value or perishable cargo requiring speed.",
        pipeline: "System of pipelines for transporting fluids, such as oil, natural gas, and derivatives, connecting producing regions, refineries, and consumer centers."
      },
      backButton: "Back to project details",
      projectAbout: "About the Project",
      textprojectAbout: "This interactive dashboard analyzes the distribution of transportation modes in Brazil, integrating up-to-date data through 2024 and strategic projections for 2025. With an innovative and visually intuitive approach, the project offers deep insights into the national logistics infrastructure and incorporates analyses from the National Logistics Panel (2025), mapping the main challenges and opportunities in the sector. By integrating information from official and reliable sources, the tool becomes strategic for managers, policymakers, and companies in the sector, facilitating decision-making that drives efficiency and competitiveness in transportation across the country. Through the transparent sharing of data and analysis, this project contributes to more sustainable and integrated logistics development.",
      textRoad: "The road transport mode is the main means of cargo transportation in Brazil, accounting for 61% of national logistics movement. Currently, its share in the transportation matrix reaches 62%, accompanied by a 4.2% increase in costs in 2024. This sector is concentrated in states such as São Paulo, Minas Gerais, and Paraná, which have the most extensive highway networks. On a global scale, Brazil ranks 5th in road network length (1.7 million km), but faces the challenge that only 12% of its roads are paved—compared to 65% in the United States. Despite its importance and flexibility, high operational costs, constant maintenance needs, and environmental impacts highlight the urgent need for investment and innovation to ensure its competitiveness and sustainability.",
      textRail: "Responsible for 21% of cargo transportation, the rail mode stands out for its ability to move large volumes at lower operational costs and with less environmental impact. This sector is particularly relevant for mineral transportation, having moved 489.3 million tons in 2023, with a strong presence in states such as Minas Gerais, Pará, and Maranhão. Comparatively, Brazil’s railway network, with 31,000 km, is 25 times smaller than that of the U.S. (300,000 km) and 4 times smaller than China's (124,000 km). In 2023, R$13.74 billion was invested in expansion in the Midwest, exemplified by projects like the North-South Railway. Additionally, the potential of this mode is evident: each train can replace 220 trucks, contributing to a 60% reduction in CO₂ emissions. However, to reduce dependence on traditional modes, it is essential to modernize and continuously expand the rail network.",
      textWaterway: "Accounting for 13% of cargo movement, the waterway mode plays a crucial role, especially in the North region, where river transport is vital to connect areas facing geographic challenges. In 2024, a significant 90.46% growth in cabotage was observed in the Northeast, driven by commodities like soybeans. Comparatively, Brazil ranks 16th in port throughput, while countries like the Netherlands, in 2nd place, handle four times more cargo. The infrastructure also features key waterways such as the Madeira River route (RO/AM), which transports around 1.5 million tons annually, although only 1% of logistics investments are allocated to this sector. Investing in port modernization and the expansion of inland waterways is therefore essential to promote more integrated and efficient logistics.",
      textAir: "Although air transport accounts for only 2% of total volume, it is essential for transporting high-value cargo such as electronics and pharmaceuticals. In 2024, the sector recorded the transport of 1.4 million tons, with a 12% growth specifically in the pharmaceutical segment. Comparatively, Brazil has about 3,000 cargo airports, versus 13,000 in the U.S. and 5,000 in China. However, the air mode faces significant challenges, such as tariffs that can be up to five times higher than road transport, and an infrastructure that is primarily concentrated in Guarulhos (SP), which limits its expansion and efficiency.",
      textPipeline: "Mainly used for transporting liquids and gases—such as oil, natural gas, and chemical products—the pipeline mode represents 4% of total transportation, moving approximately 170 million m³ per year. On a global scale, Brazil’s pipeline network, with 1,600 km, is 500 times smaller than that of the U.S., which has about 800,000 km. Strategic projects like the Bolivia–Brazil Gas Pipeline, which supplies 70% of the industrial demand in the Southeast, highlight the importance of this mode. Its main advantages include operational costs up to 80% lower and an almost zero risk of theft, making it a key component in optimizing the flow of commodities and energy inputs, as well as complementing other transport modes.",
      dataSources: "Data Sources",
      source: "Source",
      description: "Description",
      modes: {
        road: "Road",
        rail: "Rail",
        water: "Waterway",
        air: "Air",
        pipeline: "Pipeline"
      },
      learnMore: "Learn More",
      closeButton: "Close",
      modalDetailsTitle: "Infrastructure Details",
      readMore: "Read more",
      readLess: "Read less"
    }
  };
  

  // Get current language texts
  const content = language === 'en' ? texts.en : texts.pt;

  // Modifique a função getStateColor
const getStateColor = (sigla: string): string => {
  if (ativo === 'todos') {
    if (estadoSelecionado === "todos") {
      const estado = estadosDados.find(e => e.sigla === sigla);
      if (!estado) return '#999999';
      const predominant = Object.entries(estado.modais).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      return CORES_MODAIS[predominant as keyof typeof CORES_MODAIS];
    }
    return sigla === estadoSelecionado 
      ? CORES_MODAIS[Object.entries(dadosEstado?.modais || {}).reduce((a, b) => a[1] > b[1] ? a : b)[0]]
      : '#999999';
  }
  
  if (estadoSelecionado === sigla) {
    return CORES_MODAIS[ativo as keyof typeof CORES_MODAIS];
  }
  
  return modoRanking 
    ? '#999999' 
    : CORES_MODAIS[ativo as keyof typeof CORES_MODAIS];
};
 

  // Atualize o handleEstadoSelecionado
const handleEstadoSelecionado = (sigla: string) => {
  if (sigla === estadoSelecionado) {
    setEstadoSelecionado("todos");
    setModoRanking(false);
  } else {
    setEstadoSelecionado(sigla);
    setModoRanking(ativo !== 'todos');
  }
};


  const handleDoubleClick = () => {
    setAtivo('todos');
    setEstadoSelecionado('todos');
    setModoRanking(false);
  };

  // Atualização dos dados do gráfico
  const dadosGrafico = useMemo(() => {
    if (ativo === 'todos') {
      return dadosEstado ? [
        // Dados originais...
        { name: content.transportModes.road, value: dadosEstado.modais.rodoviario, cor: CORES_MODAIS.rodoviario },
        { name: content.transportModes.rail, value: dadosEstado.modais.ferroviario, cor: CORES_MODAIS.ferroviario },
        { name: content.transportModes.water, value: dadosEstado.modais.aquaviario, cor: CORES_MODAIS.aquaviario },
        { name: content.transportModes.air, value: dadosEstado.modais.aereo, cor: CORES_MODAIS.aereo },
        { name: content.transportModes.pipeline, value: dadosEstado.modais.dutoviario, cor: CORES_MODAIS.dutoviario }
      ] : [];
    } else {
      const allStates = estadosDados.map(estado => ({
        name: estado.nome,
        value: estado.modais[ativo as keyof typeof CORES_MODAIS],
        sigla: estado.sigla,
        cor: modoRanking 
          ? (estado.sigla === estadoSelecionado ? CORES_MODAIS[ativo] : '#999999')
          : CORES_MODAIS[ativo]
      })).sort((a, b) => b.value - a.value);

      return allStates;
    }
  }, [ativo, dadosEstado, estadoSelecionado, modoRanking]);  


  // Atualize o useEffect de dadosEstado
useEffect(() => {
  if (estadoSelecionado === "todos") {
    // Dados agregados para todos os estados
    const dadosAgregados = estadosDados.reduce((acc, estado) => ({
      nome: "Todos os Estados",
      sigla: "BR",
      modais: {
        rodoviario: acc.modais.rodoviario + estado.modais.rodoviario,
        ferroviario: acc.modais.ferroviario + estado.modais.ferroviario,
        aquaviario: acc.modais.aquaviario + estado.modais.aquaviario,
        aereo: acc.modais.aereo + estado.modais.aereo,
        dutoviario: acc.modais.dutoviario + estado.modais.dutoviario,
      },
      detalhes: {
        kmRodovias: 0,
        kmFerrovias: 0,
        kmAquavias: 0,
        aeroportos: 0,
        kmDutos: 0
      }
    }));
    
    const total = estadosDados.length;
    
    // Função para calcular e formatar os valores
    const calcularMediaFormatada = (valorTotal: number) => 
      Number((valorTotal / total).toFixed(2));

    setDadosEstado({
      sigla: "BR",
      nome: "Todos os Estados",
      modais: {
        rodoviario: calcularMediaFormatada(dadosAgregados.modais.rodoviario),
        ferroviario: calcularMediaFormatada(dadosAgregados.modais.ferroviario),
        aquaviario: calcularMediaFormatada(dadosAgregados.modais.aquaviario),
        aereo: calcularMediaFormatada(dadosAgregados.modais.aereo),
        dutoviario: calcularMediaFormatada(dadosAgregados.modais.dutoviario),
      },
      detalhes: {
        kmRodovias: 1720000,
        kmFerrovias: 30660,
        kmAquavias: 41100,
        aeroportos: 2499,
        kmDutos: 53598
      }
    });
  } else {
    const estado = estadosDados.find(e => e.sigla === estadoSelecionado);
    setDadosEstado(estado || null);
  }
}, [estadoSelecionado]);

 
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-white/5"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
        </div>

        <div className="container relative z-10">
          <Link to="/projetos/10" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {content.backToProject}
          </Link>

          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {content.tags.map((tag, index) => (
                <Badge key={index} className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.pageTitle}</h1>

            <p className="text-xl text-white/90 max-w-3xl">
              {content.pageSubtitle}
            </p>

            <div className="flex items-center mt-6 text-white/80">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{content.dateLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa e Gráficos Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">{content.visualizationTitle}</h2>

          {/* Filtros e Seleção */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-64">
              <Select value={estadoSelecionado} onValueChange={setEstadoSelecionado}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={content.selectState} />
                </SelectTrigger>
                <SelectContent>
                  {estadosBrasileiros.map((estado) => (
                    <SelectItem key={estado.sigla} value={estado.sigla}>
                      {estado.nome} ({estado.sigla})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center px-4">
              <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
                  {tipos.map((tipo) => (
                    // Atualize a lógica dos botões
                    <Button
                      key={tipo.key}
                      onClick={() => {
                        if (tipo.key === 'todos') {
                          setEstadoSelecionado('todos');
                          setModoRanking(false);
                        }
                        setAtivo(tipo.key);
                      }}
                      style={{
                        backgroundColor: ativo === tipo.key ? tipo.color : "",
                        color: ativo === tipo.key ? "#fff" : "",
                      }}
                    >
                      {tipo.label}
                    </Button>
                  ))}
              </div>
            </div>
          </div>

          {/* Área de visualização principal */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
             {/* Mapa ilustrativo do Brasil */}
            <div className="lg:col-span-3 bg-muted/30 rounded-xl p-1 h-auto flex flex-col justify-center items-center relative border">
              {/* Aqui entra o mapa interativo */}

               <MapaBrasilInterativo 
                 onEstadoSelecionado={handleEstadoSelecionado}
                 getStateColor={getStateColor}
                 onDoubleClick={handleDoubleClick}
               />

            </div>
          
            {/* Gráfico de modais */}
            <div className="lg:col-span-3 bg-card rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">
                  {content.utilizationTitle.replace("{state}", dadosEstado?.nome || content.selectState)}
                </h3>
              </div>

              <div className="h-[450px] md:h-[370px]">
                {tipoGrafico === "barra" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dadosGrafico}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Utilização']} 
                        labelStyle={{
                          color: "#000"
                        }}
                        />
                      <Legend />
                      <Bar dataKey="value" name="Utilização (%)">
                        {dadosGrafico.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {tipoGrafico === "pizza" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={dadosGrafico}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={140}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dadosGrafico.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} 
                        labelStyle={{
                          color: "#000"
                        }}
                        />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                )}

                {tipoGrafico === "linha" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={dadosGrafico}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        type="category"
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <YAxis unit="%" />
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{ padding: '10px' }}
                        labelStyle={{
                          color: "#000"
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Utilização (%)"
                        stroke={CORES_MODAIS[ativo as keyof typeof CORES_MODAIS] || '#8884d8'}
                        strokeWidth={2}
                        dot={({
                          cx, 
                          cy,
                          payload
                        }) => (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={6} 
                            fill={
                              estadoSelecionado === payload?.sigla 
                                ? CORES_MODAIS[ativo as keyof typeof CORES_MODAIS]
                                : '#8884d8'
                            }
                            strokeWidth={2}
                          />
                        )}
                      />
                    </ReLineChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Tabs value={tipoGrafico} onValueChange={(v) => setTipoGrafico(v as "barra" | "pizza" | "linha")}>
                  <TabsList>
                    <TabsTrigger value="barra" className="flex gap-1.5 items-center">
                      <BarChart2 className="h-4 w-4" />
                      <span className="hidden sm:inline">{content.chartTypes[0]}</span>
                    </TabsTrigger>
                    <TabsTrigger value="pizza" className="flex gap-1.5 items-center">
                      <PieChart className="h-4 w-4" />
                      <span className="hidden sm:inline">{content.chartTypes[1]}</span>
                    </TabsTrigger>
                    <TabsTrigger value="linha" className="flex gap-1.5 items-center">
                      <LineChart className="h-4 w-4" />
                      <span className="hidden sm:inline">{content.chartTypes[2]}</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    aria-label="Ver detalhes da infraestrutura"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{content.modalDetailsTitle}: {dadosEstado?.nome}</DialogTitle>
                    {/* <DialogClose className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"> */}
                      {/* <X className="h-4 w-4" /> */}
                      <span className="sr-only">{content.closeButton}</span>
                    {/* </DialogClose> */}
                  </DialogHeader>
                  
                  {dadosEstado && (
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
                        <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                          <Truck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <div className="font-medium">{content.transportModes.road}</div>
                          <div className="text-xl font-bold">{dadosEstado.detalhes.kmRodovias.toLocaleString()} km</div>
                          <div className="text-sm text-muted-foreground">{content.infraDetails.road}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/30">
                        <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                          <TrainFront className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium">{content.transportModes.rail}</div>
                          <div className="text-xl font-bold">{dadosEstado.detalhes.kmFerrovias.toLocaleString()} km</div>
                          <div className="text-sm text-muted-foreground">{content.infraDetails.rail}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                          <Ship className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">{content.transportModes.water}</div>
                          <div className="text-xl font-bold">{dadosEstado.detalhes.kmAquavias.toLocaleString()} km</div>
                          <div className="text-sm text-muted-foreground">{content.infraDetails.water}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30">
                        <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-full">
                          <Plane className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <div className="font-medium">{content.transportModes.air}</div>
                          <div className="text-xl font-bold">{dadosEstado.detalhes.aeroportos} aeroportos</div>
                          <div className="text-sm text-muted-foreground">{content.infraDetails.air}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-900/30">
                        <div className="bg-gray-100 dark:bg-gray-900/50 p-2 rounded-full">
                          <Route className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium">{content.transportModes.pipeline}</div>
                          <div className="text-xl font-bold">{dadosEstado.detalhes.kmDutos.toLocaleString()} km</div>
                          <div className="text-sm text-muted-foreground">{content.infraDetails.pipeline}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              </div>
            </div>
          </div>
          
           {/* Sobre o Projeto */}
                     <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl border shadow-md p-6">
                       <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/3">
                           <div className="rounded-lg overflow-hidden h-64">
                             <img 
                               src={sobreProjeto.image} 
                               alt={content.projectAbout}
                               className="w-full h-full object-cover" 
                             />
                           </div>
                         </div>
                         <div className="md:w-2/3 space-y-4">
                           <div className="flex items-center gap-2">
                             <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-700">
                               <Info className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                             </div>
                             <h3 className="text-xl font-bold">{content.projectAbout}</h3>
                           </div>
                           
                           <p className="text-muted-foreground">
                             {content.textprojectAbout}
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Modal Rodoviário */}
                     <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl border shadow-md p-6">
                       <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/3">
                           <div className="rounded-lg overflow-hidden h-64">
                             <img 
                               src={modaisInfo.rodoviario.image} 
                               alt={content.modes.road}
                               className="w-full h-full object-cover" 
                             />
                           </div>
                         </div>
                         <div className="md:w-2/3 space-y-4">
                           <div className="flex items-center gap-2">
                             <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                               <Truck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                             </div>
                             <h3 className="text-xl font-bold">{content.modes.road}</h3>
                           </div>
                           
                           <p className="text-muted-foreground">
                             {content.textRoad}
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Modal Ferroviário */}
                     <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border shadow-md p-6">
                       <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/3">
                           <div className="rounded-lg overflow-hidden h-64">
                             <img 
                               src={modaisInfo.ferroviario.image} 
                               alt={content.modes.rail}
                               className="w-full h-full object-cover" 
                             />
                           </div>
                         </div>
                         <div className="md:w-2/3 space-y-4">
                           <div className="flex items-center gap-2">
                             <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                               <TrainFront className="h-5 w-5 text-green-600 dark:text-green-400" />
                             </div>
                             <h3 className="text-xl font-bold">{content.modes.rail}</h3>
                           </div>
                           
                           <p className="text-muted-foreground">
                             {content.textRail}
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Modal Aquaviário */}
                     <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border shadow-md p-6">
                       <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/3">
                           <div className="rounded-lg overflow-hidden h-64">
                             <img 
                               src={modaisInfo.aquaviario.image} 
                               alt={content.modes.water}
                               className="w-full h-full object-cover" 
                             />
                           </div>
                         </div>
                         <div className="md:w-2/3 space-y-4">
                           <div className="flex items-center gap-2">
                             <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                               <Ship className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                             </div>
                             <h3 className="text-xl font-bold">{content.modes.water}</h3>
                           </div>
                           
                           <p className="text-muted-foreground">
                             {content.textWaterway}
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Modal Aéreo */}
                     <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border shadow-md p-6">
                       <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/3">
                           <div className="rounded-lg overflow-hidden h-64">
                             <img 
                               src={modaisInfo.aereo.image} 
                               alt={content.modes.air}
                               className="w-full h-full object-cover" 
                             />
                           </div>
                         </div>
                         <div className="md:w-2/3 space-y-4">
                           <div className="flex items-center gap-2">
                             <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                               <Plane className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                             </div>
                             <h3 className="text-xl font-bold">{content.modes.air}</h3>
                           </div>
                           
                           <p className="text-muted-foreground">
                             {content.textAir}
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Modal Dutoviário */}
                     <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border shadow-md p-6">
                       <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/3">
                           <div className="rounded-lg overflow-hidden h-64">
                             <img 
                               src={modaisInfo.dutoviario.image} 
                               alt={content.modes.pipeline}
                               className="w-full h-full object-cover" 
                             />
                           </div>
                         </div>
                         <div className="md:w-2/3 space-y-4">
                           <div className="flex items-center gap-2">
                             <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-900/30">
                               <Route className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                             </div>
                             <h3 className="text-xl font-bold">{content.modes.pipeline}</h3>
                           </div>
                           
                           <p className="text-muted-foreground">
                             {content.textPipeline}
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Fontes de Dados */}
                     <div className="mt-12">
                       <h2 className="text-3xl font-bold mb-6">{content.dataSources}</h2>
                       <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-md p-6">
                         <div className="overflow-x-auto">
                           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                             <thead className="bg-gray-50 dark:bg-gray-800">
                               <tr>
                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                   {content.source}
                                 </th>
                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                   {content.description}
                                 </th>
                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                   {content.dateLabel}
                                 </th>
                               </tr>
                             </thead>
                             <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                               {fontesDados.map((fonte, index) => (
                                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                                   <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                     {fonte.fonte}
                                   </td>
                                   <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                     {fonte.descricao[language]}
                                   </td>
                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                     {fonte.data}
                                   </td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                         </div>
                       </div>
                     </div>
                     
                     {/* Seção Explicativa */}
                     <div className="mt-16">
                       <h2 className="text-3xl font-bold mb-6">{content.aboutTitle}</h2>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                           <p className="text-muted-foreground mb-6">
                             {content.aboutP1}
                           </p>
                           
                           <p className="text-muted-foreground mb-6">
                             {content.aboutP2}
                           </p>
                           
                           <h3 className="text-xl font-bold mt-8 mb-4">{content.aspectsTitle}</h3>
                           <ul className="space-y-2 text-muted-foreground">
                             {content.aspects.map((aspect, index) => (
                               <li key={index} className="flex items-start gap-2">
                                 <span className="bg-blue-500/20 text-blue-500 p-1 rounded-full mt-0.5">•</span>
                                 <span>{aspect}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                         
                         <div className="bg-muted/30 p-6 rounded-xl">
                           <h3 className="text-xl font-bold mb-4">{content.modesTitle}</h3>
                           
                           <div className="space-y-4">
                             <div className="flex items-start gap-3">
                               <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: CORES_MODAIS.rodoviario }}>
                                 <Truck className="h-3.5 w-3.5 text-white" />
                               </div>
                               <div>
                                 <h4 className="font-medium">{content.transportModes.road}</h4>
                                 <p className="text-sm text-muted-foreground">{content.modeDescriptions.road}</p>
                               </div>
                             </div>
                             
                             <div className="flex items-start gap-3">
                               <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: CORES_MODAIS.ferroviario }}>
                                 <TrainFront className="h-3.5 w-3.5 text-white" />
                               </div>
                               <div>
                                 <h4 className="font-medium">{content.transportModes.rail}</h4>
                                 <p className="text-sm text-muted-foreground">{content.modeDescriptions.rail}</p>
                               </div>
                             </div>
                             
                             <div className="flex items-start gap-3">
                               <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: CORES_MODAIS.aquaviario }}>
                                 <Ship className="h-3.5 w-3.5 text-white" />
                               </div>
                               <div>
                                 <h4 className="font-medium">{content.transportModes.water}</h4>
                                 <p className="text-sm text-muted-foreground">{content.modeDescriptions.water}</p>
                               </div>
                             </div>
                             
                             <div className="flex items-start gap-3">
                               <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: CORES_MODAIS.aereo }}>
                                 <Plane className="h-3.5 w-3.5 text-white" />
                               </div>
                               <div>
                                 <h4 className="font-medium">{content.transportModes.air}</h4>
                                 <p className="text-sm text-muted-foreground">{content.modeDescriptions.air}</p>
                               </div>
                             </div>
                             
                             <div className="flex items-start gap-3">
                               <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: CORES_MODAIS.dutoviario }}>
                                 <Route className="h-3.5 w-3.5 text-white" />
                               </div>
                               <div>
                                 <h4 className="font-medium">{content.transportModes.pipeline}</h4>
                                 <p className="text-sm text-muted-foreground">{content.modeDescriptions.pipeline}</p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>

          {/* Link para voltar */}
          <div className="mt-16 text-center">
            <Button asChild className="rounded-full px-8" size="lg">
              <Link to="/projetos/10">{content.backButton}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ModaisTransporte;
