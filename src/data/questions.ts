// src/data/questions.ts
// Techno Hold "Em – Dynamic question selection driven by selected TechnoVision 2026 trends
// V1+: Large question bank, each question targets one (or more) selected trends.

import type { Lang } from '../i18n/types';
import { QUESTION_BANK_EN } from './questions.en';
// Selection picks 2 questions per selected trend (default), capped to 10 total to stay within 5–7 minutes.

export type Dimension = "foundations" | "execution" | "balance";

export type Round = "FLOP" | "TURN" | "RIVER";

export type QuestionOption = {
  id: "a" | "b" | "c" | "d";
  label: string;
  /** 0..3 where 3 is best readiness */
  value: 0 | 1 | 2 | 3;
};

export type Question = {
  id: string;
  /** Trend ids that this question influences (must match TechnoVision.ts trend ids) */
  targetTrendIds: string[];
  /** Primary scoring dimension */
  dimension: Dimension;
  /** Question to display */
  prompt: string;
  /** Optional helper displayed under prompt (small) */
  helper?: string;
  /** Why it matters (optional, can be shown as “Pourquoi cette question ?”) */
  whyItMatters?: string;
  /** Options (max 4) */
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
  /** Optional weight multiplier (default 1) */
  weight?: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared option templates (keeps the bank consistent & fast to answer)
// ─────────────────────────────────────────────────────────────────────────────

const OPT_MATURITY: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Oui, c'est en place et utilisé en production", value: 3 },
  { id: "b", label: "Partiellement, sur un périmètre limité", value: 2 },
  { id: "c", label: "Prévu / en préparation, pas encore opérationnel", value: 1 },
  { id: "d", label: "Non / pas à l'agenda", value: 0 },
];

const OPT_CLARITY: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Très clair (défini, partagé, mesurable)", value: 3 },
  { id: "b", label: "Assez clair (défini, pas toujours mesuré)", value: 2 },
  { id: "c", label: "Encore flou / variable selon les acteurs", value: 1 },
  { id: "d", label: "Pas défini à ce stade", value: 0 },
];

const OPT_RISK: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Risques identifiés + plan de mitigation actif", value: 3 },
  { id: "b", label: "Risques identifiés mais mitigations partielles", value: 2 },
  { id: "c", label: "Risques pressentis, pas encore cadrés", value: 1 },
  { id: "d", label: "Non identifié / non traité", value: 0 },
];

const OPT_GOV: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Rôles, décisions et arbitrages sont structurés", value: 3 },
  { id: "b", label: "Gouvernance existe mais manque de régularité", value: 2 },
  { id: "c", label: "Gouvernance ad hoc selon les urgences", value: 1 },
  { id: "d", label: "Pas de gouvernance claire", value: 0 },
];

