# Script de diagnóstico simplificado
$STRAPI_URL = "http://localhost:1337"

Write-Host "Testando conexao com Strapi..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "$STRAPI_URL/admin" -Method GET -UseBasicParsing -TimeoutSec 10
    Write-Host "Strapi esta respondendo: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Strapi nao esta respondendo: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Verifique se o Strapi esta rodando com: cd strapi-portfolio-cms; npx strapi develop" -ForegroundColor Yellow
    exit 1
}

# Testar content-types
$contentTypes = @("heroes", "abouts", "services", "stats", "projects")

foreach ($ct in $contentTypes) {
    try {
        $response = Invoke-WebRequest -Uri "$STRAPI_URL/api/$ct" -Method GET -UseBasicParsing -TimeoutSec 5
        Write-Host "$ct - GET: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Host "$ct - GET: $status" -ForegroundColor Yellow
    }
}

Write-Host "Diagnostico concluido!" -ForegroundColor Cyan