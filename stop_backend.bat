@echo off
title Stop Pixtron Backend
echo Stopping Pixtron Backend processes on Port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    taskkill /F /PID %%a
)
echo Backend stopped successfully.
pause
