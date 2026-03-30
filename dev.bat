@echo off
chcp 65001 >nul
echo.
echo  Techno Hold 'Em - Mode developpement
echo.
echo  Demarrage du serveur de developpement...
echo  Application disponible sur http://localhost:5173
echo.
call npm install
call npm run dev
pause
