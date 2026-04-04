import type { Dimension } from './questions';

export interface ActionTemplate {
  id: string;
  title: string;
  description: string;
  benefit: string;
  targetDimension: Dimension;
  impactedContainerIds: string[];
  impactedTrendIds: string[];
}

export const ACTION_TEMPLATES: ActionTemplate[] = [
  // Foundations actions
  {
    id: 'a1',
    title: 'Clarifier la valeur metier',
    description: `Organiser un atelier de cadrage avec les parties prenantes pour formaliser la vision, les objectifs mesurables (OKRs / KPIs) et les criteres de succes du projet.`,
    benefit: `Alignement des equipes, reduction des retours tardifs et meilleure priorisation du backlog.`,
    targetDimension: 'foundations',
    impactedContainerIds: ['balance-by-design', 'process-on-the-fly'],
    impactedTrendIds: ['technology-business', 'micro-process-magic', 'be-like-water'],
  },
  {
    id: 'a2',
    title: `Etablir une gouvernance des donnees`,
    description: `Mettre en place un cadre de gouvernance couvrant la qualite, l'accessibilite, la classification et la conformite des donnees utilisees par le projet.`,
    benefit: `Fiabilite des resultats, conformite RGPD, reduction des incidents de production lies aux donnees.`,
    targetDimension: 'foundations',
    impactedContainerIds: ['thriving-on-data', 'balance-by-design'],
    impactedTrendIds: ['data-sharing-is-caring', 'the-thing-with-data', 'trust-thrust'],
  },
  {
    id: 'a3',
    title: `Cadrer l'architecture cible`,
    description: `Definir les choix d'architecture cloud, les patterns d'integration et les contraintes non-fonctionnelles (performance, scalabilite, resilience) avant le demarrage du developpement.`,
    benefit: `Reduction de la dette technique, scalabilite assuree, onboarding accelere des equipes.`,
    targetDimension: 'foundations',
    impactedContainerIds: ['invisible-infostructure', 'applications-unleashed'],
    impactedTrendIds: ['cloud-encounters', 'simply-the-edge', 'mission-adaptable'],
  },

  // Execution actions
  {
    id: 'a4',
    title: 'Decouper en sprints orientes valeur',
    description: `Revoir le backlog pour identifier les livrables a forte valeur ajoutee et les organiser en increments courts et mesurables avec des criteres d'acceptation explicites.`,
    benefit: `Visibilite accrue, reduction du time-to-market, feedback utilisateur plus rapide.`,
    targetDimension: 'execution',
    impactedContainerIds: ['process-on-the-fly', 'applications-unleashed'],
    impactedTrendIds: ['micro-process-magic', 'whole-lotta-fusion', 'honey-i-shrunk'],
  },
  {
    id: 'a5',
    title: 'Cartographier et mitiger les risques',
    description: `Conduire un atelier de risk assessment couvrant la securite, la conformite reglementaire, les integrations critiques et les dependances externes. Assigner un owner a chaque risque.`,
    benefit: `Anticipation des blocages, conformite assuree, reduction des surprises en fin de projet.`,
    targetDimension: 'execution',
    impactedContainerIds: ['balance-by-design', 'we-collaborate'],
    impactedTrendIds: ['trust-thrust', 'my-identity-my-business', 'do-good-do-less-do-well'],
  },
  {
    id: 'a6',
    title: 'Integrer le RUN des le BUILD',
    description: `Impliquer les equipes operationnelles des la phase de conception : definir les SLAs, les runbooks, le monitoring et les procedures d'escalade avant la mise en production.`,
    benefit: `Continuite de service, reduction des incidents post-deploiement, couts d'exploitation maitrises.`,
    targetDimension: 'execution',
    impactedContainerIds: ['process-on-the-fly', 'physical-matters'],
    impactedTrendIds: ['autonomous-enterprise', 'mission-adaptable', 'terminal-velocity'],
  },

  // Balance actions
  {
    id: 'a7',
    title: `Definir les garde-fous humains`,
    description: `Cartographier les decisions automatisees et identifier les points de controle ou l'humain reste decisionnaire. Documenter le niveau d'explainabilite requis pour chaque automatisation.`,
    benefit: `Responsabilite assumee, confiance des utilisateurs finaux, conformite aux reglementations IA (AI Act).`,
    targetDimension: 'balance',
    impactedContainerIds: ['balance-by-design', 'process-on-the-fly'],
    impactedTrendIds: ['ctrl-alt-human', 'we-augment', 'autonomous-enterprise'],
  },
  {
    id: 'a8',
    title: `Renforcer la chaine de confiance`,
    description: `Mettre en place des mecanismes de tracabilite, d'audit et d'explicabilite des decisions automatisees. Integrer le privacy by design et les controles de securite des la conception.`,
    benefit: `Conformite RGPD et AI Act, trust utilisateur, reduction du risque reputationnel.`,
    targetDimension: 'balance',
    impactedContainerIds: ['balance-by-design', 'we-collaborate'],
    impactedTrendIds: ['trust-thrust', 'my-identity-my-business', 'data-sharing-is-caring'],
  },
  {
    id: 'a9',
    title: `Evaluer l'impact et la durabilite`,
    description: `Integrer des metriques d'impact environnemental et societetal dans les criteres de succes du projet. Mesurer l'empreinte carbone du socle technique et identifier les optimisations possibles.`,
    benefit: `Alignement ESG, reduction de l'empreinte carbone, argument differenciant pour les clients.`,
    targetDimension: 'balance',
    impactedContainerIds: ['balance-by-design', 'natures-code'],
    impactedTrendIds: ['do-good-do-less-do-well', 'net-zero-data', 'paint-it-light'],
  },
];
