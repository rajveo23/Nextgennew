# NextGen Registry - Quick Deployment Script for Windows
# Run this script in PowerShell to prepare for deployment

Write-Host "🚀 NextGen Registry - Deployment Preparation" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check Node.js version
Write-Host "`n📋 Checking Prerequisites..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found. Run this script from project root." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Run linting
Write-Host "`n🔍 Running linter..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Linting passed" -ForegroundColor Green
} else {
    Write-Host "⚠️ Linting issues found (non-critical)" -ForegroundColor Yellow
}

# Build the project
Write-Host "`n🔨 Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
    Write-Host "💡 Try: rm -rf node_modules package-lock.json && npm install" -ForegroundColor Cyan
    exit 1
}

# Test the build
Write-Host "`n🧪 Testing build..." -ForegroundColor Yellow
Write-Host "Starting server for 10 seconds to test..." -ForegroundColor Cyan

# Start the server in background and test
$job = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    npm start 
}

Start-Sleep -Seconds 5

# Test if server is responding
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Server is responding correctly" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Server test failed, but build is complete" -ForegroundColor Yellow
}

# Stop the test server
Stop-Job $job -Force
Remove-Job $job -Force

Write-Host "`n🎉 Deployment Preparation Complete!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. 📚 Read VERCEL_DEPLOYMENT_GUIDE.md for Vercel deployment" -ForegroundColor White
Write-Host "2. 🌐 Read REAL_DOMAIN_DEPLOYMENT_GUIDE.md for custom domain" -ForegroundColor White
Write-Host "3. 🔧 Check DEPLOYMENT_TROUBLESHOOTING.md if issues arise" -ForegroundColor White
Write-Host "4. 📧 Configure environment variables from .env.example" -ForegroundColor White

Write-Host "`n🚀 Ready for deployment to:" -ForegroundColor Green
Write-Host "   • Vercel (Recommended for testing)" -ForegroundColor White
Write-Host "   • Custom domain (After Vercel testing)" -ForegroundColor White

Write-Host "`n📞 Support: info@nextgenregistry.com" -ForegroundColor Cyan
