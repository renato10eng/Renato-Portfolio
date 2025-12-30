
// Aqui você adiciona os detalhesdo Do projeto Que serão mostrados na página detalhes de projeto.

export const projectContent = {
  // Plataforma E-commerce Full-Stack (ID 10)
  10: {
    pt: {
      overview: "Desenvolvimento completo de plataforma de e-commerce com arquitetura full-stack, incluindo front-end em React, back-end em Node.js, banco de dados PostgreSQL e integração com gateways de pagamento. O sistema oferece experiência completa de compra online com painel administrativo para gestão de produtos e pedidos.",
      challenges: [
        "Implementar arquitetura escalável full-stack",
        "Integrar múltiplos gateways de pagamento",
        "Desenvolver painel administrativo intuitivo",
        "Garantir segurança de dados sensíveis"
      ],
      solutions: [
        "Front-end responsivo com React e TypeScript",
        "API RESTful com Node.js e Express",
        "Banco de dados PostgreSQL com otimização de queries",
        "Integração com Stripe e Mercado Pago"
      ],
      methodology: "Utilizei uma abordagem full-stack moderna, separando responsabilidades entre front-end e back-end, implementando autenticação JWT, validação de dados e testes automatizados para garantir qualidade e segurança.",
      metrics: [
        { value: "99.9%", label: "Uptime da plataforma", icon: "Zap" },
        { value: "50%", label: "Redução no tempo de carregamento", icon: "TrendingUp" },
        { value: "10k+", label: "Produtos gerenciados", icon: "Package" },
        { value: "5k+", label: "Usuários ativos mensais", icon: "Users" }
      ],
      details: {
        client: "TechCommerce Ltda",
        category: "Full-Stack",
        duration: "8 meses",
        location: "Remoto",
        completion: "Maio 2024"
      },
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe API", "JWT", "Docker", "AWS"]
    },
    en: {
      overview:
        "Complete development of e-commerce platform with full-stack architecture, including React front-end, Node.js back-end, PostgreSQL database and payment gateway integration. The system offers complete online shopping experience with admin dashboard for product and order management.",
      challenges: [
        "Implement scalable full-stack architecture",
        "Integrate multiple payment gateways",
        "Develop intuitive admin dashboard",
        "Ensure security of sensitive data"
      ],
      solutions: [
        "Responsive front-end with React and TypeScript",
        "RESTful API with Node.js and Express",
        "PostgreSQL database with query optimization",
        "Integration with Stripe and Mercado Pago"
      ],
      methodology: "I used a modern full-stack approach, separating responsibilities between front-end and back-end, implementing JWT authentication, data validation and automated tests to ensure quality and security.",
      metrics: [
        { value: "99.9%", label: "Platform uptime", icon: "Zap" },
        { value: "50%", label: "Reduction in loading time", icon: "TrendingUp" },
        { value: "10k+", label: "Products managed", icon: "Package" },
        { value: "5k+", label: "Monthly active users", icon: "Users" }
      ],
      details: {
        client: "TechCommerce Ltda",
        category: "Full-Stack",
        duration: "8 months",
        location: "Remote",
        completion: "May 2024"
      },
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe API", "JWT", "Docker", "AWS"]
    }
  },
  // Aplicação de Dashboard Analytics (ID 4)
  4: {
    pt: {
      overview: "Dashboard interativo para visualização de dados empresariais desenvolvido com React, TypeScript e integração com APIs REST. O sistema permite análise em tempo real de métricas de negócio, com gráficos dinâmicos e filtros avançados, melhorando a tomada de decisão em 40%.",
      challenges: [
        "Integração com múltiplas fontes de dados",
        "Performance com grandes volumes de dados",
        "Interface intuitiva para usuários não-técnicos",
        "Atualização em tempo real dos dados"
      ],
      solutions: [
        "Arquitetura de componentes reutilizáveis",
        "Implementação de virtualização para listas grandes",
        "Sistema de cache inteligente",
        "WebSockets para atualizações em tempo real"
      ],
      methodology: "Utilizei princípios de design system para criar componentes consistentes, implementei lazy loading e otimização de queries para garantir performance, além de testes automatizados para manter qualidade.",
      metrics: [
        { value: "40%", label: "Melhoria na tomada de decisão", icon: "TrendingUp" },
        { value: "2s", label: "Tempo médio de carregamento", icon: "Zap" },
        { value: "50+", label: "Métricas monitoradas", icon: "BarChart2" },
        { value: "1000+", label: "Usuários simultâneos suportados", icon: "Users" }
      ],
      details: {
        client: "DataCorp Analytics",
        category: "Front-End",
        duration: "5 meses",
        location: "Remoto",
        completion: "Fevereiro 2024"
      },
      technologies: ["React", "TypeScript", "D3.js", "Recharts", "WebSockets", "REST API", "Tailwind CSS", "Vite"]
    },
    en: {
      overview: "Interactive dashboard for business data visualization developed with React, TypeScript and REST API integration. The system allows real-time analysis of business metrics, with dynamic charts and advanced filters, improving decision making by 40%.",
      challenges: [
        "Integration with multiple data sources",
        "Performance with large data volumes",
        "Intuitive interface for non-technical users",
        "Real-time data updates"
      ],
      solutions: [
        "Reusable component architecture",
        "Virtualization implementation for large lists",
        "Smart caching system",
        "WebSockets for real-time updates"
      ],
      methodology: "I used design system principles to create consistent components, implemented lazy loading and query optimization to ensure performance, plus automated tests to maintain quality.",
      metrics: [
        { value: "40%", label: "Improvement in decision making", icon: "TrendingUp" },
        { value: "2s", label: "Average loading time", icon: "Zap" },
        { value: "50+", label: "Metrics monitored", icon: "BarChart2" },
        { value: "1000+", label: "Simultaneous users supported", icon: "Users" }
      ],
      details: {
        client: "DataCorp Analytics",
        category: "Front-End",
        duration: "5 months",
        location: "Remote",
        completion: "February 2024"
      },
      technologies: ["React", "TypeScript", "D3.js", "Recharts", "WebSockets", "REST API", "Tailwind CSS", "Vite"]
    }
  },
  // Production Line Optimization (ID 1)
  1: {
    pt: {
      overview: "Este projeto de otimização de linha de produção buscou maximizar a eficiência e flexibilidade da produção através de técnicas avançadas de engenharia de produção e lean manufacturing. Foi implementado em uma grande indústria automotiva que enfrentava desafios de flexibilidade produtiva em um mercado cada vez mais dinâmico e exigente.",
      challenges: [
        "Tempo de setup elevado entre troca de modelos",
        "Baixa capacidade de resposta a variações de demanda",
        "Gargalos frequentes em estações críticas",
        "Altos níveis de inventário em processo (WIP)"
      ],
      solutions: [
        "Aplicação de técnicas SMED para redução de setup",
        "Balanceamento de linha com ferramentas de simulação",
        "Implementação de sistema puxado com kanban digital",
        "Redesenho de layout para fluxo contínuo"
      ],
      methodology: "O projeto foi desenvolvido seguindo os princípios do Toyota Production System (TPS) e metodologia Lean, com foco na eliminação de desperdícios e na criação de fluxo contínuo. Foi adotada uma abordagem prática de análise-implementação-verificação para cada etapa do processo.",
      metrics: [
        { value: "-65%", label: "Redução no tempo de setup", icon: "Zap" },
        { value: "+22%", label: "Aumento da capacidade produtiva", icon: "Users" },
        { value: "-45%", label: "Redução do lead time total", icon: "BarChart2" },
        { value: "-30%", label: "Redução de inventário em processo", icon: "Award" }
      ],
      details: {
        client: "AutoBras Indústria",
        category: "Engenharia",
        duration: "6 meses",
        location: "Minas Gerais, Brasil",
        completion: "Novembro 2023"
      },
      technologies: ["Lean Manufacturing", "SMED", "Kanban", "Value Stream Mapping", "Simulação Discreta", "Teoria das Restrições", "TPM", "Lean Six Sigma"]
    },
    en: {
      overview: "This production line optimization project aimed to maximize production efficiency and flexibility through advanced production engineering and lean manufacturing techniques. It was implemented in a large automotive industry that faced challenges in production flexibility in an increasingly dynamic and demanding market.",
      challenges: [
        "High setup time between model changes",
        "Low responsiveness to demand variations",
        "Frequent bottlenecks at critical stations",
        "High levels of work-in-process inventory (WIP)"
      ],
      solutions: [
        "Application of SMED techniques for setup reduction",
        "Line balancing with simulation tools",
        "Implementation of pull system with digital kanban",
        "Layout redesign for continuous flow"
      ],
      methodology: "The project was developed following the principles of the Toyota Production System (TPS) and Lean methodology, focusing on waste elimination and the creation of continuous flow. A practical approach of analysis-implementation-verification was adopted for each process step.",
      metrics: [
        { value: "-65%", label: "Reduction in setup time", icon: "Zap" },
        { value: "+22%", label: "Increase in productive capacity", icon: "Users" },
        { value: "-45%", label: "Reduction in total lead time", icon: "BarChart2" },
        { value: "-30%", label: "Reduction in work-in-process inventory", icon: "Award" }
      ],
      details: {
        client: "AutoBras Industry",
        category: "Engineering",
        duration: "6 months",
        location: "Minas Gerais, Brazil",
        completion: "November 2023"
      },
      technologies: ["Lean Manufacturing", "SMED", "Kanban", "Value Stream Mapping", "Discrete Simulation", "Theory of Constraints", "TPM", "Lean Six Sigma"]
    }
  }
};

