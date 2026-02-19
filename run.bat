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

if exist "app\\package.json" (
  echo Building admin dashboard...
  "%NPM_CMD%" run build:admin
  if errorlevel 1 (
    echo WARNING: admin build failed. Check app\\ folder.
  )
)

echo Starting dev server...
start "Sandify Dev" cmd /k ""%NPM_CMD%" run dev"

set "NGROK_EXE=C:\Users\Admin\AppData\Local\Microsoft\WindowsApps\ngrok.exe"
if exist "%NGROK_EXE%" (
  echo Starting ngrok tunnel...
  timeout /t 3 /nobreak >nul
  start "ngrok" "%NGROK_EXE%" http 5173
  echo Share the ngrok URL shown in the ngrok window.
) else (
  echo ngrok not found at %NGROK_EXE%
  echo Run: where ngrok
  echo Then update run.bat with that path.
)
pause
