@echo off
title Sandify - Sand Delivery Marketplace
echo.
echo  ==============================
echo    Sandify Server Starting...
echo  ==============================
echo.
echo  Opening http://localhost:3000
echo  Press Ctrl+C to stop the server
echo.
start http://localhost:3000
npx -y serve -l 3000 .
pause
