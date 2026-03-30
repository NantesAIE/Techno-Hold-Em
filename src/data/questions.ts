export type Dimension = 'Foundations' | 'Execution' | 'Balance';
export type Round = 'FLOP' | 'TURN' | 'RIVER';

export interface Answer {
  text: string;
  score: number; // 0–3
}

export interface Question {
  id: string;
  round: Round;
  roundLabel: string;
  dimension: Dimension;
  text: string;
  subtitle?: string;
  answers: Answer[];
}

export const QUESTIONS: Question[] = [
  // ─── FLOP – Fondations ────────────────────────────────────────────────────
  {
    id: 'q1',
    round: 'FLOP',
    roundLabel: 'FLOP – Fondations',
    dimension: 'Foundations',
    text: 'Les objectifs et la valeur du projet sont-ils clairement définis ?',
    subtitle: 'Pensez à la vision métier, aux KPIs et à la validation par les parties prenantes.',
    answers: [
      { text: "Pas encore définis — on avance à vue", score: 0 },
      { text: "Partiellement définis, sans consensus formalisé", score: 1 },
      { text: "Définis mais pas encore validés par les décideurs", score: 2 },
      { text: "Clairement définis, documentés et validés", score: 3 },
    ],
  },
  {
    id: 'q2',
    round: 'FLOP',
    roundLabel: 'FLOP – Fondations',
    dimension: 'Foundations',
    text: 'Les données nécessaires sont-elles prêtes ?',
    subtitle: 'Qualité, accessibilité, gouvernance et conformité des données.',
    answers: [
      { text: "Aucune analyse réalisée sur les données", score: 0 },
      { text: "Les sources sont identifiées mais non qualifiées", score: 1 },
      { text: "Disponibles mais sans gouvernance formelle", score: 2 },
      { text: "Prêtes, accessibles, qualifiées et gouvernées", score: 3 },
    ],
  },
  {
    id: 'q3',
    round: 'FLOP',
    roundLabel: 'FLOP – Fondations',
    dimension: 'Foundations',
    text: 'Le socle technique est-il cadré ?',
    subtitle: 'Architecture, cloud, connectivité et patterns d\'intégration.',
    answers: [
      { text: "Aucun choix technique n'a été fait", score: 0 },
      { text: "Quelques choix posés, beaucoup restent ouverts", score: 1 },
      { text: "Architecture esquissée, à finaliser", score: 2 },
      { text: "Socle technique cadré, validé et documenté", score: 3 },
    ],
  },

  // ─── TURN – Exécution ─────────────────────────────────────────────────────
  {
    id: 'q4',
    round: 'TURN',
    roundLabel: 'TURN – Exécution',
    dimension: 'Execution',
    text: 'Le delivery est-il découpé en incréments livrables ?',
    subtitle: 'Backlog, sprints, jalons intermédiaires et critères d\'acceptation.',
    answers: [
      { text: "Pas de découpage — périmètre global non découpé", score: 0 },
      { text: "Grandes phases identifiées, sans jalons clairs", score: 1 },
      { text: "Sprints planifiés, backlog à affiner", score: 2 },
      { text: "Incréments définis, livrables mesurables et acceptés", score: 3 },
    ],
  },
  {
    id: 'q5',
    round: 'TURN',
    roundLabel: 'TURN – Exécution',
    dimension: 'Execution',
    text: 'Les risques projet sont-ils identifiés ?',
    subtitle: 'Sécurité, conformité réglementaire, intégration et dépendances externes.',
    answers: [
      { text: "Aucune analyse de risques réalisée", score: 0 },
      { text: "Quelques risques listés sans plan de mitigation", score: 1 },
      { text: "Risques principaux identifiés, mitigations en cours", score: 2 },
      { text: "Registre des risques complet avec actions assignées", score: 3 },
    ],
  },
  {
    id: 'q6',
    round: 'TURN',
    roundLabel: 'TURN – Exécution',
    dimension: 'Execution',
    text: 'Le RUN et l\'exploitation sont-ils anticipés ?',
    subtitle: 'Équipes opérationnelles, monitoring, SLAs et procédures de support.',
    answers: [
      { text: "Non — on pensera au RUN après le BUILD", score: 0 },
      { text: "Quelques points évoqués, rien de formalisé", score: 1 },
      { text: "Prise en compte partielle dès la conception", score: 2 },
      { text: "Équipes RUN intégrées dès le départ, SLAs définis", score: 3 },
    ],
  },

  // ─── RIVER – Balance by Design ────────────────────────────────────────────
  {
    id: 'q7',
    round: 'RIVER',
    roundLabel: 'RIVER – Balance by Design',
    dimension: 'Balance',
    text: 'Comment l\'humain reste-t-il dans la boucle face à l\'automatisation ?',
    subtitle: 'Points de décision humains, supervision, explainabilité des systèmes automatisés.',
    answers: [
      { text: "L'automatisation est totale, sans supervision humaine", score: 0 },
      { text: "L'humain intervient en cas d'alerte uniquement", score: 1 },
      { text: "Des checkpoints humains sont définis sur les décisions clés", score: 2 },
      { text: "L'humain est systématiquement maître des décisions critiques", score: 3 },
    ],
  },
  {
    id: 'q8',
    round: 'RIVER',
    roundLabel: 'RIVER – Balance by Design',
    dimension: 'Balance',
    text: 'Comment la confiance est-elle assurée ?',
    subtitle: 'Sécurité, privacy by design, traçabilité et conformité réglementaire.',
    answers: [
      { text: "Pas de mécanismes de confiance en place", score: 0 },
      { text: "Sécurité de base, sans traçabilité ni privacy design", score: 1 },
      { text: "Sécurité et conformité adressées, traçabilité partielle", score: 2 },
      { text: "Trust by design : sécurité, privacy, traçabilité complètes", score: 3 },
    ],
  },
];

export const ROUND_ORDER: Round[] = ['FLOP', 'TURN', 'RIVER'];

export const ROUND_DESCRIPTIONS: Record<Round, string> = {
  FLOP: 'Les 3 premières cartes — vos fondations sont-elles solides ?',
  TURN: 'La 4e carte — comment exécutez-vous ?',
  RIVER: 'La carte finale — l\'équilibre humain–technologie',
};
