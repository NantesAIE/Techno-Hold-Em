export type Lang = 'fr' | 'en';

export interface Translations {
  landing: {
    badge: string;
    tagline: string;
    micro: string;
    ctaLabel: string;
    ctaAriaLabel: string;
    footer: string;
    langSwitch: string;       // label for the OTHER language button
    langSwitchAriaLabel: string;
  };

  intro: {
    badge: string;
    titleSub: string;
    titleAccent: string;      // the gradient-coloured word(s) inside titleSub
    subtitle: string;
    card1Label: string;
    card1Text: string;
    card2Label: string;
    card2Text: string;
    delLabel: string;
    deliverables: [string, string, string];
    cta: string;
    duration: string;
    footer: string;
  };

  header: {
    steps: {
      trends: string;
      game: string;
      results: string;
    };
    backAriaLabel: string;
    resetAriaLabel: string;
  };

  trends: {
    title: string;
    descLine1: string;
    descLine2: string;        // mentions "Balance by Design" (keep untranslated)
    handLabel: string;
    balanceRequired: string;
    required: string;         // chip inside container header
    infoAriaPrefix: string;   // "En savoir plus sur" / "Learn more about"
    cta: (count: number) => string;
    errBalance: string;
    errMin: (min: number) => string;
  };

  game: {
    rounds: {
      FLOP: string;
      TURN: string;
      RIVER: string;
    };
    whyBtn: string;
    legend: string;
  };

  results: {
    assessmentLabel: string;
    radarTitle: string;
    dimensions: {
      foundations: string;
      execution: string;
      balance: string;
    };
    trendScoresTitle: string;
    synthesisTitle: string;
    forcesTitle: string;
    tensionTitle: string;
    balanceTitle: string;
    balanceLowWarning: string;
    actionsTitle: string;
    actionsSubtitle: string;
    newAssessment: string;
    scoreLabels: {
      good: string;           // ≥ 67
      fragile: string;        // 34–66
      tension: string;        // < 34
    };
  };

  qrBlock: {
    title: string;
    desc: string;
    enlarge: string;
    shrink: string;
    hint: string;
  };

  actionCard: {
    dimensions: {
      foundations: string;
      execution: string;
      balance: string;
    };
    trendsLabel: string;
  };

  share: {
    headerSuper: string;
    headerTitle: string;
    aieChip: string;
    positionTitle: string;
    forcesLabel: string;
    tensionLabel: string;
    actionsTitle: string;
    ctaTitle: string;
    ctaDesc: string;
    copyBtn: string;
    copiedBtn: string;
    contactBtn: string;
    aieOrg: string;
    aieTeam: string;
    footer: string;
    errorTitle: string;
    errorDesc: string;
    trendsLabel: string;       // "Trends : " in action detail
    scoreLabels: {
      B: string;               // label for LabelShort 'B'
      P: string;               // label for LabelShort 'P'
      S: string;               // label for LabelShort 'S'
    };
  };

  /** Strings used to build the plain-text copy-to-clipboard / email body */
  planText: {
    header: string;
    generated: string;
    trendsSection: string;
    positioningSection: string;
    forcesLabel: string;
    tensionLabel: string;
    actionsSection: string;
    footer: string;
    trendsImpacted: string;  // "Trends : "
  };

  emailText: {
    intro: string;
    trendsSection: string;
    positioningSection: string;
    forcesLabel: string;
    tensionLabel: string;
    actionsSection: string;
    closing: string;
    trendsImpacted: string;  // "Trends : "
  };
}
