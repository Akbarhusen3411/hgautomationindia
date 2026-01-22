@echo off
title Deploy to GitHub Pages
echo.
echo ================================================
echo    Deploying HG Automation to GitHub Pages
echo ================================================
echo.

cd /d "%~dp0"

echo Step 1: Installing gh-pages package...
call npm install gh-pages --save-dev

echo.
echo Step 2: Building and deploying to GitHub...
call npm run deploy

echo.
echo ================================================
echo    DEPLOYMENT COMPLETE!
echo ================================================
echo.
echo Your website is now live at:
echo.
echo    https://Akbarhusen3411.github.io/hgautomationindia
echo.
echo Opening website in browser...
start "" "https://Akbarhusen3411.github.io/hgautomationindia"
echo.
pause
