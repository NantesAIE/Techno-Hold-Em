import type { Translations } from './types';

const fr: Translations = {
  landing: {
    badge: 'Capgemini \u00b7 TechnoVision 2026',
    tagline: 'Donner du sens au mouvement technologique',
    micro: '37\u00a0trends\u00a0\u00b7\u00a09\u00a0containers\u00a0\u00b7\u00a01\u00a0\u00e9quilibre\u00a0\u00e0\u00a0trouver',
    ctaLabel: 'Commencer',
    ctaAriaLabel: "Commencer l'assessment TechnoVision 2026",
    footer: 'Bas\u00e9 sur TechnoVision 2026 \u2013 The Sync Swing',
    langSwitch: 'EN',
    langSwitchAriaLabel: 'Switch to English',
  },

  intro: {
    badge: 'The Sync Swing \u00b7 TechnoVision 2026',
    titleSub: 'Donner du sens au {accent}',
    titleAccent: 'mouvement technologique',
    subtitle:
      "Dans un monde en oscillation permanente, l'enjeu n'est pas de choisir une technologie, mais de comprendre comment les tendances se synchronisent.",
    card1Label: "Qu'est-ce que TechnoVision\u00a0?",
    card1Text:
      "TechnoVision est le framework technologique de Capgemini. Il structure 37 trends en 9 containers pour aider les organisations \u00e0 distinguer le signal du bruit et \u00e0 transformer l'innovation en d\u00e9cisions concr\u00e8tes.",
    card2Label: 'Pourquoi cet assessment\u00a0?',
    card2Text:
      "Cet assessment vous permet de positionner un projet r\u00e9el par rapport aux tendances TechnoVision 2026. En quelques minutes, vous identifiez vos forces, vos zones de tension et les leviers prioritaires pour progresser.",
    delLabel: 'Ce que vous allez obtenir',
    deliverables: [
      'Un positionnement clair sur les trends cl\u00e9s',
      'Une lecture \u00e9quilibre / ex\u00e9cution / fondations',
      '3 actions concr\u00e8tes pour renforcer votre trajectoire',
    ],
    cta: 'Explorer les trends TechnoVision',
    duration: '5 \u2013 7 minutes \u00b7 Aucun compte requis',
    footer: 'Bas\u00e9 sur TechnoVision 2026 \u2014 The Sync Swing \u00b7 Capgemini',
  },

  header: {
    steps: {
      trends: 'S\u00e9lection des trends',
      game: 'Assessment',
      results: 'R\u00e9sultats',
    },
    backAriaLabel: 'Retour',
    resetAriaLabel: 'Recommencer',
  },

  trends: {
    title: 'Votre main',
    descLine1: 'Selectionnez les trends TechnoVision 2026 de votre projet.',
    descLine2: 'Au moins 1 trend Balance by Design est obligatoire.',
    handLabel: 'Main s\u00e9lectionn\u00e9e',
    balanceRequired: 'Balance by Design requis',
    required: 'Requis',
    infoAriaPrefix: 'En savoir plus sur',
    cta: (count) =>
      `Lancer l'assessment (${count} trend${count > 1 ? 's' : ''})`,
    errBalance: 'Selectionnez au moins 1 trend Balance by Design',
    errMin: (min) => `Selectionnez au moins ${min} trends`,
  },

  game: {
    rounds: {
      FLOP: 'Mise de d\u00e9part \u2014 clart\u00e9 & fondations',
      TURN: 'Relance \u2014 ex\u00e9cution & maturit\u00e9',
      RIVER: 'Carte finale \u2014 \u00e9quilibre & contr\u00f4le',
    },
    whyBtn: 'Pourquoi cette question\u00a0?',
    legend: '0 = Non adress\u00e9 \u00b7 1 = Partiel \u00b7 2 = En cours \u00b7 3 = Complet',
  },

  results: {
    assessmentLabel: 'Assessment TechnoVision 2026',
    radarTitle: 'Radar de positionnement',
    dimensions: {
      foundations: 'Fondations',
      execution: 'Ex\u00e9cution',
      balance: 'Balance',
    },
    trendScoresTitle: 'Scores par trend',
    synthesisTitle: 'Synth\u00e8se projet',
    forcesTitle: 'Forces',
    tensionTitle: 'Sous tension',
    balanceTitle: 'Balance by Design',
    balanceLowWarning:
      "Point d'attention\u00a0: la dimension humaine et confiance est insuffisamment adress\u00e9e.",
    actionsTitle: '3 actions concr\u00e8tes',
    actionsSubtitle: 'S\u00e9lectionn\u00e9es selon vos dimensions les plus faibles',
    newAssessment: 'Nouvel assessment',
    scoreLabels: {
      good: 'Bien positionn\u00e9',
      fragile: 'Prometteur mais fragile',
      tension: 'Sous tension',
    },
  },

  qrBlock: {
    title: "R\u00e9cup\u00e9rez votre plan d'action",
    desc: "Scannez ce QR code avec votre t\u00e9l\u00e9phone pour consulter et partager votre plan d'action.",
    enlarge: 'Agrandir le QR code',
    shrink: 'R\u00e9duire le QR code',
    hint: "Pointe vers ce QR code avec l'app Appareil photo ou un lecteur QR pour ouvrir la page sur ton t\u00e9l\u00e9phone.",
  },

  actionCard: {
    dimensions: {
      foundations: 'Fondations',
      execution: 'Ex\u00e9cution',
      balance: 'Balance by Design',
    },
    trendsLabel: 'Trends impact\u00e9es',
  },

  share: {
    headerSuper: "Techno Hold 'Em",
    headerTitle: "Votre plan d'action",
    aieChip: "G\u00e9n\u00e9r\u00e9 \u00e0 l'AIE de Nantes",
    positionTitle: 'Votre positionnement',
    forcesLabel: 'Forces',
    tensionLabel: 'Sous tension',
    actionsTitle: 'Vos 3 actions prioritaires',
    ctaTitle: 'Aller plus loin',
    ctaDesc:
      "Copiez votre plan d'action ou contactez directement l'AIE de Nantes pour approfondir TechnoVision 2026 et les prochaines \u00e9tapes.",
    copyBtn: "Copier le plan d'action",
    copiedBtn: "Plan d'action copi\u00e9\u00a0!",
    contactBtn: "Contacter l'AIE de Nantes",
    aieOrg: 'AIE de Nantes',
    aieTeam: 'Atelier Innovation & Expertise Capgemini',
    footer: "Techno Hold 'Em \u00b7 Capgemini \u00b7 TechnoVision 2026 \u2014 The Sync Swing",
    errorTitle: 'Lien invalide ou expir\u00e9',
    errorDesc:
      "Ce lien ne contient pas de plan d'action valide. Revenez sur le totem et scannez \u00e0 nouveau le QR code.",
    trendsLabel: 'Trends\u00a0: ',
    scoreLabels: {
      B: 'Bien positionn\u00e9',
      P: 'Prometteur mais fragile',
      S: 'Sous tension',
    },
  },

  planText: {
    header: "=== TECHNO HOLD 'EM \u2014 VOTRE PLAN D'ACTION ===",
    generated: "G\u00e9n\u00e9r\u00e9 \u00e0 l'AIE de Nantes \u2013 TechnoVision 2026",
    trendsSection: 'TRENDS ANALYS\u00c9S',
    positioningSection: 'POSITIONNEMENT',
    forcesLabel: '\u2713 Forces      : ',
    tensionLabel: '! Sous tension : ',
    actionsSection: "VOS 3 ACTIONS PRIORITAIRES",
    footer: "Techno Hold 'Em \u00b7 Capgemini \u00b7 TechnoVision 2026",
    trendsImpacted: 'Trends : ',
  },

  emailText: {
    intro: "J'ai r\u00e9alis\u00e9 un assessment Techno Hold 'Em et je souhaite approfondir TechnoVision et le plan d'action associ\u00e9.",
    trendsSection: 'TRENDS ANALYS\u00c9S',
    positioningSection: 'POSITIONNEMENT',
    forcesLabel: 'Forces      : ',
    tensionLabel: 'Sous tension : ',
    actionsSection: '3 ACTIONS PROPOS\u00c9ES',
    closing: 'Je reste disponible pour en discuter.',
    trendsImpacted: 'Trends : ',
  },
};

export default fr;
