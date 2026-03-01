# Script de diagnóstico para testar cada content type

$STRAPI_URL = "http://localhost:1337"
$API_TOKEN = "90aec6b56cd28032f7772937c8534f21bc191cf7e26fb29f1320bfff90ed2f14b5dbf867c4e2fbd0da55057fda34fbc2eaeff4b03248514a6236d2d4ae6829b13b41409d293f433a31a92cd6975ef90034e045a3a67a0f74668df61836d0085f3d8da1bee94fc5d36a3064d9337713c6dc8bcc7da01102ade1c3eb9349bb6831"

$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "Diagnóstico: Testando cada content type..." -ForegroundColor Cyan

$contentTypes = @(
    @{ name = "heroes"; display = "Hero" },
    @{ name = "abouts"; display = "About" },
    @{ name = "services"; display = "Service" },
    @{ name = "stats"; display = "Stat" },
    @{ name = "technologies"; display = "Technology" },
    @{ name = "contacts"; display = "Contact" },
    @{ name = "projects"; display = "Project" }
)

foreach ($ct in $contentTypes) {
    Write-Host "Testando $($ct.display)..." -ForegroundColor Yellow

    # Teste GET
    try {
        $getResponse = Invoke-WebRequest -Uri "$STRAPI_URL/api/$($ct.name)" -Method GET -UseBasicParsing
        Write-Host "  GET: OK (status $($getResponse.StatusCode))" -ForegroundColor Green
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Host "  GET: ERRO (status $status)" -ForegroundColor Red
    }

    # Teste POST
    try {
        $postResponse = Invoke-WebRequest -Uri "$STRAPI_URL/api/$($ct.name)" -Method POST -Headers $headers -Body '{"data":{"test":"test"}}' -UseBasicParsing
        Write-Host "  POST: OK (status $($postResponse.StatusCode))" -ForegroundColor Green
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Host "  POST: ERRO (status $status)" -ForegroundColor Red
    }

    Write-Host ""
}

Write-Host "Diagnóstico concluído." -ForegroundColor Cyan