// Default content for other projects
export const defaultContent = {
  pt: {
    overview: "Este projeto aplicou metodologias avançadas de engenharia e gestão para resolver desafios complexos e criar valor para o cliente. A implementação foi cuidadosamente planejada para maximizar resultados e garantir a sustentabilidade das melhorias implementadas.",
    challenges: [
      "Processos ineficientes gerando custos elevados",
      "Falta de integração entre áreas operacionais",
      "Dificuldades na gestão de dados e informações",
      "Necessidade de adaptação a novas demandas de mercado"
    ],
    solutions: [
      "Análise detalhada e redesenho de processos críticos",
      "Implementação de sistemas integrados de gestão",
      "Treinamento e desenvolvimento de equipes",
      "Monitoramento contínuo de KPIs estratégicos"
    ],
    methodology: "O projeto foi desenvolvido seguindo metodologias de gestão de projetos e melhoria contínua, adaptadas às necessidades específicas do cliente e do setor. A abordagem estruturada garantiu entregas consistentes e resultados sustentáveis.",
    metrics: [
      { value: "+25%", label: "Aumento de produtividade", icon: "Zap" },
      { value: "-30%", label: "Redução de custos operacionais", icon: "Users" },
      { value: "+40%", label: "Melhoria na satisfação do cliente", icon: "BarChart2" },
      { value: "98%", label: "Taxa de implementação bem-sucedida", icon: "Award" }
    ],
    details: {
      client: "Cliente Corporativo",
      category: "Consultoria",
      duration: "6 meses",
      location: "Brasil",
      completion: "2023"
    },
    technologies: ["Análise de Processos", "Gestão de Projetos", "Business Intelligence", "Lean", "Six Sigma", "Automação", "Estatística Aplicada", "Simulação"]
  },
  en: {
    overview: "This project applied advanced engineering and management methodologies to solve complex challenges and create value for the client. The implementation was carefully planned to maximize results and ensure the sustainability of the improvements implemented.",
    challenges: [
      "Inefficient processes generating high costs",
      "Lack of integration between operational areas",
      "Difficulties in data and information management",
      "Need to adapt to new market demands"
    ],
    solutions: [
      "Detailed analysis and redesign of critical processes",
      "Implementation of integrated management systems",
      "Team training and development",
      "Continuous monitoring of strategic KPIs"
    ],
    methodology: "The project was developed following project management and continuous improvement methodologies, adapted to the specific needs of the client and industry. The structured approach ensured consistent deliveries and sustainable results.",
    metrics: [
      { value: "+25%", label: "Productivity increase", icon: "Zap" },
      { value: "-30%", label: "Reduction in operational costs", icon: "Users" },
      { value: "+40%", label: "Improvement in customer satisfaction", icon: "BarChart2" },
      { value: "98%", label: "Successful implementation rate", icon: "Award" }
    ],
    details: {
      client: "Corporate Client",
      category: "Consulting",
      duration: "6 months",
      location: "Brazil",
      completion: "2023"
    },
    technologies: ["Process Analysis", "Project Management", "Business Intelligence", "Lean", "Six Sigma", "Automation", "Applied Statistics", "Simulation"]
  }
};