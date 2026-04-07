/**
 * English translations for Techno Hold 'Em.
 *
 * UI strings below are already translated.
 * TechnoVision-specific content (questions, action templates, tooltips) lives in
 * the companion data files:
 *   - src/data/questions.en.ts          ← fill QUESTION_BANK_EN
 *   - src/data/actionTemplates.en.ts    ← fill ACTION_TEMPLATES_EN
 *   - src/data/TechnoVisionTooltips.en.ts ← fill TECHNOVISION_TREND_TOOLTIPS_EN
 */
import type { Translations } from './types';

const en: Translations = {
  landing: {
    badge: 'Capgemini · TechnoVision 2026',
    tagline: 'Making sense of the technology wave',
    micro: '37\u00a0trends\u00a0·\u00a09\u00a0containers\u00a0·\u00a01\u00a0balance\u00a0to\u00a0find',
    ctaLabel: 'Get started',
    ctaAriaLabel: 'Start the TechnoVision 2026 assessment',
    footer: 'Based on TechnoVision 2026 – The Sync Swing',
    langSwitch: 'FR',
    langSwitchAriaLabel: 'Passer en français',
  },

  intro: {
    badge: 'The Sync Swing · TechnoVision 2026',
    titleSub: 'Making sense of the {accent}',
    titleAccent: 'technology wave',
    subtitle:
      'In a world of constant oscillation, the challenge is not to pick a technology, but to understand how trends synchronise.',
    card1Label: 'What is TechnoVision?',
    card1Text:
      "TechnoVision is Capgemini's technology framework. It organises 37 trends into 9 containers to help organisations separate signal from noise and turn innovation into concrete decisions.",
    card2Label: 'Why this assessment?',
    card2Text:
      'This assessment lets you position a real project against TechnoVision 2026 trends. In a few minutes you identify your strengths, areas of tension, and the key levers to move forward.',
    delLabel: 'What you will get',
    deliverables: [
      'A clear positioning across key trends',
      'A foundations / execution / balance reading',
      '3 concrete actions to strengthen your trajectory',
    ],
    cta: 'Explore TechnoVision trends',
    duration: '5 – 7 minutes · No account required',
    footer: 'Based on TechnoVision 2026 — The Sync Swing · Capgemini',
  },

  header: {
    steps: {
      trends: 'Trend selection',
      game: 'Assessment',
      results: 'Results',
    },
    backAriaLabel: 'Back',
    resetAriaLabel: 'Restart',
  },

  trends: {
    title: 'Your hand',
    descLine1: 'Select the TechnoVision 2026 trends relevant to your project.',
    descLine2: 'At least 1 Balance by Design trend is required.',
    handLabel: 'Selected hand',
    balanceRequired: 'Balance by Design required',
    required: 'Required',
    infoAriaPrefix: 'Learn more about',
    cta: (count) =>
      `Start assessment (${count} trend${count > 1 ? 's' : ''})`,
    errBalance: 'Select at least 1 Balance by Design trend',
    errMin: (min) => `Select at least ${min} trends`,
  },

  game: {
    rounds: {
      FLOP: 'Opening bet — clarity & foundations',
      TURN: 'Re-raise — execution & maturity',
      RIVER: 'Final card — balance & control',
    },
    whyBtn: 'Why this question?',
    legend: '0 = Not addressed · 1 = Partial · 2 = In progress · 3 = Complete',
  },

  results: {
    assessmentLabel: 'TechnoVision 2026 Assessment',
    radarTitle: 'Positioning radar',
    dimensions: {
      foundations: 'Foundations',
      execution: 'Execution',
      balance: 'Balance',
    },
    trendScoresTitle: 'Scores by trend',
    synthesisTitle: 'Project synthesis',
    forcesTitle: 'Strengths',
    tensionTitle: 'Under tension',
    balanceTitle: 'Balance by Design',
    balanceLowWarning:
      'Attention: the human & trust dimension is insufficiently addressed.',
    actionsTitle: '3 concrete actions',
    actionsSubtitle: 'Selected based on your weakest dimensions',
    newAssessment: 'New assessment',
    scoreLabels: {
      good: 'Well positioned',
      fragile: 'Promising but fragile',
      tension: 'Under tension',
    },
  },

  qrBlock: {
    title: 'Save your action plan',
    desc: 'Scan this QR code with your phone to view and share your action plan.',
    enlarge: 'Enlarge QR code',
    shrink: 'Shrink QR code',
    hint: 'Point the Camera app or a QR reader at this code to open the page on your phone.',
  },

  actionCard: {
    dimensions: {
      foundations: 'Foundations',
      execution: 'Execution',
      balance: 'Balance by Design',
    },
    trendsLabel: 'Impacted trends',
  },

  share: {
    headerSuper: "Techno Hold 'Em",
    headerTitle: 'Your action plan',
    aieChip: 'Generated at AIE Nantes',
    positionTitle: 'Your positioning',
    forcesLabel: 'Strengths',
    tensionLabel: 'Under tension',
    actionsTitle: 'Your top 3 actions',
    ctaTitle: 'Go further',
    ctaDesc:
      'Copy your action plan or contact the AIE Nantes team directly to explore TechnoVision 2026 and next steps.',
    copyBtn: 'Copy action plan',
    copiedBtn: 'Action plan copied!',
    contactBtn: 'Contact AIE Nantes',
    aieOrg: 'AIE Nantes',
    aieTeam: 'Innovation & Expertise Workshop – Capgemini',
    footer: "Techno Hold 'Em · Capgemini · TechnoVision 2026 — The Sync Swing",
    errorTitle: 'Invalid or expired link',
    errorDesc:
      'This link does not contain a valid action plan. Go back to the totem and scan the QR code again.',
    trendsLabel: 'Trends: ',
    scoreLabels: {
      B: 'Well positioned',
      P: 'Promising but fragile',
      S: 'Under tension',
    },
  },

  planText: {
    header: "=== TECHNO HOLD 'EM — YOUR ACTION PLAN ===",
    generated: 'Generated at AIE Nantes – TechnoVision 2026',
    trendsSection: 'ANALYSED TRENDS',
    positioningSection: 'POSITIONING',
    forcesLabel: '✓ Strengths  : ',
    tensionLabel: '! Under tension: ',
    actionsSection: 'YOUR TOP 3 PRIORITY ACTIONS',
    footer: "Techno Hold 'Em · Capgemini · TechnoVision 2026",
    trendsImpacted: 'Trends: ',
  },

  emailText: {
    intro: "I completed a Techno Hold 'Em assessment and would like to go deeper on TechnoVision and the associated action plan.",
    trendsSection: 'ANALYSED TRENDS',
    positioningSection: 'POSITIONING',
    forcesLabel: 'Strengths    : ',
    tensionLabel: 'Under tension: ',
    actionsSection: '3 PROPOSED ACTIONS',
    closing: 'Happy to discuss further.',
    trendsImpacted: 'Trends: ',
  },
};

export default en;
