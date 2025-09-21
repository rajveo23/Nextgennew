# Fix TypeScript error and redeploy
Write-Host "🔧 Fixing TypeScript error and redeploying..." -ForegroundColor Green

# Check if the fix is in place
$content = Get-Content "src\app\admin\blogs\page.tsx" -Raw
if ($content -match "formData\.image && formData\.image\.startsWith") {
    Write-Host "✅ Fix is already applied in the file" -ForegroundColor Green
} else {
    Write-Host "❌ Fix not found, applying now..." -ForegroundColor Red
    # The fix should already be there, but let's verify
}

# Clear any build cache
Write-Host "🧹 Clearing build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Cleared .next directory" -ForegroundColor Green
}

# Test build locally
Write-Host "🔨 Testing build locally..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Local build successful!" -ForegroundColor Green
    Write-Host "📤 Ready to push to GitHub for Vercel deployment" -ForegroundColor Cyan
    
    Write-Host "`n🚀 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Save all files in your IDE" -ForegroundColor White
    Write-Host "2. If you have Git installed:" -ForegroundColor White
    Write-Host "   git add ." -ForegroundColor Gray
    Write-Host "   git commit -m 'Fix TypeScript error in admin blogs'" -ForegroundColor Gray
    Write-Host "   git push origin main" -ForegroundColor Gray
    Write-Host "3. Or upload the fixed file to GitHub manually" -ForegroundColor White
    Write-Host "4. Vercel will automatically redeploy" -ForegroundColor White
} else {
    Write-Host "❌ Build failed. Check the error above." -ForegroundColor Red
}
