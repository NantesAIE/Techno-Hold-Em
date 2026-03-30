# Techno Hold 'Em – TechnoVision 2026 --

Application web de positionnement projet basée sur le framework TechnoVision 2026 de Capgemini.

## Présentation

**Techno Hold 'Em** est une expérience interactive de 5 à 7 minutes permettant de positionner un projet par rapport aux trends TechnoVision 2026.
Inspirée du Hold 'Em (poker), elle structure l'assessment en 3 rounds : FLOP, TURN et RIVER.

### Parcours

1. **Home** – Présentation et CTA démarrer
2. **Project Setup** – Nom, secteur, nature, mode contractuel
3. **Trend Selection** – Choisir 3 à 5 trends parmi les 9 containers TechnoVision 2026
4. **Assessment** – 8 questions QCM (FLOP × 3 + TURN × 3 + RIVER × 2)
5. **Résultats** – Radar, scores par trend, synthèse, 3 actions concrètes
6. **Email** – Envoi par mailto + fallback copier

### Contraintes respectées

- ✅ 37 trends TechnoVision 2026 exactes (9 containers)
- ✅ Au moins 1 trend **Balance by Design** obligatoire
- ✅ Score par dimension : Fondations, Exécution, Balance
- ✅ 3 actions concrètes avec bénéfices et trends impactées
- ✅ Envoi par `mailto:` avec CC `aie_nantes.fr@capgemini.com`
- ✅ Fallback "Copier le résumé"
- ✅ Aucun appel réseau externe
- ✅ Aucun backend requis

---

## Déploiement sur Windows

### Prérequis

- [Node.js](https://nodejs.org) version 18 ou supérieure
- Un navigateur moderne (Chrome, Edge, Firefox)

### Déploiement en 1 clic

Double-cliquez sur `deploy.bat`

Ce script :
1. Vérifie Node.js
2. Installe les dépendances (`npm install`)
3. Construit l'application (`npm run build`)
4. Lance un serveur local sur `http://localhost:4173`
5. Ouvre automatiquement le navigateur

### Déploiement manuel

```bat
npm install
npm run build
npm run preview
```

L'application sera accessible sur `http://localhost:4173`.

### Mode développement (avec hot-reload)

```bat
npm run dev
```

Ou double-cliquez sur `dev.bat`.

---

## Structure du projet

```
src/
├── data/
│   ├── technovision2026.ts    # 9 containers, 37 trends, suggestions
│   ├── questions.ts           # 8 questions QCM (FLOP/TURN/RIVER)
│   └── actionTemplates.ts     # 9 templates d'actions
├── engine/
│   ├── scoring.ts             # Calcul des scores par dimension et trend
│   └── actionsEngine.ts       # Sélection des 3 actions
├── store/
│   ├── types.ts               # Types AppState, AppAction
│   └── AppContext.tsx          # Context + Reducer
├── components/
│   ├── Header.tsx             # Navigation fixe
│   ├── RadarChart.tsx         # Radar recharts (3 axes)
│   ├── ActionCard.tsx         # Carte action concrète
│   └── ProgressIndicator.tsx  # Barre de progression jeu
├── pages/
│   ├── Home.tsx               # Page d'accueil
│   ├── ProjectSetup.tsx       # Formulaire projet
│   ├── TrendSelection.tsx     # Grille 9 containers
│   ├── GamePage.tsx           # Assessment QCM
│   ├── ResultsPage.tsx        # Résultats complets
│   └── EmailPage.tsx          # Envoi email / copie
├── styles/
│   └── globals.css            # Design system Capgemini
├── App.tsx                    # Router basé sur état
└── main.tsx                   # Entry point React
```

---

## Design System

| Token | Valeur |
|---|---|
| Capgemini Blue | `#0070AD` |
| Vibrant Blue | `#12ABDB` |
| Dark Grey | `#272936` |
| Cool Grey | `#F6F6F6` |
| White | `#FFFFFF` |

- Fond sombre (`#272936`)
- Police : Ubuntu → Verdana → system-ui
- Touch-first : zones tactiles min. 56px
- Responsive : totem 1080×1920, tablette portrait/paysage

---

## Scoring

| Round | Questions | Dimension |
|---|---|---|
| FLOP | Q1, Q2, Q3 | Fondations |
| TURN | Q4, Q5, Q6 | Exécution |
| RIVER | Q7, Q8 | Balance |

- Chaque réponse : 0 à 3 points
- Score dimension : `(somme réponses / max) × 100`
- Score trend : moyenne pondérée selon le container
- Labels : **Bien positionné** (≥67) · **Prometteur mais fragile** (34–66) · **Sous tension** (<34)

---

## Développement

### Technologies

- **React 18** + **TypeScript**
- **Vite** (bundler)
- **recharts** (radar chart)
- Context + Reducer (state management)

### Ajouter des questions

Éditez `src/data/questions.ts` — chaque question a :
- `dimension` : `'Foundations' | 'Execution' | 'Balance'`
- `round` : `'FLOP' | 'TURN' | 'RIVER'`
- 4 réponses avec scores 0–3

### Modifier les actions

Éditez `src/data/actionTemplates.ts` — chaque action cible une dimension et des trends spécifiques.

---

*Capgemini © TechnoVision 2026 — V1 sans backend*
