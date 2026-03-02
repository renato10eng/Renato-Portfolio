# Script para popular o Strapi com dados do portfÃ³lio
# Execute este script APÃ“S configurar o API Token no Strapi

$STRAPI_URL = "http://localhost:1337"
$API_TOKEN = '722bc66942b3655d5c2f09184cad7991e268feac1bab9e15fe88d462a85e4f41523d32cc746de3af3e0c7e1fd7a0874935c225008e671923fdd4e5bfacef550f5572dfade8dfede3bca7316759889baf3e457bf32e04068c16b38b86823c40ccd570c6cdbff3b8b187d1a062b7a5ec2e6d82ab10739512d54d23767887ed34a9' # VocÃª precisa definir isso no Strapi Admin > Settings > API Tokens

$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "Iniciando criacao de conteudo no Strapi..." -ForegroundColor Green

# 1. Criar Hero
Write-Host "Criando conteudo Hero..." -ForegroundColor Yellow
$heroData = @{
    data = @{
        title = "PortfÃ³lio de"
        subtitle = "Desenvolvedor Full-Stack `& Arquiteto Front-End"
        description = "Transformando ideias em soluÃ§Ãµes digitais eficientes atravÃ©s de projetos inovadores em desenvolvimento de software, front-end e back-end."
        cta_primary_text = "Explorar Projetos"
        cta_secondary_text = "Entre em contato"
        publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    }
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$STRAPI_URL/api/heroes" -Method Post -Headers $headers -Body $heroData
    Write-Host "Hero criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao criar Hero: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Criar About
Write-Host "Criando conteudo About..." -ForegroundColor Yellow
$aboutData = @{
    data = @{
        title = "Sobre o Profissional"
        subtitle = "ConheÃ§a mais sobre minha experiÃªncia e formaÃ§Ã£o"
        description = "Como desenvolvedor full-stack com especializaÃ§Ã£o em front-end, tenho desenvolvido projetos que combinam conhecimento tÃ©cnico, metodologias Ã¡geis e novas tecnologias para otimizar aplicaÃ§Ãµes e melhorar a experiÃªncia do usuÃ¡rio."
        experience_years = 6
        experience_description = "Com mais de 6 anos de experiÃªncia no mercado, combinando conhecimento tÃ©cnico e visÃ£o estratÃ©gica para desenvolver soluÃ§Ãµes inovadoras em aplicaÃ§Ãµes web e sistemas distribuÃ­dos. Formado em CiÃªncia da ComputaÃ§Ã£o, com especializaÃ§Ã£o em desenvolvimento full-stack."
        certifications = "AWS Certified, React Certified, Scrum Master"
        education = "CiÃªncia da ComputaÃ§Ã£o, Desenvolvimento Web, Arquitetura de Software"
        projects_count = "+30 concluÃ­dos"
        clients = "Nacionais e Internacionais"
        publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    }
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$STRAPI_URL/api/abouts" -Method Post -Headers $headers -Body $aboutData
    Write-Host "About criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao criar About: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Criar Services
Write-Host "Criando servicos..." -ForegroundColor Yellow
$services = @(
    @{
        title = "OtimizaÃ§Ã£o de Processos"
        description = "AnÃ¡lise e redesenho de processos produtivos para aumentar eficiÃªncia e reduzir desperdÃ­cios utilizando metodologias Lean e Six Sigma."
        icon = "optimization"
    },
    @{
        title = "GestÃ£o da Cadeia de Suprimentos"
        description = "Planejamento integrado de toda a cadeia logÃ­stica, desde fornecedores atÃ© o consumidor final, otimizando tempo, custos e qualidade."
        icon = "supply-chain"
    },
    @{
        title = "AnÃ¡lise de Dados"
        description = "AplicaÃ§Ã£o de mÃ©todos estatÃ­sticos e analÃ­ticos para transformar dados em insights acionÃ¡veis para tomada de decisÃ£o em engenharia."
        icon = "data-analysis"
    },
    @{
        title = "Planejamento e Controle da ProduÃ§Ã£o"
        description = "Desenvolvimento de sistemas para planejamento, programaÃ§Ã£o e controle dos recursos produtivos visando mÃ¡xima eficiÃªncia."
        icon = "planning"
    },
    @{
        title = "GestÃ£o da Qualidade"
        description = "ImplementaÃ§Ã£o de sistemas de qualidade baseados em normas internacionais para garantir excelÃªncia em produtos e serviÃ§os."
        icon = "quality"
    },
    @{
        title = "Modelagem de Indicadores de Desempenho"
        description = "CriaÃ§Ã£o de dashboards e sistemas de KPIs para monitoramento contÃ­nuo de operaÃ§Ãµes e processos crÃ­ticos."
        icon = "indicators"
    }
)

foreach ($service in $services) {
    $serviceData = @{
        data = @{
            title = $service.title
            description = $service.description
            icon = $service.icon
            publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Uri "$STRAPI_URL/api/services" -Method Post -Headers $headers -Body $serviceData
        Write-Host "Servico '$($service.title)' criado!" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao criar servico '$($service.title)': $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 4. Criar Stats
Write-Host "Criando estatisticas..." -ForegroundColor Yellow
$statsData = @{
    data = @{
        years_experience = 6
        projects_completed = 30
        satisfied_clients = 15
        success_rate = 98
        publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    }
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$STRAPI_URL/api/stats" -Method Post -Headers $headers -Body $statsData
    Write-Host "Estatisticas criadas com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao criar estatisticas: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Criar Technologies
Write-Host "Criando tecnologias..." -ForegroundColor Yellow
$technologies = @(
    @{ name = "React"; category = "frontend" },
    @{ name = "TypeScript"; category = "frontend" },
    @{ name = "Next.js"; category = "frontend" },
    @{ name = "Node.js"; category = "backend" },
    @{ name = "Express"; category = "backend" },
    @{ name = "PostgreSQL"; category = "database" },
    @{ name = "MongoDB"; category = "database" },
    @{ name = "AWS"; category = "cloud" },
    @{ name = "Docker"; category = "devops" },
    @{ name = "Git"; category = "tools" }
)

foreach ($tech in $technologies) {
    $techData = @{
        data = @{
            name = $tech.name
            category = $tech.category
            publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Uri "$STRAPI_URL/api/technologies" -Method Post -Headers $headers -Body $techData
        Write-Host "Tecnologia '$($tech.name)' criada!" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao criar tecnologia '$($tech.name)': $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 6. Criar Contact
Write-Host "Criando informacoes de contato..." -ForegroundColor Yellow
$contactData = @{
    data = @{
        title = "InformaÃ§Ãµes de Contato"
        subtitle = "Estou disponÃ­vel para novos projetos, consultorias e parcerias. Entre em contato para discutirmos como posso ajudar sua empresa a alcanÃ§ar melhores resultados atravÃ©s da engenharia de produÃ§Ã£o e logÃ­stica."
        location = "SÃ£o Paulo, SP - Brasil"
        email = "renato10eng@gmail.com"
        phone = "+55 (11) 91234-5678"
        whatsapp = "+55 (11) 91234-5678"
        publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    }
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$STRAPI_URL/api/contacts" -Method Post -Headers $headers -Body $contactData
    Write-Host "Contato criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao criar contato: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nProcesso concluido!" -ForegroundColor Cyan
Write-Host "Lembre-se: Configure o API Token no Strapi Admin > Settings > API Tokens" -ForegroundColor Yellow
Write-Host "Execute este script novamente apos configurar o token." -ForegroundColor Yellow
