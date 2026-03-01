# Script para extrair dados do portfólio e popular o Strapi
# Este script lê os dados estáticos do front-end e os converte para o formato do Strapi

# Configuração
$STRAPI_URL = "http://localhost:1337"
$API_TOKEN = "722bc66942b3655d5c2f09184cad7991e268feac1bab9e15fe88d462a85e4f41523d32cc746de3af3e0c7e1fd7a0874935c225008e671923fdd4e5bfacef550f5572dfade8dfede3bca7316759889baf3e457bf32e04068c16b38b86823c40ccd570c6cdbff3b8b187d1a062b7a5ec2e6d82ab10739512d54d23767887ed34a9" # Será definido depois de criar no Strapi

$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type"  = "application/json"
}

Write-Host "🚀 Iniciando extração e população de dados..." -ForegroundColor Cyan

# 1. Extrair dados do portfólio (simulado - em produção leria os arquivos TS)
Write-Host "📖 Extraindo dados do portfólio..." -ForegroundColor Yellow

# Dados do Hero (baseado no translations.ts)
$heroData = @{
    data = @{
        title              = "Portfólio de"
        subtitle           = 'Desenvolvedor Full-Stack & Arquiteto Front-End'
        description        = "Transformando ideias em soluções digitais eficientes através de projetos inovadores em desenvolvimento de software, front-end e back-end."
        cta_primary_text   = "Explorar Projetos"
        cta_secondary_text = "Entre em contato"
        publishedAt        = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    }
} | ConvertTo-Json

# Dados do About
$aboutData = @{
    data = @{
        title                  = "Sobre o Profissional"
        subtitle               = "Conheça mais sobre minha experiência e formação"
        description            = "Como desenvolvedor full-stack com especialização em front-end, tenho desenvolvido projetos que combinam conhecimento técnico, metodologias ágeis e novas tecnologias para otimizar aplicações e melhorar a experiência do usuário."
        experience_years       = 6
        experience_description = "Com mais de 6 anos de experiência no mercado, combinando conhecimento técnico e visão estratégica para desenvolver soluções inovadoras em aplicações web e sistemas distribuídos. Formado em Ciência da Computação, com especialização em desenvolvimento full-stack."
        certifications         = "AWS Certified, React Certified, Scrum Master"
        education              = "Ciência da Computação, Desenvolvimento Web, Arquitetura de Software"
        projects_count         = "+30 concluídos"
        clients                = "Nacionais e Internacionais"
        publishedAt            = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    }
} | ConvertTo-Json

# Dados dos Services
$servicesData = @(
    @{
        data = @{
            titleKey     = "process_optimization"
            descriptionKey = "process_optimization_desc"
            icon         = "workflow"
            publishedAt  = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            titleKey     = "supply_chain_management_service"
            descriptionKey = "scm_service_desc"
            icon         = "truck"
            publishedAt  = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            titleKey     = "data_analysis"
            descriptionKey = "data_analysis_desc"
            icon         = "bar-chart"
            publishedAt  = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            titleKey     = "production_planning"
            descriptionKey = "production_planning_desc"
            icon         = "settings"
            publishedAt  = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            titleKey     = "quality_management"
            descriptionKey = "quality_management_desc"
            icon         = "shield-check"
            publishedAt  = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            titleKey     = "indicators_modeling"
            descriptionKey = "indicators_desc"
            icon         = "line-chart"
            publishedAt  = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    }
)

# Dados dos Stats
$statsData = @(
    @{
        data = @{
            value       = 10
            label       = "Anos de Experiência"
            labelKey    = "years_exp"
            suffix      = "+"
            publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            value       = 50
            label       = "Projetos Concluídos"
            labelKey    = "projects_completed"
            suffix      = "+"
            publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            value       = 30
            label       = "Clientes Satisfeitos"
            labelKey    = "satisfied_clients"
            suffix      = "+"
            publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    },
    @{
        data = @{
            value       = 98
            label       = "Taxa de Sucesso"
            labelKey    = "success_rate"
            suffix      = "%"
            publishedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
        }
    }
)

# 2. Popular o Strapi
Write-Host "📤 Populando o Strapi..." -ForegroundColor Yellow

if ([string]::IsNullOrEmpty($API_TOKEN)) {
    Write-Host "❌ ERRO: API_TOKEN não definido. Configure um token no Strapi Admin > Settings > API Tokens" -ForegroundColor Red
    exit 1
}

# Hero
try {
    Invoke-RestMethod -Uri "$STRAPI_URL/api/heroes" -Method Post -Headers $headers -Body $heroData
    Write-Host "✅ Hero criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao criar Hero: $($_.Exception.Message)" -ForegroundColor Red
}

# About
try {
    Invoke-RestMethod -Uri "$STRAPI_URL/api/abouts" -Method Post -Headers $headers -Body $aboutData
    Write-Host "✅ About criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao criar About: $($_.Exception.Message)" -ForegroundColor Red
}

# Services
foreach ($service in $servicesData) {
    try {
        $serviceJson = $service | ConvertTo-Json
        Invoke-RestMethod -Uri "$STRAPI_URL/api/services" -Method Post -Headers $headers -Body $serviceJson
        Write-Host "✅ Service criado: $($service.data.titleKey)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Erro ao criar Service $($service.data.titleKey): $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Stats
foreach ($stat in $statsData) {
    try {
        $statJson = $stat | ConvertTo-Json
        Invoke-RestMethod -Uri "$STRAPI_URL/api/stats" -Method Post -Headers $headers -Body $statJson
        Write-Host "✅ Stat criado: $($stat.data.label)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Erro ao criar Stat $($stat.data.label): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host '🎉 População concluída!' -ForegroundColor Cyan
Write-Host '📝 Próximos passos:' -ForegroundColor Yellow
Write-Host '  1. Verifique os dados no painel do Strapi' -ForegroundColor White
Write-Host '  2. Execute populate-projects.ps1 para projetos' -ForegroundColor White
Write-Host '  3. Teste a integração no front-end' -ForegroundColor White