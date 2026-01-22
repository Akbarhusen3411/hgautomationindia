@echo off
title HG Automation Website
echo.
echo ========================================
echo    HG Automation Website Starting...
echo ========================================
echo.
echo Opening http://localhost:3000 in browser...
echo.

cd /d "%~dp0"
start "" http://localhost:3000
npm start
