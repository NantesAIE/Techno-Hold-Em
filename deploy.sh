#!/usr/bin/env bash
set -e

echo ""
echo " ============================================================"
echo "  Techno Hold 'Em - TechnoVision 2026"
echo "  Déploiement local (Mac / Linux)"
echo " ============================================================"
echo ""

# Check Node.js
if ! command -v node &>/dev/null; then
  echo " [ERREUR] Node.js n'est pas installé."
  echo " Téléchargez-le sur https://nodejs.org (version 18+)"
  exit 1
fi

echo " Node.js détecté : $(node --version)"
echo ""

echo " [1/3] Installation des dépendances..."
npm install

echo ""
echo " [2/3] Construction de l'application..."
npm run build

echo ""
echo " [3/3] Démarrage du serveur local..."
echo ""
echo " ============================================================"
echo "  Application disponible sur : http://localhost:4173"
echo "  Ctrl+C pour arrêter."
echo " ============================================================"
echo ""

# Open browser (Mac: open, Linux: xdg-open)
sleep 1
if [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost:4173 &
elif command -v xdg-open &>/dev/null; then
  xdg-open http://localhost:4173 &
fi

npm run preview
