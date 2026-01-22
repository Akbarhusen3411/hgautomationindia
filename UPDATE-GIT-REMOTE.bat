@echo off
title Update Git Remote URL
echo.
echo Updating git remote to new repository name...
echo.

cd /d "%~dp0"

git remote set-url origin https://github.com/Akbarhusen3411/hgautomationindia.git

echo Done! Remote URL updated.
echo.
echo Now you can run DEPLOY-TO-GITHUB.bat
echo.
pause
