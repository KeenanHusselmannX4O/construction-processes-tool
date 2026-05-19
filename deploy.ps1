# Deploy Construction Platform Docs to Vercel
# Run from: 01_Construction_Platform_Docs/
# Usage: .\deploy.ps1 [-Prod]

param(
    [switch]$Prod
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

Write-Host "`n  Construction Platform — Vercel Deploy" -ForegroundColor Cyan
Write-Host "  ======================================`n"

# Check Vercel CLI
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "  [!] Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Verify structure
$htmlCount = (Get-ChildItem $root -Recurse -Filter "*.html").Count
Write-Host "  Files: $htmlCount HTML documents" -ForegroundColor White
Write-Host "  Source: $root" -ForegroundColor Gray

if (-not (Test-Path "$root\index.html")) {
    Write-Host "  [X] Missing index.html — aborting" -ForegroundColor Red
    exit 1
}

# Deploy
Write-Host ""
if ($Prod) {
    Write-Host "  Deploying to PRODUCTION..." -ForegroundColor Green
    Push-Location $root
    vercel --prod --yes
    Pop-Location
} else {
    Write-Host "  Deploying PREVIEW..." -ForegroundColor Yellow
    Write-Host "  (Use -Prod flag for production deploy)`n"
    Push-Location $root
    vercel --yes
    Pop-Location
}

Write-Host "`n  Done!`n" -ForegroundColor Green
