@echo off
title Pixtron Systems - Drug QR API Backend (Port 5000)
color 0A

echo ================================================================
echo    PIXTRON SYSTEMS - DRUG QR VERIFICATION BACKEND (AWS RDS)
echo ================================================================
echo.

cd /d "%~dp0"

IF NOT EXIST "Backend\venv\Scripts\python.exe" (
    echo [!] Virtual environment not found in Backend\venv!
    echo [*] Creating virtual environment...
    py -m venv Backend\venv
    echo [*] Installing dependencies from Backend\requirements.txt...
    Backend\venv\Scripts\pip.exe install -r Backend\requirements.txt
)

echo [*] Starting Backend with 24/7 Keep-Alive Auto-Restart...
echo [*] API URL: http://localhost:5000/api/drug-verify
echo [*] Health:  http://localhost:5000/api/health
echo.

Backend\venv\Scripts\python.exe Backend\keep_alive.py

pause
