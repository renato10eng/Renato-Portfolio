# Script para popular projetos no Strapi
# Execute este script APÃ“S configurar o API Token no Strapi

$STRAPI_URL = "http://localhost:1337"
$API_TOKEN = "722bc66942b3655d5c2f09184cad7991e268feac1bab9e15fe88d462a85e4f41523d32cc746de3af3e0c7e1fd7a0874935c225008e671923fdd4e5bfacef550f5572dfade8dfede3bca7316759889baf3e457bf32e04068c16b38b86823c40ccd570c6cdbff3b8b187d1a062b7a5ec2e6d82ab10739512d54d23767887ed34a9" # VocÃª precisa definir isso no Strapi Admin > Settings > API Tokens

$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "ðŸ“ Criando projetos..." -ForegroundColor Yellow

$projects = @(
    @{
        title = "Plataforma E-commerce Full-Stack"
        title_en = "Full-Stack E-commerce Platform"
        description = "Desenvolvimento completo de plataforma de e-commerce com React, Node.js e PostgreSQL, incluindo painel administrativo e integraÃ§Ã£o com pagamentos."
        description_en = "Complete development of e-commerce platform with React, Node.js and PostgreSQL, including admin dashboard and payment integration."
        image_url = "images/Plataforma E-commerce Full-Stack.jpg"
        tags = @("React", "Node.js", "PostgreSQL")
        tags_en = @("React", "Node.js", "PostgreSQL")
        external_url = "https://example.com/ecommerce-platform"
        category = "fullstack"
        date = "Mai 2024"
        date_en = "May 2024"
    },
    @{
        title = "AplicaÃ§Ã£o de Dashboard Analytics"
        title_en = "Analytics Dashboard Application"
        description = "Dashboard interativo para visualizaÃ§Ã£o de dados empresariais com React, TypeScript e integraÃ§Ã£o com APIs REST, melhorando tomada de decisÃ£o em 40%."
        description_en = "Interactive dashboard for business data visualization with React, TypeScript and REST API integration, improving decision making by 40%."
        image_url = "images/AplicaÃ§Ã£o de Dashboard Analytics.jpg"
        tags = @("React", "TypeScript", "Data Visualization")
        tags_en = @("React", "TypeScript", "Data Visualization")
        external_url = "https://example.com/analytics-dashboard"
        category = "frontend"
        date = "Fev 2024"
        date_en = "Feb 2024"
    },
    @{
        title = "API RESTful com MicroserviÃ§os"
        title_en = "RESTful API with Microservices"
        description = "Arquitetura de microserviÃ§os com Node.js e Express, implementando autenticaÃ§Ã£o JWT e documentaÃ§Ã£o Swagger, escalÃ¡vel para alta demanda."
        description_en = "Microservices architecture with Node.js and Express, implementing JWT authentication and Swagger documentation, scalable for high demand."
        image_url = "images/API RESTful com MicroserviÃ§os.jpg"
        tags = @("Node.js", "MicroserviÃ§os", "JWT")
        tags_en = @("Node.js", "Microservices", "JWT")
        external_url = "https://example.com/rest-api"
        category = "backend"
        date = "Out 2023"
        date_en = "Oct 2023"
    },
    @{
        title = "AplicaÃ§Ã£o Mobile-First Responsiva"
        title_en = "Mobile-First Responsive Application"
        description = "Redesenho completo de aplicaÃ§Ã£o web para abordagem mobile-first, resultando em aumento de 60% no engajamento mobile."
        description_en = "Complete redesign of web application for mobile-first approach, resulting in 60% increase in mobile engagement."
        image_url = "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55"
        tags = @("Mobile-First", "CSS Grid", "Performance")
        tags_en = @("Mobile-First", "CSS Grid", "Performance")
        external_url = "https://example.com/mobile-first"
        category = "frontend"
        date = "Nov 2023"
        date_en = "Nov 2023"
    },
    @{
        title = "Sistema de Gerenciamento de ConteÃºdo"
        title_en = "Content Management System"
        description = "CMS personalizado com Next.js e MongoDB, incluindo editor WYSIWYG e sistema de permissÃµes, aumentando produtividade editorial em 50%."
        description_en = "Custom CMS with Next.js and MongoDB, including WYSIWYG editor and permissions system, increasing editorial productivity by 50%."
        image_url = "images/Sistema de Gerenciamento de ConteÃºdo.png"
        tags = @("Next.js", "MongoDB", "CMS")
        tags_en = @("Next.js", "MongoDB", "CMS")
        external_url = "https://example.com/cms-system"
        category = "fullstack"
        date = "Jan 2024"
        date_en = "Jan 2024"
    },
    @{
        title = "Plataforma de Streaming de VÃ­deo"
        title_en = "Video Streaming Platform"
        description = "Desenvolvimento de plataforma OTT com React, AWS e otimizaÃ§Ã£o de streaming, suportando milhares de usuÃ¡rios simultÃ¢neos."
        description_en = "OTT platform development with React, AWS and streaming optimization, supporting thousands of simultaneous users."
        image_url = "images/Plataforma de Streaming de VÃ­deo.jpg"
        tags = @("React", "AWS", "Streaming")
        tags_en = @("React", "AWS", "Streaming")
        external_url = "https://example.com/streaming-platform"
        category = "fullstack"
        date = "Mar 2024"
        date_en = "Mar 2024"
    },
    @{
        title = "Sistema de Testes Automatizados"
        title_en = "Automated Testing System"
        description = "ImplementaÃ§Ã£o de suÃ­te completa de testes com Jest e Cypress, reduzindo bugs em produÃ§Ã£o em 70% e melhorando qualidade de cÃ³digo."
        description_en = "Implementation of complete testing suite with Jest and Cypress, reducing production bugs by 70% and improving code quality."
        image_url = "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
        tags = @("Jest", "Cypress", "TDD")
        tags_en = @("Jest", "Cypress", "TDD")
        external_url = "https://example.com/testing-system"
        category = "backend"
        date = "Abr 2024"
        date_en = "Apr 2024"
    },
    @{
        title = "AplicaÃ§Ã£o de Real-Time com WebSockets"
        title_en = "Real-Time Application with WebSockets"
        description = "Chat e colaboraÃ§Ã£o em tempo real com Socket.io e React, incluindo notificaÃ§Ãµes push e sincronizaÃ§Ã£o de estado."
        description_en = "Real-time chat and collaboration with Socket.io and React, including push notifications and state synchronization."
        image_url = "images/AplicaÃ§Ã£o de Real-Time com WebSockets.png"
        tags = @("WebSockets", "Real-Time", "Socket.io")
        tags_en = @("WebSockets", "Real-Time", "Socket.io")
        external_url = "https://example.com/realtime-app"
        category = "fullstack"
        date = "Jan 2024"
        date_en = "Jan 2024"
    },
    @{
        title = "Integração com APIs de Terceiros"
        title_en = "Third-Party API Integration"
        description = "Integração complexa com múltiplas APIs (Stripe, Twilio, Google Maps), incluindo rate limiting e tratamento de erros robusto."
        description_en = "Complex integration with multiple APIs (Stripe, Twilio, Google Maps), including rate limiting and robust error handling."
        image_url = "images/Integração com APIs de Terceiros.jpg"
        tags = @("APIs", "Integração", "Stripe")
        tags_en = @("APIs", "Integration", "Stripe")
        external_url = "https://example.com/api-integration"
        category = "backend"
        date = "Dez 2023"
        date_en = "Dec 2023"
    },
    @{
        title = "Sistema de AutenticaÃ§Ã£o e AutorizaÃ§Ã£o"
        title_en = "Authentication and Authorization System"
        description = "Implementação de sistema OAuth 2.0 com múltiplos provedores, incluindo RBAC e gerenciamento de sessões seguras."
        description_en = "OAuth 2.0 system implementation with multiple providers, including RBAC and secure session management."
        image_url = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3`&auto=format`&fit=crop`&w=1350`&q=80"
        tags = @("OAuth", "Segurança", "RBAC")
        tags_en = @("OAuth", "Security", "RBAC")
        tags_en = @("OAuth", "Security", "RBAC")
        external_url = "https://example.com/auth-system"
        category = "backend"
        date = "Nov 2023"
        date_en = "Nov 2023"
    }
)

foreach ($project in $projects) {
    $projectData = @{
        data = @{
            title = $project.title
            title_en = $project.title_en
            description = $project.description
            description_en = $project.description_en
            image_url = $project.image_url
            tags = $project.tags
            tags_en = $project.tags_en
            external_url = $project.external_url
            category = $project.category
            date = $project.date
            date_en = $project.date_en
            publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$STRAPI_URL/api/projects" -Method Post -Headers $headers -Body $projectData
        Write-Host "Projeto '$($project.title)' criado!" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao criar projeto '$($project.title)': $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nðŸ“ Todos os projetos foram processados!" -ForegroundColor Cyan
