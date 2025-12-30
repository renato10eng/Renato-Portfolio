
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const LogisticsPage = () => {
  const { language } = useLanguage();

  // Text translation object
  const texts = {
    pt: {
      title: "Logística",
      subtitle: "Gestão eficiente da cadeia de suprimentos e distribuição",
      what_is_title: "O que é Logística?",
      what_is_p1: "A Logística é a área responsável pelo planejamento, implementação e controle eficiente do fluxo e armazenamento de produtos, serviços e informações relacionadas, desde o ponto de origem até o ponto de consumo, com o objetivo de atender às necessidades dos clientes.",
      what_is_p2: "Um sistema logístico bem estruturado é fundamental para a competitividade das organizações, pois impacta diretamente nos custos operacionais, nível de serviço ao cliente e capacidade de resposta às demandas do mercado.",
      bullet1: "Gestão integrada da cadeia de suprimentos",
      bullet2: "Planejamento e otimização de transportes",
      bullet3: "Gestão de armazenagem e estoques",
      bullet4: "Logística reversa e sustentabilidade",
      areas_title: "Áreas de Atuação",
      // Card 1
      card1_title: "Gestão da Cadeia de Suprimentos",
      card1_desc: "Integração de processos entre fornecedores e clientes",
      card1_content: "Coordenação estratégica e integração de processos de negócios ao longo da cadeia de suprimentos, desde fornecedores de matérias-primas até o consumidor final, visando otimizar fluxos e criar valor.",
      // Card 2
      card2_title: "Logística de Transporte",
      card2_desc: "Planejamento e gestão de movimentação de cargas",
      card2_content: "Envolve a seleção de modais de transporte (rodoviário, ferroviário, aquaviário, aéreo), roteirização, gestão de frota, controle de custos e monitoramento de nível de serviço logístico.",
      // Card 3
      card3_title: "Gestão de Armazenagem",
      card3_desc: "Planejamento e operação de armazéns e CDs",
      card3_content: "Abrange o design de layout de armazéns, gestão de espaços, sistemas de movimentação e armazenagem, automação, WMS (Warehouse Management System) e técnicas de separação de pedidos.",
      // Card 4
      card4_title: "Gestão de Estoques",
      card4_desc: "Controle e otimização de níveis de estoque",
      card4_content: "Aplicação de técnicas quantitativas para determinar níveis ótimos de estoque, pontos de ressuprimento, lotes econômicos de compra, classificação ABC e políticas de estoque para cada tipo de item.",
      // Card 5
      card5_title: "Logística Internacional",
      card5_desc: "Operações de comércio exterior e alfândega",
      card5_content: "Gerenciamento de importações e exportações, documentação internacional, Incoterms, despacho aduaneiro, contratação de fretes internacionais e avaliação de riscos em operações globais.",
      // Card 6
      card6_title: "Logística Reversa",
      card6_desc: "Gestão do fluxo reverso de produtos e materiais",
      card6_content: "Planejamento e execução do retorno de produtos, embalagens e materiais para reaproveitamento, reparo, reciclagem ou descarte adequado, atendendo requisitos legais e ambientais.",
      
      view_projects: "Ver projetos de Logística",
      concepts_title: "Conceitos e Tecnologias",
      // Concept 1
      concept1_title: "Cadeia de Suprimentos 4.0",
      concept1_p1: "A aplicação dos conceitos da Indústria 4.0 à cadeia de suprimentos, integrando tecnologias como Internet das Coisas (IoT), Big Data, Inteligência Artificial e Blockchain aos processos logísticos.",
      concept1_p2: "O Supply Chain 4.0 permite maior visibilidade em tempo real da cadeia, previsões de demanda mais precisas, respostas mais ágeis a mudanças no mercado e automação de processos decisórios, resultando em cadeias de suprimentos mais flexíveis, eficientes e resilientes.",
      // Concept 2
      concept2_title: "Logística Verde",
      concept2_p1: "Conjunto de práticas e estratégias que visam reduzir o impacto ambiental das operações logísticas, incluindo otimização de rotas para redução de emissões de CO2, uso de combustíveis alternativos, embalagens sustentáveis e processos eficientes de logística reversa.",
      concept2_p2: "A Logística Verde busca equilibrar objetivos econômicos e ambientais, atendendo às crescentes demandas de consumidores e reguladores por práticas empresariais sustentáveis, além de frequentemente resultar em reduções de custo operacional no médio e longo prazo.",
      // Concept 3
      concept3_title: "Entrega na Última Milha",
      concept3_p1: "O último trecho da entrega de produtos ao consumidor final, considerado um dos mais desafiadores e custosos da cadeia logística. Com o crescimento do e-commerce, a eficiência na entrega da última milha tornou-se um diferencial competitivo crucial.",
      concept3_p2: "Inovações neste campo incluem pontos de coleta compartilhados, lockers inteligentes, entregas por drones e robôs, sistemas de otimização de rotas em tempo real e novas modalidades de colaboração entre transportadoras e estabelecimentos para aumentar capilaridade e reduzir custos."
    },
    en: {
      title: "Logistics",
      subtitle: "Efficient management of supply chain and distribution",
      what_is_title: "What is Logistics?",
      what_is_p1: "Logistics is the area responsible for planning, implementing, and efficiently controlling the flow and storage of products, services, and related information, from the point of origin to the point of consumption, with the goal of meeting customer needs.",
      what_is_p2: "A well-structured logistics system is fundamental for the competitiveness of organizations, as it directly impacts operational costs, customer service level, and the capacity to respond to market demands.",
      bullet1: "Integrated supply chain management",
      bullet2: "Transportation planning and optimization",
      bullet3: "Warehouse and inventory management",
      bullet4: "Reverse logistics and sustainability",
      areas_title: "Areas of Expertise",
      // Card 1
      card1_title: "Supply Chain Management",
      card1_desc: "Integration of processes between suppliers and customers",
      card1_content: "Strategic coordination and integration of business processes along the supply chain, from raw material suppliers to the end consumer, aiming to optimize flows and create value.",
      // Card 2
      card2_title: "Transport Logistics",
      card2_desc: "Planning and management of cargo movement",
      card2_content: "Involves the selection of transport modes (road, rail, water, air), routing, fleet management, cost control, and monitoring of logistics service level.",
      // Card 3
      card3_title: "Warehouse Management",
      card3_desc: "Planning and operation of warehouses and DCs",
      card3_content: "Encompasses warehouse layout design, space management, moving and storage systems, automation, WMS (Warehouse Management System), and order picking techniques.",
      // Card 4
      card4_title: "Inventory Management",
      card4_desc: "Control and optimization of inventory levels",
      card4_content: "Application of quantitative techniques to determine optimal inventory levels, resupply points, economic order quantities, ABC classification, and inventory policies for each type of item.",
      // Card 5
      card5_title: "International Logistics",
      card5_desc: "Foreign trade and customs operations",
      card5_content: "Management of imports and exports, international documentation, Incoterms, customs clearance, contracting of international freight, and risk assessment in global operations.",
      // Card 6
      card6_title: "Reverse Logistics",
      card6_desc: "Management of the reverse flow of products and materials",
      card6_content: "Planning and execution of the return of products, packaging, and materials for reuse, repair, recycling, or proper disposal, meeting legal and environmental requirements.",
      
      view_projects: "View Logistics Projects",
      concepts_title: "Concepts and Technologies",
      // Concept 1
      concept1_title: "Supply Chain 4.0",
      concept1_p1: "The application of Industry 4.0 concepts to the supply chain, integrating technologies such as Internet of Things (IoT), Big Data, Artificial Intelligence, and Blockchain into logistics processes.",
      concept1_p2: "Supply Chain 4.0 allows greater real-time visibility of the chain, more accurate demand forecasts, more agile responses to market changes, and automation of decision-making processes, resulting in more flexible, efficient, and resilient supply chains.",
      // Concept 2
      concept2_title: "Green Logistics",
      concept2_p1: "Set of practices and strategies aimed at reducing the environmental impact of logistics operations, including route optimization to reduce CO2 emissions, use of alternative fuels, sustainable packaging, and efficient reverse logistics processes.",
      concept2_p2: "Green Logistics seeks to balance economic and environmental objectives, meeting the growing demands of consumers and regulators for sustainable business practices, and often resulting in operational cost reductions in the medium and long term.",
      // Concept 3
      concept3_title: "Last Mile Delivery",
      concept3_p1: "The final stretch of product delivery to the end consumer, considered one of the most challenging and costly in the logistics chain. With the growth of e-commerce, efficiency in last-mile delivery has become a crucial competitive differentiator.",
      concept3_p2: "Innovations in this field include shared collection points, smart lockers, deliveries by drones and robots, real-time route optimization systems, and new forms of collaboration between carriers and establishments to increase capillarity and reduce costs."
    }
  };
  
  // Current language texts
  const content = language === 'en' ? texts.en : texts.pt;

  return (
    <Layout>
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 text-center">{content.title}</h1>
          <p className="text-center text-xl max-w-2xl mx-auto text-white/80">
            {content.subtitle}
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-heading">{content.what_is_title}</h2>
                
                <p>
                  {content.what_is_p1}
                </p>
                
                <p>
                  {content.what_is_p2}
                </p>
                
                <div className="pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <p>{content.bullet1}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <p>{content.bullet2}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <p>{content.bullet3}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <p>{content.bullet4}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="https://cdn.prod.website-files.com/6468316c421de37f67128485/67236c500cfae485f1d98256_o-que-e-logistica-automatizada.jpg" 
                alt={content.title} 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{content.areas_title}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{content.card1_title}</CardTitle>
                <CardDescription>{content.card1_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{content.card1_content}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{content.card2_title}</CardTitle>
                <CardDescription>{content.card2_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{content.card2_content}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{content.card3_title}</CardTitle>
                <CardDescription>{content.card3_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{content.card3_content}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{content.card4_title}</CardTitle>
                <CardDescription>{content.card4_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{content.card4_content}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{content.card5_title}</CardTitle>
                <CardDescription>{content.card5_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{content.card5_content}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{content.card6_title}</CardTitle>
                <CardDescription>{content.card6_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{content.card6_content}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="group">
              <Link to="/projetos?categoria=logistica">
                {content.view_projects}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">{content.concepts_title}</h2>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">{content.concept1_title}</h3>
              <p>{content.concept1_p1}</p>
              <p>{content.concept1_p2}</p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">{content.concept2_title}</h3>
              <p>{content.concept2_p1}</p>
              <p>{content.concept2_p2}</p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">{content.concept3_title}</h3>
              <p>{content.concept3_p1}</p>
              <p>{content.concept3_p2}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LogisticsPage;
