@echo off
chcp 65001 >nul
echo.
echo  ============================================================
echo   Techno Hold 'Em - TechnoVision 2026
echo   Deploiement local Windows
echo  ============================================================
echo.

REM ── Check Node.js ──────────────────────────────────────────────────────────
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERREUR] Node.js n'est pas installe.
    echo  Telechargez-le sur https://nodejs.org ^(version 18 ou superieure^)
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
echo  Node.js detecte : %NODE_VER%
echo.

REM ── Install dependencies ───────────────────────────────────────────────────
echo  [1/3] Installation des dependances...
call npm install
if %errorlevel% neq 0 (
    echo  [ERREUR] npm install a echoue.
    pause
    exit /b 1
)
echo.

REM ── Build ──────────────────────────────────────────────────────────────────
echo  [2/3] Construction de l'application...
call npm run build
if %errorlevel% neq 0 (
    echo  [ERREUR] La construction a echoue.
    pause
    exit /b 1
)
echo.

REM ── Launch ─────────────────────────────────────────────────────────────────
echo  [3/3] Demarrage du serveur local...
echo.
echo  ============================================================
echo   Application disponible sur :
echo   http://localhost:4173
echo.
echo   Appuyez sur Ctrl+C pour arreter le serveur.
echo  ============================================================
echo.

REM Open browser automatically
timeout /t 2 /nobreak >nul
start http://localhost:4173

call npm run preview
pause
