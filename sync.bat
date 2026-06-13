@echo off
echo ==================================================
echo   Starting OpenSigma Automated Git Sync...
echo ==================================================
powershell -ExecutionPolicy Bypass -File "%~dp0sync.ps1"
echo ==================================================
echo   Press any key to close this window.
echo ==================================================
pause
