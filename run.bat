@echo off
setlocal
title Sandify - Convex Auth Dev Server
echo.
echo  ==============================
echo    Sandify Dev Server Starting...
echo  ==============================
echo.
echo  Opening http://localhost:5173
echo  Press Ctrl+C to stop the server
echo.
start http://localhost:5173
set "NPM_CMD="
if exist "%ProgramFiles%\\nodejs\\npm.cmd" (
  set "NPM_CMD=%ProgramFiles%\\nodejs\\npm.cmd"
)
if "%NPM_CMD%"=="" (
  where npm >nul 2>&1
  if not errorlevel 1 (
    set "NPM_CMD=npm"
  )
)

if "%NPM_CMD%"=="" (
  echo ERROR: npm not found in PATH or standard install locations.
  echo Please install Node.js and reopen this window.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  "%NPM_CMD%" install
  if errorlevel 1 (
    echo ERROR: npm install failed.
    pause
    exit /b 1
  )
)

echo Starting dev server...
call "%NPM_CMD%" run dev
echo.
echo Dev server exited with code %errorlevel%.
pause
