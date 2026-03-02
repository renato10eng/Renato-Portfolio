# Script simplificado para configurar e popular Strapi

Write-Host "🔧 Script para popular Strapi automaticamente" -ForegroundColor Cyan
Write-Host "📝 Você precisa configurar o API Token primeiro:" -ForegroundColor Yellow
Write-Host "   1. Acesse http://localhost:1337/admin" -ForegroundColor Yellow
Write-Host "   2. Vá em Settings > API Tokens" -ForegroundColor Yellow
Write-Host "   3. Crie um token com 'Full access'" -ForegroundColor Yellow
Write-Host "   4. Cole o token abaixo:" -ForegroundColor Yellow

$API_TOKEN = Read-Host "Digite o API Token"

# Configurar token no primeiro script
$script1 = Get-Content ".\populate-strapi.ps1" -Raw
$script1 = $script1 -replace '\$API_TOKEN = ""', "`$API_TOKEN = '$API_TOKEN'"
$script1 | Set-Content ".\populate-strapi.ps1" -Encoding UTF8

# Configurar token no segundo script
$script2 = Get-Content ".\populate-projects.ps1" -Raw
$script2 = $script2 -replace '\$API_TOKEN = ""', "`$API_TOKEN = '$API_TOKEN'"
$script2 | Set-Content ".\populate-projects.ps1" -Encoding UTF8

Write-Host "✅ Token configurado nos scripts!" -ForegroundColor Green

# Executar scripts
Write-Host "🚀 Executando populacao..." -ForegroundColor Cyan
& ".\populate-strapi.ps1"
& ".\populate-projects.ps1"

Write-Host "🎉 Concluido!" -ForegroundColor Green