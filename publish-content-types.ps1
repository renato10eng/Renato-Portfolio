# Script para publicar content types existentes no Strapi

$STRAPI_URL = "http://localhost:1337"
$API_TOKEN = "722bc66942b3655d5c2f09184cad7991e268feac1bab9e15fe88d462a85e4f41523d32cc746de3af3e0c7e1fd7a0874935c225008e671923fdd4e5bfacef550f5572dfade8dfede3bca7316759889baf3e457bf32e04068c16b38b86823c40ccd570c6cdbff3b8b187d1a062b7a5ec2e6d82ab10739512d54d23767887ed34a9"

$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "Publicando content types existentes..." -ForegroundColor Cyan

# Content types para publicar
$contentTypes = @("hero", "about", "service", "stat", "technology", "contact", "project")

foreach ($ct in $contentTypes) {
    try {
        # Tentar publicar o content type
        $response = Invoke-WebRequest -Uri "$STRAPI_URL/content-type-builder/content-types/api::$ct.$ct/publish" -Method Post -Headers $headers -UseBasicParsing
        Write-Host "Content type '$ct' publicado!" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao publicar '$ct': $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Tentativa de publicacao concluida. Testando API..." -ForegroundColor Cyan

# Testar se a API agora funciona
Start-Sleep -Seconds 2
try {
    $testResponse = Invoke-WebRequest -Uri "$STRAPI_URL/api/heroes" -UseBasicParsing
    Write-Host "API funcionando! Agora execute os scripts de populacao." -ForegroundColor Green
} catch {
    Write-Host "API ainda nao funciona. Pode ser necessario criar os content types manualmente." -ForegroundColor Red
}