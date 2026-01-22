@echo off
title HG Automation - Build for Deployment
echo.
echo =============================================
echo    Building HG Automation Website...
echo =============================================
echo.

cd /d "%~dp0"

echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Building production version...
call npm run build

echo.
echo =============================================
echo    BUILD COMPLETE!
echo =============================================
echo.
echo Your website files are ready in the "build" folder
echo.
echo TO DEPLOY:
echo 1. Go to https://netlify.com (sign up for free)
echo 2. Click "Add new site" then "Deploy manually"
echo 3. Drag and drop the "build" folder
echo 4. Done! You'll get a URL like: https://yoursite.netlify.app
echo.
echo Opening build folder...
explorer "%~dp0build"
echo.
pause
