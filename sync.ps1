# OpenSigma DataQuest Git Auto-Sync Script
# Run this to push local changes to GitHub in one command

Write-Host "==================================================" -ForegroundColor Green
Write-Host "       OPENSIGMA AUTOMATED GIT SYNCRONIZER        " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# 1. Stage changes
Write-Host "[1/3] Staging all files..." -ForegroundColor Cyan
git add .

# 2. Commit changes
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
Write-Host "[2/3] Creating commit: 'Auto-update: $timestamp'..." -ForegroundColor Cyan
git commit -m "Auto-update: $timestamp"

# 3. Push to GitHub
Write-Host "[3/3] Pushing commits to remote branch (origin/main)..." -ForegroundColor Cyan
git push

Write-Host "==================================================" -ForegroundColor Green
Write-Host " SUCCESS: Codebase synced and pushed successfully!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