const OPT_USER: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Centré usage (tests, feedback, itérations)", value: 3 },
  { id: "b", label: "Usages pris en compte, mais peu testés", value: 2 },
  { id: "c", label: "Usages supposés, peu validés", value: 1 },
  { id: "d", label: "Principalement orienté techno / contraintes", value: 0 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Question bank (rich, trend-specific)
// Each trend has 3 questions: Opportunity / Readiness / Guardrail
// ─────────────────────────────────────────────────────────────────────────────

export const QUESTION_BANK: Question[] = [
  // ─────────────────────────── You Experience ───────────────────────────
  {
    id: "face-to-interface__01",
    targetTrendIds: ["face-to-interface"],
    dimension: "execution",
    prompt: "Votre projet prévoit-il une interaction “naturelle” (conversation, voix, agent) comme point d'entrée principal ?",
    helper: "Pensez : chat/voix/agent qui pilote l'expérience.",
    whyItMatters: "Ce trend change la façon dont les utilisateurs accèdent aux services : moins de menus, plus d'intentions.",
    options: OPT_MATURITY,
  },
  {
    id: "face-to-interface__02",
    targetTrendIds: ["face-to-interface"],
    dimension: "balance",
    prompt: "Avez-vous cadré les limites : ce que l'interface “humaine” doit/peut faire… et ne doit pas faire ?",
    helper: "Exemples : hallucinations, escalade humain, tonalité, garde-fous.",
    whyItMatters: "Plus l'interface “ressemble à l'humain”, plus les enjeux de confiance et de contrôle comptent.",
    options: OPT_RISK,
  },
  {
    id: "face-to-interface__03",
    targetTrendIds: ["face-to-interface"],
    dimension: "foundations",
    prompt: "Les contenus/intentions métier (FAQ, procédures, knowledge) sont-ils structurés pour alimenter l'expérience ?",
    whyItMatters: "Sans “connaissance” structurée, l'interface conversationnelle reste superficielle.",
    options: OPT_MATURITY,
  },

  {
    id: "youre-something-spatial__01",
    targetTrendIds: ["youre-something-spatial"],
    dimension: "execution",
    prompt: "Votre projet exploite-t-il l'espace (3D, AR/VR, plans, géoloc, contexte physique) pour améliorer l'expérience ?",
    whyItMatters: "Le spatial rend l'expérience plus intuitive quand le contexte physique compte.",
    options: OPT_MATURITY,
  },
  {
    id: "youre-something-spatial__02",
    targetTrendIds: ["youre-something-spatial"],
    dimension: "foundations",
    prompt: "Avez-vous un modèle “réalité” fiable (carto, référentiels, mesures) pour ancrer l'expérience spatiale ?",
    whyItMatters: "Le spatial est puissant… mais seulement si la “réalité” est cohérente et maintenable.",
    options: OPT_CLARITY,
  },
  {
    id: "youre-something-spatial__03",
    targetTrendIds: ["youre-something-spatial"],
    dimension: "balance",
    prompt: "Avez-vous évalué les contraintes d'usage (fatigue, accessibilité, sécurité) liées à l'immersion ?",
    whyItMatters: "Une expérience immersive peut échouer si elle n'est pas confortable et inclusive.",
    options: OPT_RISK,
  },

  {
    id: "internet-of-twins__01",
    targetTrendIds: ["internet-of-twins"],
    dimension: "foundations",
    prompt: "Disposez-vous d'un jumeau numérique exploitable (modèle + données) pour simuler/optimiser avant d'agir ?",
    whyItMatters: "Le jumeau permet de réduire le risque en testant dans le virtuel.",
    options: OPT_MATURITY,
  },
  {
    id: "internet-of-twins__02",
    targetTrendIds: ["internet-of-twins"],
    dimension: "execution",
    prompt: "Le jumeau est-il connecté à des boucles de décision (alertes, recommandations, automatisation) ?",
    whyItMatters: "Un jumeau “statique” informe ; un jumeau “connecté” transforme.",
    options: OPT_MATURITY,
  },
  {
    id: "internet-of-twins__03",
    targetTrendIds: ["internet-of-twins"],
    dimension: "balance",
    prompt: "Avez-vous clarifié qui “a le dernier mot” entre simulation, IA et expertise humaine ?",
    whyItMatters: "La valeur vient de l'orchestration : la confiance dépend de la décision finale.",
    options: OPT_GOV,
  },

  {
    id: "knowing-me-knowing-ux__01",
    targetTrendIds: ["knowing-me-knowing-ux"],
    dimension: "execution",
    prompt: "Votre expérience s'adapte-t-elle au contexte utilisateur (préférences, situation, canal, intention) ?",
    whyItMatters: "Le UX devient “intelligent” quand il anticipe et ajuste sans friction.",
    options: OPT_MATURITY,
  },
  {
    id: "knowing-me-knowing-ux__02",
    targetTrendIds: ["knowing-me-knowing-ux"],
    dimension: "balance",
    prompt: "Avez-vous défini les limites de la personnalisation (privacy, consentement, transparence) ?",
    whyItMatters: "La personnalisation crée de la valeur… mais peut détruire la confiance si elle surprend.",
    options: OPT_RISK,
  },
  {
    id: "knowing-me-knowing-ux__03",
    targetTrendIds: ["knowing-me-knowing-ux"],
    dimension: "foundations",
    prompt: "Vos données “profil/contexte” sont-elles fiables et gouvernées (source, fraîcheur, qualité) ?",
    whyItMatters: "Un UX adaptatif dépend d'un socle data solide et cohérent.",
    options: OPT_CLARITY,
  },

  // ─────────────────────────── We Collaborate ───────────────────────────
  {
    id: "my-identity-my-business__01",
    targetTrendIds: ["my-identity-my-business"],
    dimension: "foundations",
    prompt: "L'identité (humains, services, objets) est-elle traitée comme un actif central (SSO, rôles, droits, preuves) ?",
    whyItMatters: "L'identité devient le “passeport” de toute collaboration et de toute transaction.",
    options: OPT_MATURITY,
  },
  {
    id: "my-identity-my-business__02",
    targetTrendIds: ["my-identity-my-business"],
    dimension: "balance",
    prompt: "Avez-vous anticipé l'impact des fraudes/impersonations (notamment via IA) sur votre projet ?",
    whyItMatters: "Quand l'IA imite, l'identité et la confiance deviennent des enjeux business immédiats.",
    options: OPT_RISK,
  },
  {
    id: "my-identity-my-business__03",
    targetTrendIds: ["my-identity-my-business"],
    dimension: "execution",
    prompt: "Les parcours d'accès (création, délégation, révocation) sont-ils fluides pour éviter le contournement ?",
    whyItMatters: "Une identité trop complexe pousse les utilisateurs à contourner… et fragilise tout.",
    options: OPT_USER,
  },

  {
    id: "autonomous-agent-alliance__01",
    targetTrendIds: ["autonomous-agent-alliance"],
    dimension: "execution",
    prompt: "Votre projet prévoit-il des agents capables d'exécuter des tâches multi-étapes (pas seulement répondre) ?",
    whyItMatters: "Le saut de valeur est dans l'action : planifier, agir, vérifier, boucler.",
    options: OPT_MATURITY,
  },
  {
    id: "autonomous-agent-alliance__02",
    targetTrendIds: ["autonomous-agent-alliance"],
    dimension: "balance",
    prompt: "Les règles de contrôle des agents sont-elles explicites (droits, validations, logs, escalade) ?",
    whyItMatters: "Un agent puissant sans garde-fous crée un risque systémique.",
    options: OPT_RISK,
  },
  {
    id: "autonomous-agent-alliance__03",
    targetTrendIds: ["autonomous-agent-alliance"],
    dimension: "foundations",
    prompt: "Vos systèmes exposent-ils des “actions” bien définies (API, outils) pour que des agents puissent opérer proprement ?",
    whyItMatters: "Sans interfaces/outils robustes, l'agentic reste une démo.",
    options: OPT_MATURITY,
  },

  {
    id: "synergy2__01",
    targetTrendIds: ["synergy2"],
    dimension: "execution",
    prompt: "Votre projet s'appuie-t-il sur l'orchestration entre plusieurs systèmes/équipes plutôt que sur un “monolithe” ?",
    whyItMatters: "La performance vient de la synchronisation : flux, responsabilités, handoffs.",
    options: OPT_CLARITY,
  },
  {
    id: "synergy2__02",
    targetTrendIds: ["synergy2"],
    dimension: "foundations",
    prompt: "Les contrats d'interface (données, API, événements) sont-ils formalisés et versionnés ?",
    whyItMatters: "Sans “contrats”, la synergie se transforme vite en chaos d'intégration.",
    options: OPT_MATURITY,
  },
  {
    id: "synergy2__03",
    targetTrendIds: ["synergy2"],
    dimension: "balance",
    prompt: "Avez-vous clarifié les arbitrages : qui optimise quoi, et comment éviter les effets de bord entre domaines ?",
    whyItMatters: "Synchroniser des systèmes, c'est aussi synchroniser des objectifs.",
    options: OPT_GOV,
  },

  {
    id: "economy-of-things__01",
    targetTrendIds: ["economy-of-things"],
    dimension: "execution",
    prompt: "Votre projet crée-t-il des échanges de valeur entre “acteurs” (humains, machines, services) au-delà de l'interne ?",
    whyItMatters: "Ce trend ouvre des modèles business où les “choses” deviennent actrices.",
    options: OPT_CLARITY,
  },
  {
    id: "economy-of-things__02",
    targetTrendIds: ["economy-of-things"],
    dimension: "foundations",
    prompt: "Avez-vous une traçabilité fiable des échanges (qui fait quoi, quand, avec quelles preuves) ?",
    whyItMatters: "Quand les choses “transigent”, la preuve et la traçabilité deviennent centrales.",
    options: OPT_MATURITY,
  },
  {
    id: "economy-of-things__03",
    targetTrendIds: ["economy-of-things"],
    dimension: "balance",
    prompt: "Les règles de responsabilité sont-elles claires si un acteur autonome “se trompe” ?",
    whyItMatters: "Nouveaux modèles = nouvelles responsabilités : mieux vaut les expliciter.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Thriving on Data ───────────────────────────
  {
    id: "data-sharing-is-caring__01",
    targetTrendIds: ["data-sharing-is-caring"],
    dimension: "foundations",
    prompt: "Partagez-vous (ou allez-vous partager) des données avec d'autres entités (partenaires, métiers, écosystèmes) ?",
    whyItMatters: "La valeur augmente avec le partage… mais seulement si c'est gouverné.",
    options: OPT_CLARITY,
  },
  {
    id: "data-sharing-is-caring__02",
    targetTrendIds: ["data-sharing-is-caring"],
    dimension: "balance",
    prompt: "Avez-vous défini les garde-fous : droits d'usage, privacy, sécurité, et conditions de réutilisation ?",
    whyItMatters: "“Sharing” sans “care” = risque de fuite, de non-conformité, de perte de confiance.",
    options: OPT_RISK,
  },
  {
    id: "data-sharing-is-caring__03",
    targetTrendIds: ["data-sharing-is-caring"],
    dimension: "execution",
    prompt: "Vos consommateurs de données peuvent-ils trouver, comprendre et utiliser les données facilement ?",
    whyItMatters: "Le partage n'a de valeur que si la donnée est réellement consommable.",
    options: OPT_MATURITY,
  },

  {
    id: "ai-meshed-up__01",
    targetTrendIds: ["ai-meshed-up"],
    dimension: "execution",
    prompt: "Votre projet combine-t-il plusieurs briques IA (modèles, règles, RPA, agents, search, data) plutôt qu'un seul “copilote” ?",
    whyItMatters: "La performance vient souvent d'un assemblage intelligent, pas d'un modèle unique.",
    options: OPT_CLARITY,
  },
  {
    id: "ai-meshed-up__02",
    targetTrendIds: ["ai-meshed-up"],
    dimension: "balance",
    prompt: "Avez-vous des mécanismes de contrôle : évaluation, monitoring, transparence, et gestion des dérives ?",
    whyItMatters: "Plus l'IA est “meshée”, plus l'observabilité et la gouvernance deviennent vitales.",
    options: OPT_RISK,
  },
  {
    id: "ai-meshed-up__03",
    targetTrendIds: ["ai-meshed-up"],
    dimension: "foundations",
    prompt: "Vos données et vos interfaces sont-elles prêtes pour être “outillées” (indexation, API, événements) ?",
    whyItMatters: "La qualité du mesh dépend du socle : data, intégration, architecture.",
    options: OPT_MATURITY,
  },

  {
    id: "net-zero-data__01",
    targetTrendIds: ["net-zero-data"],
    dimension: "balance",
    prompt: "Avez-vous identifié quelles données sont vraiment nécessaires… et lesquelles sont du “bruit” coûteux ?",
    whyItMatters: "La sobriété data réduit coûts, risques et empreinte — sans perdre de valeur.",
    options: OPT_CLARITY,
  },
  {
    id: "net-zero-data__02",
    targetTrendIds: ["net-zero-data"],
    dimension: "foundations",
    prompt: "Disposez-vous de règles de rétention/archivage/qualité pour éviter l'accumulation inutile ?",
    whyItMatters: "Sans hygiène data, le stockage grossit… et la confiance diminue.",
    options: OPT_MATURITY,
  },
  {
    id: "net-zero-data__03",
    targetTrendIds: ["net-zero-data"],
    dimension: "execution",
    prompt: "Le projet mesure-t-il l'impact de ses choix data (volumétrie, coûts, performance) pour arbitrer ?",
    whyItMatters: "Ce trend transforme la sobriété en décision pilotée (pas en vœu pieux).",
    options: OPT_MATURITY,
  },

  {
    id: "the-thing-with-data__01",
    targetTrendIds: ["the-thing-with-data"],
    dimension: "foundations",
    prompt: "Votre projet exploite-t-il de la donnée “proche terrain” (capteurs, edge, IoT, événements temps réel) ?",
    whyItMatters: "Quand la donnée vit au plus près des objets, la valeur devient instantanée.",
    options: OPT_CLARITY,
  },
  {
    id: "the-thing-with-data__02",
    targetTrendIds: ["the-thing-with-data"],
    dimension: "execution",
    prompt: "Avez-vous une chaîne temps réel (collecte → traitement → décision) réellement opérationnelle ?",
    whyItMatters: "Le temps réel n'est pas un dashboard : c'est une boucle d'action.",
    options: OPT_MATURITY,
  },
  {
    id: "the-thing-with-data__03",
    targetTrendIds: ["the-thing-with-data"],
    dimension: "balance",
    prompt: "Les contraintes sécurité/sûreté liées aux objets connectés sont-elles traitées dès la conception ?",
    whyItMatters: "Un point faible IoT/edge suffit à fragiliser l'ensemble du système.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Physical Matters ───────────────────────────
  {
    id: "material-world__01",
    targetTrendIds: ["material-world"],
    dimension: "execution",
    prompt: "Votre projet implique-t-il des actifs physiques “intelligents” (produits, robots, dispositifs, matériaux) ?",
    whyItMatters: "Quand le physique devient intelligent, la transformation sort de l'écran.",
    options: OPT_CLARITY,
  },
  {
    id: "material-world__02",
    targetTrendIds: ["material-world"],
    dimension: "foundations",
    prompt: "Avez-vous une stratégie de données/interopérabilité entre physique et digital (capteurs, modèles, APIs) ?",
    whyItMatters: "Le physique intelligent nécessite une architecture “bits + atomes”.",
    options: OPT_CLARITY,
  },
  {
    id: "material-world__03",
    targetTrendIds: ["material-world"],
    dimension: "balance",
    prompt: "Avez-vous évalué la sécurité/sûreté et la conformité liées aux composants physiques ?",
    whyItMatters: "Dès que ça touche le réel, les exigences (safety, regulation) changent de niveau.",
    options: OPT_RISK,
  },

  {
    id: "mission-adaptable__01",
    targetTrendIds: ["mission-adaptable"],
    dimension: "execution",
    prompt: "Votre solution est-elle conçue pour évoluer sans refonte (modularité, versioning, compatibilité) ?",
    whyItMatters: "L'adaptabilité devient un avantage compétitif en environnement instable.",
    options: OPT_MATURITY,
  },
  {
    id: "mission-adaptable__02",
    targetTrendIds: ["mission-adaptable"],
    dimension: "foundations",
    prompt: "Les modèles (domaine, produit, données) sont-ils suffisamment structurés pour absorber le changement ?",
    whyItMatters: "On ne “devient adaptable” que si les fondations sont bien dessinées.",
    options: OPT_CLARITY,
  },
  {
    id: "mission-adaptable__03",
    targetTrendIds: ["mission-adaptable"],
    dimension: "balance",
    prompt: "Avez-vous des garde-fous pour éviter que “adaptable” ne devienne “instable” ?",
    whyItMatters: "L'agilité sans règles peut créer du chaos : TechnoVision insiste sur l'équilibre.",
    options: OPT_RISK,
  },

  {
    id: "terminal-velocity__01",
    targetTrendIds: ["terminal-velocity"],
    dimension: "execution",
    prompt: "Le projet doit-il opérer à très haute vitesse (latence faible, décisions rapides, automatisation) ?",
    whyItMatters: "La vitesse impose une autre architecture : observabilité, résilience, automatisation.",
    options: OPT_CLARITY,
  },
  {
    id: "terminal-velocity__02",
    targetTrendIds: ["terminal-velocity"],
    dimension: "foundations",
    prompt: "Avez-vous un socle de performance (scalabilité, tests perf, capacity planning) maîtrisé ?",
    whyItMatters: "La vitesse se prépare : elle ne s'ajoute pas en fin de projet.",
    options: OPT_MATURITY,
  },
  {
    id: "terminal-velocity__03",
    targetTrendIds: ["terminal-velocity"],
    dimension: "balance",
    prompt: "Avez-vous pris en compte les risques : sécurité, sûreté, erreurs amplifiées par la vitesse ?",
    whyItMatters: "Plus c'est rapide, plus une erreur coûte cher : la confiance devient critique.",
    options: OPT_RISK,
  },

  {
    id: "to-intelligence-and-beyond__01",
    targetTrendIds: ["to-intelligence-and-beyond"],
    dimension: "execution",
    prompt: "L'intelligence est-elle “distribuée” (embarqué, edge, cloud) selon les besoins du terrain ?",
    whyItMatters: "Ce trend pousse l'intelligence au bon endroit, au bon moment.",
    options: OPT_CLARITY,
  },
  {
    id: "to-intelligence-and-beyond__02",
    targetTrendIds: ["to-intelligence-and-beyond"],
    dimension: "foundations",
    prompt: "Disposez-vous de pipelines pour déployer/mettre à jour des modèles en conditions réelles ?",
    whyItMatters: "L'intelligence “au-delà” exige un MLOps/ops solide pour durer.",
    options: OPT_MATURITY,
  },
  {
    id: "to-intelligence-and-beyond__03",
    targetTrendIds: ["to-intelligence-and-beyond"],
    dimension: "balance",
    prompt: "Avez-vous défini des mécanismes de “fail-safe” si l'intelligence se trompe ?",
    whyItMatters: "Quand l'IA agit dans le réel, il faut penser sécurité et responsabilité.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Applications Unleashed ───────────────────────────
  {
    id: "honey-i-shrunk__01",
    targetTrendIds: ["honey-i-shrunk"],
    dimension: "foundations",
    prompt: "Votre architecture applicative est-elle modularisée (API-first, composants, services) pour évoluer vite ?",
    whyItMatters: "Miniaturiser l'app, c'est accélérer le changement et réduire la dette.",
    options: OPT_MATURITY,
  },
  {
    id: "honey-i-shrunk__02",
    targetTrendIds: ["honey-i-shrunk"],
    dimension: "execution",
    prompt: "Avez-vous une plateforme dev/CI-CD qui rend cette modularité réellement productive ?",
    whyItMatters: "Sans “developer platform”, la modularité devient une complexité non maîtrisée.",
    options: OPT_MATURITY,
  },
  {
    id: "honey-i-shrunk__03",
    targetTrendIds: ["honey-i-shrunk"],
    dimension: "balance",
    prompt: "Avez-vous des règles pour éviter l'explosion de complexité (standards, observabilité, gouvernance) ?",
    whyItMatters: "Plus c'est modulaire, plus les standards sont indispensables.",
    options: OPT_GOV,
  },

  {
    id: "when-code-goes-know__01",
    targetTrendIds: ["when-code-goes-know"],
    dimension: "execution",
    prompt: "Le code “embarque-t-il” des connaissances métier (règles, décisions, patterns) de façon explicite et maintenable ?",
    whyItMatters: "Le code devient un actif “connaissant”, pas seulement exécutant.",
    options: OPT_CLARITY,
  },
  {
    id: "when-code-goes-know__02",
    targetTrendIds: ["when-code-goes-know"],
    dimension: "foundations",
    prompt: "Avez-vous des artefacts de connaissance (docs vivantes, tests, catalogues) pour éviter la perte de savoir ?",
    whyItMatters: "Sans capitalisation, la connaissance se dissout au fil des releases.",
    options: OPT_MATURITY,
  },
  {
    id: "when-code-goes-know__03",
    targetTrendIds: ["when-code-goes-know"],
    dimension: "balance",
    prompt: "Avez-vous prévu comment contrôler/justifier les décisions automatiques prises par le code/IA ?",
    whyItMatters: "Plus le code décide, plus la transparence et l'auditabilité comptent.",
    options: OPT_RISK,
  },

  {
    id: "chat-is-the-new-super-app__01",
    targetTrendIds: ["chat-is-the-new-super-app"],
    dimension: "execution",
    prompt: "Votre projet pourrait-il être consommé via une conversation unique plutôt que via des écrans multiples ?",
    whyItMatters: "Le chat peut devenir l'UI universelle… si l'orchestration derrière est solide.",
    options: OPT_CLARITY,
  },
  {
    id: "chat-is-the-new-super-app__02",
    targetTrendIds: ["chat-is-the-new-super-app"],
    dimension: "foundations",
    prompt: "Vos services sont-ils “composables” (actions, APIs, outils) pour être pilotés par une interface conversationnelle ?",
    whyItMatters: "Le super app chat repose sur des services bien factorisés et actionnables.",
    options: OPT_MATURITY,
  },
  {
    id: "chat-is-the-new-super-app__03",
    targetTrendIds: ["chat-is-the-new-super-app"],
    dimension: "balance",
    prompt: "Avez-vous cadré la sécurité : accès, permissions, journalisation des actions déclenchées via chat ?",
    whyItMatters: "Si le chat exécute, il doit respecter les mêmes contraintes qu'une application critique.",
    options: OPT_RISK,
  },

  {
    id: "app-robot__01",
    targetTrendIds: ["app-robot"],
    dimension: "execution",
    prompt: "Votre application est-elle conçue pour “agir” (workflow, robots, agents) plutôt que seulement afficher/collecter ?",
    whyItMatters: "Le passage clé : de l'application “outil” à l'application “acteur”.",
    options: OPT_CLARITY,
  },
  {
    id: "app-robot__02",
    targetTrendIds: ["app-robot"],
    dimension: "foundations",
    prompt: "Avez-vous des interfaces et événements fiables pour déclencher/observer ces actions automatisées ?",
    whyItMatters: "Un robot logiciel sans observabilité devient vite ingérable.",
    options: OPT_MATURITY,
  },
  {
    id: "app-robot__03",
    targetTrendIds: ["app-robot"],
    dimension: "balance",
    prompt: "Avez-vous prévu une supervision humaine, des limites et des mécanismes de rollback ?",
    whyItMatters: "Si l'app agit, il faut contrôler le rayon d'action et la responsabilité.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Balance by Design ───────────────────────────
  {
    id: "technology-business__01",
    targetTrendIds: ["technology-business"],
    dimension: "foundations",
    prompt: "La valeur business est-elle “codée” dans la solution (KPI, boucles de décision, arbitrages) plutôt que décrite à côté ?",
    whyItMatters: "TechnoVision pousse l'unité : business et IT oscillent ensemble, en continu.",
    options: OPT_CLARITY,
  },
  {
    id: "technology-business__02",
    targetTrendIds: ["technology-business"],
    dimension: "execution",
    prompt: "Vos équipes business et tech partagent-elles un rythme commun (backlog, priorités, décisions) ?",
    whyItMatters: "Sans synchronisation, on “aligne” ; avec synchronisation, on “unifie”.",
    options: OPT_GOV,
  },
  {
    id: "technology-business__03",
    targetTrendIds: ["technology-business"],
    dimension: "balance",
    prompt: "Avez-vous un mécanisme clair pour arbitrer valeur vs risque vs délai quand ça se tend ?",
    whyItMatters: "L'unité exige des arbitrages explicites, pas des compromis tacites.",
    options: OPT_GOV,
  },

  {
    id: "we-augment__01",
    targetTrendIds: ["we-augment"],
    dimension: "execution",
    prompt: "L'automatisation vise-t-elle à augmenter les équipes (qualité, vitesse, focus) plutôt qu'à “remplacer” ?",
    whyItMatters: "Le gain durable vient de l'augmentation : laisser l'humain sur le jugement et la valeur.",
    options: OPT_CLARITY,
  },
  {
    id: "we-augment__02",
    targetTrendIds: ["we-augment"],
    dimension: "balance",
    prompt: "Avez-vous défini où l'humain doit rester dans la boucle (approbations, exceptions, décisions critiques) ?",
    whyItMatters: "L'automatisation “hands-free” doit rester gouvernée : l'humain pilote le “pourquoi”.",
    options: OPT_GOV,
  },
  {
    id: "we-augment__03",
    targetTrendIds: ["we-augment"],
    dimension: "foundations",
    prompt: "Disposez-vous de données/indicateurs pour mesurer l'effet réel de l'augmentation (qualité, charge, satisfaction) ?",
    whyItMatters: "Sans mesure, l'augmentation devient un ressenti, pas une stratégie.",
    options: OPT_MATURITY,
  },

  {
    id: "do-good-do-less-do-well__01",
    targetTrendIds: ["do-good-do-less-do-well"],
    dimension: "balance",
    prompt: "Avez-vous défini ce que “faire mieux avec moins” veut dire pour ce projet (scope, sobriété, impacts) ?",
    whyItMatters: "Ce principe transforme l'impact en décisions concrètes, pas en slogans.",
    options: OPT_CLARITY,
  },
  {
    id: "do-good-do-less-do-well__02",
    targetTrendIds: ["do-good-do-less-do-well"],
    dimension: "execution",
    prompt: "Avez-vous des leviers d'optimisation (données, compute, simplification) déjà intégrés au delivery ?",
    whyItMatters: "La sobriété se gagne dans le design et l'exécution, pas à la fin.",
    options: OPT_MATURITY,
  },
  {
    id: "do-good-do-less-do-well__03",
    targetTrendIds: ["do-good-do-less-do-well"],
    dimension: "foundations",
    prompt: "Disposez-vous d'indicateurs pour suivre coûts/empreinte/efficience au fil des releases ?",
    whyItMatters: "Mesurer permet d'arbitrer, et de progresser de façon factuelle.",
    options: OPT_MATURITY,
  },

  {
    id: "be-like-water__01",
    targetTrendIds: ["be-like-water"],
    dimension: "execution",
    prompt: "Votre organisation projet est-elle capable de s'adapter rapidement (priorités, dépendances, changements) ?",
    whyItMatters: "L'agilité réelle est une propriété de l'organisation, pas seulement une méthode.",
    options: OPT_GOV,
  },
  {
    id: "be-like-water__02",
    targetTrendIds: ["be-like-water"],
    dimension: "foundations",
    prompt: "Votre architecture et vos standards permettent-ils de changer sans casser (compatibilité, modularité, contrats) ?",
    whyItMatters: "“Être comme l'eau” requiert des fondations qui absorbent le mouvement.",
    options: OPT_CLARITY,
  },
  {
    id: "be-like-water__03",
    targetTrendIds: ["be-like-water"],
    dimension: "balance",
    prompt: "Avez-vous défini des garde-fous (sécurité, qualité, conformité) pour que l'adaptation reste maîtrisée ?",
    whyItMatters: "La fluidité sans garde-fous crée du chaos : TechnoVision parle d'équilibre.",
    options: OPT_RISK,
  },

  {
    id: "trust-thrust__01",
    targetTrendIds: ["trust-thrust"],
    dimension: "balance",
    prompt: "Avez-vous une stratégie “trust by design” (sécurité, privacy, traçabilité) intégrée dès le départ ?",
    whyItMatters: "Sans confiance, l'adoption plafonne et l'échelle devient impossible.",
    options: OPT_RISK,
  },
  {
    id: "trust-thrust__02",
    targetTrendIds: ["trust-thrust"],
    dimension: "execution",
    prompt: "Les mécanismes d'audit et de preuve (logs, décisions, accès) sont-ils opérationnels et exploitables ?",
    whyItMatters: "La confiance se prouve : elle se documente, se mesure et se démontre.",
    options: OPT_MATURITY,
  },
  {
    id: "trust-thrust__03",
    targetTrendIds: ["trust-thrust"],
    dimension: "foundations",
    prompt: "Vos fondations (identité, data, infra) sont-elles cohérentes avec un niveau d'exigence “critique” ?",
    whyItMatters: "La confiance n'est pas une couche : c'est une propriété du socle.",
    options: OPT_CLARITY,
  },

  // ─────────────────────────── Process on the Fly ───────────────────────────
  {
    id: "whole-lotta-fusion__01",
    targetTrendIds: ["whole-lotta-fusion"],
    dimension: "execution",
    prompt: "Vos processus s'assemblent-ils dynamiquement (événements, IA, orchestration) selon le contexte ?",
    whyItMatters: "La “fusion” permet de passer de workflows rigides à des flows adaptatifs.",
    options: OPT_CLARITY,
  },
  {
    id: "whole-lotta-fusion__02",
    targetTrendIds: ["whole-lotta-fusion"],
    dimension: "foundations",
    prompt: "Avez-vous une architecture d'événements / intégration qui supporte ces assemblages ?",
    whyItMatters: "Sans événements et intégration robuste, la fusion reste un concept.",
    options: OPT_MATURITY,
  },
  {
    id: "whole-lotta-fusion__03",
    targetTrendIds: ["whole-lotta-fusion"],
    dimension: "balance",
    prompt: "Avez-vous défini comment contrôler et auditer des processus qui changent en temps réel ?",
    whyItMatters: "Des flows adaptatifs exigent une gouvernance et une observabilité plus fortes.",
    options: OPT_RISK,
  },

  {
    id: "micro-process-magic__01",
    targetTrendIds: ["micro-process-magic"],
    dimension: "execution",
    prompt: "Découpez-vous les processus en “micro-composants” réutilisables plutôt qu'en macro-workflows ?",
    whyItMatters: "Les micro-process facilitent l'évolution rapide et l'optimisation ciblée.",
    options: OPT_MATURITY,
  },
  {
    id: "micro-process-magic__02",
    targetTrendIds: ["micro-process-magic"],
    dimension: "foundations",
    prompt: "Avez-vous un référentiel clair (catalogue) des micro-processus et de leurs contrats ?",
    whyItMatters: "Le “magic” vient de la réutilisation — sinon, on recrée du spaghetti.",
    options: OPT_MATURITY,
  },
  {
    id: "micro-process-magic__03",
    targetTrendIds: ["micro-process-magic"],
    dimension: "balance",
    prompt: "Avez-vous des standards de qualité/observabilité pour éviter la dette des micro-process ?",
    whyItMatters: "Petit ne veut pas dire “sans règles” : sinon la complexité explose.",
    options: OPT_GOV,
  },

  {
    id: "ctrl-alt-human__01",
    targetTrendIds: ["ctrl-alt-human"],
    dimension: "balance",
    prompt: "Les décisions critiques restent-elles sous contrôle humain (exceptions, arbitrages, éthique) ?",
    whyItMatters: "TechnoVision insiste : l'automatisation doit amplifier, pas désactiver l'humain.",
    options: OPT_GOV,
  },
  {
    id: "ctrl-alt-human__02",
    targetTrendIds: ["ctrl-alt-human"],
    dimension: "execution",
    prompt: "Avez-vous prévu des “moments” d'intervention humaine efficaces (pas des comités lourds) ?",
    whyItMatters: "L'humain dans la boucle doit être fluide pour ne pas casser la vitesse.",
    options: OPT_CLARITY,
  },
  {
    id: "ctrl-alt-human__03",
    targetTrendIds: ["ctrl-alt-human"],
    dimension: "foundations",
    prompt: "Disposez-vous de signaux (observabilité) qui permettent à l'humain de décider au bon moment ?",
    whyItMatters: "On ne contrôle bien que ce qu'on voit bien.",
    options: OPT_MATURITY,
  },

  {
    id: "autonomous-enterprise__01",
    targetTrendIds: ["autonomous-enterprise"],
    dimension: "execution",
    prompt: "Votre projet vise-t-il des opérations auto-optimisées (détection, décision, action) sans intervention constante ?",
    whyItMatters: "L'autonomie change l'échelle : moins de micro-gestion, plus de performance.",
    options: OPT_CLARITY,
  },
  {
    id: "autonomous-enterprise__02",
    targetTrendIds: ["autonomous-enterprise"],
    dimension: "foundations",
    prompt: "Avez-vous une observabilité solide (metrics, logs, traces) pour piloter l'autonomie ?",
    whyItMatters: "L'autonomie exige une visibilité totale sur ce que le système fait.",
    options: OPT_MATURITY,
  },
  {
    id: "autonomous-enterprise__03",
    targetTrendIds: ["autonomous-enterprise"],
    dimension: "balance",
    prompt: "Avez-vous prévu des limites : ce que le système peut faire seul vs ce qui doit être approuvé ?",
    whyItMatters: "Autonome ne veut pas dire incontrôlé : la confiance se construit.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Nature's Code ───────────────────────────
  {
    id: "my-chemical-advance__01",
    targetTrendIds: ["my-chemical-advance"],
    dimension: "execution",
    prompt: "Votre projet est-il impacté par des contraintes matériaux/énergie/batteries/sécurité chimique ?",
    whyItMatters: "Ce trend signale une vague d'innovation “chimie/énergie” qui change les produits.",
    options: OPT_CLARITY,
  },
  {
    id: "my-chemical-advance__02",
    targetTrendIds: ["my-chemical-advance"],
    dimension: "foundations",
    prompt: "Avez-vous identifié les dépendances (fournisseurs, normes, industrialisation) liées à ces choix ?",
    whyItMatters: "La chimie impose des contraintes fortes : supply, régulation, certification.",
    options: OPT_RISK,
  },
  {
    id: "my-chemical-advance__03",
    targetTrendIds: ["my-chemical-advance"],
    dimension: "balance",
    prompt: "Les impacts environnementaux/sûreté liés à ces choix sont-ils évalués et documentés ?",
    whyItMatters: "Innovation matérielle = responsabilité accrue.",
    options: OPT_RISK,
  },

  {
    id: "language-of-life__01",
    targetTrendIds: ["language-of-life"],
    dimension: "execution",
    prompt: "Votre projet explore-t-il des innovations inspirées du vivant (bio, biotech, health, biomimétisme) ?",
    whyItMatters: "Le vivant devient un “référentiel” d'innovation, au-delà du logiciel.",
    options: OPT_CLARITY,
  },
  {
    id: "language-of-life__02",
    targetTrendIds: ["language-of-life"],
    dimension: "foundations",
    prompt: "Avez-vous identifié les contraintes IP/réglementaires si vous touchez à des domaines “bio” ?",
    whyItMatters: "Ce terrain crée des opportunités… et des contraintes inédites.",
    options: OPT_RISK,
  },
  {
    id: "language-of-life__03",
    targetTrendIds: ["language-of-life"],
    dimension: "balance",
    prompt: "Avez-vous cadré l'éthique et l'acceptabilité (parties prenantes, transparence) si le vivant est concerné ?",
    whyItMatters: "La confiance et l'éthique sont centrales dès que le vivant entre en jeu.",
    options: OPT_RISK,
  },

  {
    id: "paint-it-light__01",
    targetTrendIds: ["paint-it-light"],
    dimension: "execution",
    prompt: "Votre projet dépend-il de la vitesse/efficacité de communication ou de calcul (réseaux, data centers, capteurs) ?",
    whyItMatters: "La photonique peut bouleverser performance et consommation.",
    options: OPT_CLARITY,
  },
  {
    id: "paint-it-light__02",
    targetTrendIds: ["paint-it-light"],
    dimension: "foundations",
    prompt: "Avez-vous évalué les options technologiques (matériel, intégration, fournisseurs) qui pourraient changer la donne ?",
    whyItMatters: "Ce trend invite à regarder des ruptures “hardware” souvent sous-estimées.",
    options: OPT_CLARITY,
  },
  {
    id: "paint-it-light__03",
    targetTrendIds: ["paint-it-light"],
    dimension: "balance",
    prompt: "Les choix performance/énergie sont-ils arbitrés de façon explicite (sobriété vs vitesse) ?",
    whyItMatters: "La performance n'est pas gratuite : TechnoVision pousse l'arbitrage conscient.",
    options: OPT_GOV,
  },

  {
    id: "mind-over-machine__01",
    targetTrendIds: ["mind-over-machine"],
    dimension: "execution",
    prompt: "Votre projet explore-t-il des interfaces “au-delà des écrans” (capteurs, signaux, intentions) ?",
    whyItMatters: "Ce trend questionne la prochaine rupture des interactions homme-machine.",
    options: OPT_CLARITY,
  },
  {
    id: "mind-over-machine__02",
    targetTrendIds: ["mind-over-machine"],
    dimension: "balance",
    prompt: "Avez-vous anticipé les sujets sensibles : consentement, privacy, risques d'interprétation ?",
    whyItMatters: "Plus on capte des signaux humains, plus la confiance est fragile.",
    options: OPT_RISK,
  },
  {
    id: "mind-over-machine__03",
    targetTrendIds: ["mind-over-machine"],
    dimension: "foundations",
    prompt: "Disposez-vous des compétences/partenaires nécessaires si vous allez vers des capteurs avancés ?",
    whyItMatters: "TechnoVision sert aussi à identifier les expertises à mobiliser.",
    options: OPT_CLARITY,
  },

  // ─────────────────────────── Invisible Infostructure ───────────────────────────
  {
    id: "cloud-encounters__01",
    targetTrendIds: ["cloud-encounters"],
    dimension: "foundations",
    prompt: "Votre stratégie cloud tient-elle compte des enjeux : souveraineté, durabilité, mix multi-cloud/hybride ?",
    whyItMatters: "Le cloud “3.0” combine performance, conformité, souveraineté et sobriété.",
    options: OPT_CLARITY,
  },
  {
    id: "cloud-encounters__02",
    targetTrendIds: ["cloud-encounters"],
    dimension: "execution",
    prompt: "Vos opérations cloud sont-elles industrialisées (IaC, FinOps, sécurité, automatisation) ?",
    whyItMatters: "La valeur cloud vient de l'exploitation : pas seulement du déploiement.",
    options: OPT_MATURITY,
  },
  {
    id: "cloud-encounters__03",
    targetTrendIds: ["cloud-encounters"],
    dimension: "balance",
    prompt: "Avez-vous clarifié les règles d'architecture pour éviter dispersion, shadow IT et dérives de coûts ?",
    whyItMatters: "Sans gouvernance, le cloud amplifie la complexité au lieu de l'absorber.",
    options: OPT_GOV,
  },

  {
    id: "everything-everywhere__01",
    targetTrendIds: ["everything-everywhere"],
    dimension: "foundations",
    prompt: "Votre projet dépend-il d'une connectivité forte entre sites, systèmes, objets et partenaires ?",
    whyItMatters: "Quand tout est connecté, l'infrastructure devient un actif stratégique.",
    options: OPT_CLARITY,
  },
  {
    id: "everything-everywhere__02",
    targetTrendIds: ["everything-everywhere"],
    dimension: "execution",
    prompt: "Avez-vous prévu une résilience réseau (redondance, monitoring, plans de continuité) adaptée ?",
    whyItMatters: "L'hyper-connexion amplifie aussi les pannes : la résilience devient clé.",
    options: OPT_MATURITY,
  },
  {
    id: "everything-everywhere__03",
    targetTrendIds: ["everything-everywhere"],
    dimension: "balance",
    prompt: "Avez-vous évalué les risques : sécurité, dépendance fournisseurs, souveraineté des flux ?",
    whyItMatters: "Connecter tout, c'est aussi exposer plus : d'où l'importance des garde-fous.",
    options: OPT_RISK,
  },

  {
    id: "simply-the-edge__01",
    targetTrendIds: ["simply-the-edge"],
    dimension: "foundations",
    prompt: "Votre projet a-t-il besoin de calcul proche terrain (latence, continuité, coût, confidentialité) ?",
    whyItMatters: "L'edge redistribue où l'intelligence vit — et change l'architecture.",
    options: OPT_CLARITY,
  },
  {
    id: "simply-the-edge__02",
    targetTrendIds: ["simply-the-edge"],
    dimension: "execution",
    prompt: "Avez-vous une stratégie de déploiement/maintenance sur sites edge (mise à jour, monitoring, sécurité) ?",
    whyItMatters: "L'edge est un produit d'exploitation : sans ops, ça ne tient pas.",
    options: OPT_MATURITY,
  },
  {
    id: "simply-the-edge__03",
    targetTrendIds: ["simply-the-edge"],
    dimension: "balance",
    prompt: "Les enjeux sûreté/sécurité physique des équipements edge sont-ils pris en compte ?",
    whyItMatters: "Le edge vit dans le réel : les menaces sont aussi physiques.",
    options: OPT_RISK,
  },

  {
    id: "ok-qompute__01",
    targetTrendIds: ["ok-qompute"],
    dimension: "foundations",
    prompt: "Votre projet est-il limité par la capacité de calcul (IA, optimisation, temps réel, simulation) ?",
    whyItMatters: "Ce trend pointe une mutation des architectures de compute.",
    options: OPT_CLARITY,
  },
  {
    id: "ok-qompute__02",
    targetTrendIds: ["ok-qompute"],
    dimension: "execution",
    prompt: "Avez-vous exploré des options d'architecture compute (GPU, accélérateurs, hybrides) adaptées à votre cas ?",
    whyItMatters: "Le compute devient un design choice : il faut l'architecturer.",
    options: OPT_CLARITY,
  },
  {
    id: "ok-qompute__03",
    targetTrendIds: ["ok-qompute"],
    dimension: "balance",
    prompt: "L'efficacité énergétique/coût du compute est-elle un critère explicite d'arbitrage ?",
    whyItMatters: "Plus de compute = plus de coût/empreinte : TechnoVision pousse l'arbitrage conscient.",
    options: OPT_GOV,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic selection
// Default strategy: pick 2 questions per selected trend, diversity by dimension,
// cap at maxQuestions (default 10) to keep session 5–7 minutes.
// Deterministic shuffle with seed so the same project tends to see same questions.
// ─────────────────────────────────────────────────────────────────────────────

type SelectQuestionsParams = {
  selectedTrendIds: string[];
  maxQuestions?: number;
  /** seed for deterministic pick (e.g., projectName) */
  seed?: string;
  /** questions per trend (default 2) */
  perTrend?: number;
  /** language to use; falls back to "fr" if EN bank is empty */
  lang?: Lang;
};

function hashSeed(seed: string): number {
  // small deterministic hash -> 32-bit
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: string): T[] {
  const out = [...arr];
  const rnd = mulberry32(hashSeed(seed || "default-seed"));
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickDiverseByDimension(questions: Question[], count: number, seed: string): Question[] {
  if (questions.length <= count) return questions;
  const shuffled = seededShuffle(questions, seed);

  // Greedy: try to cover dimensions first, then fill.
  const byDim: Record<Dimension, Question[]> = { foundations: [], execution: [], balance: [] };
  for (const q of shuffled) byDim[q.dimension].push(q);

  const picked: Question[] = [];
  const dims: Dimension[] = ["foundations", "execution", "balance"];
  // First pass: pick one per dimension if possible
  for (const d of dims) {
    if (picked.length >= count) break;
    const q = byDim[d].shift();
    if (q) picked.push(q);
  }
  // Fill remaining
  const rest = shuffled.filter((q) => !picked.includes(q));
  for (const q of rest) {
    if (picked.length >= count) break;
    picked.push(q);
  }
  return picked.slice(0, count);
}

export function selectQuestions(params: SelectQuestionsParams): Question[] {
  const {
    selectedTrendIds,
    maxQuestions = 10,
    seed = "technovision",
    perTrend = 2,
    lang = "fr",
  } = params;

  // Use the EN bank when available, fall back to FR
  const bank = lang === "en" && QUESTION_BANK_EN.length > 0 ? QUESTION_BANK_EN : QUESTION_BANK;

  const uniqueTrendIds = Array.from(new Set(selectedTrendIds)).filter(Boolean);

  // Build pool per trend
  const picked: Question[] = [];
  for (const trendId of uniqueTrendIds) {
    const pool = bank.filter((q) => q.targetTrendIds.includes(trendId));
    const selected = pickDiverseByDimension(pool, perTrend, `${seed}::${trendId}`);
    picked.push(...selected);
  }

  // If too many, trim deterministically
  const trimmed = seededShuffle(picked, `${seed}::all`).slice(0, maxQuestions);

  // Ensure stable ordering for UX (optional): group by trend order then by dimension
  const dimOrder: Record<Dimension, number> = { foundations: 0, execution: 1, balance: 2 };
  const trendOrder = new Map<string, number>();
  uniqueTrendIds.forEach((id, idx) => trendOrder.set(id, idx));

  trimmed.sort((a, b) => {
    const aTrend = a.targetTrendIds[0];
    const bTrend = b.targetTrendIds[0];
    const ta = trendOrder.get(aTrend) ?? 999;
    const tb = trendOrder.get(bTrend) ?? 999;
    if (ta !== tb) return ta - tb;
    return dimOrder[a.dimension] - dimOrder[b.dimension];
  });

  return trimmed;
}