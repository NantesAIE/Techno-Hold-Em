// src/data/TechnoVisionTooltips.ts

export const TECHNOVISION_TREND_TOOLTIPS: Record<string, string> = {
  // You Experience
  'face-to-interface':
    'Quand les interfaces deviennent conversationnelles, contextuelles… et presque invisibles.',
  'youre-something-spatial':
    'L’expérience digitale sort de l’écran pour s’ancrer dans l’espace physique.',
  'internet-of-twins':
    'Des jumeaux numériques pour comprendre, simuler et décider avant d’agir.',
  'knowing-me-knowing-ux':
    'Des expériences ultra‑personnalisées, mais jusqu’où sans perdre la confiance ?',

  // We Collaborate
  'my-identity-my-business':
    'L’identité devient un actif business clé au cœur des écosystèmes numériques.',
  'autonomous-agent-alliance':
    'Humains et agents autonomes collaborent pour atteindre des objectifs communs.',
  'synergy2':
    'La valeur émerge de la synergie entre plateformes, équipes et partenaires.',
  'economy-of-things':
    'Objets, services et données s’assemblent pour créer de nouveaux modèles économiques.',

  // Thriving on Data
  'data-sharing-is-caring':
    'Partager la donnée crée de la valeur… à condition de bien la gouverner.',
  'ai-meshed-up':
    'L’IA n’est plus un outil isolé, mais un maillage au cœur des systèmes.',
  'net-zero-data':
    'Moins de données inutiles, plus de données utiles, maîtrisées et responsables.',
  'the-thing-with-data':
    'La donnée prend vie au plus près des objets et des usages.',

  // Physical Matters
  'material-world':
    'Le monde physique devient programmable, intelligent et connecté.',
  'mission-adaptable':
    'Des systèmes conçus pour évoluer en continu, pas pour rester figés.',
  'terminal-velocity':
    'Quand la vitesse d’exécution devient un facteur stratégique.',
  'to-intelligence-and-beyond':
    'L’intelligence embarquée dépasse les limites du software traditionnel.',

  // Applications Unleashed
  'honey-i-shrunk':
    'Des applications plus petites, modulaires et rapides à faire évoluer.',
  'when-code-goes-know':
    'Le code intègre la connaissance métier et gagne en autonomie.',
  'chat-is-the-new-super-app':
    'La conversation devient le point d’entrée universel des services.',
  'app-robot':
    'Les applications ne se contentent plus d’exécuter, elles agissent.',

  // Balance by Design
  'technology-business':
    'La technologie n’est plus un support du business, elle en fait partie.',
  'we-augment':
    'L’IA augmente les humains, elle ne les remplace pas.',
  'do-good-do-less-do-well':
    'Créer plus de valeur avec moins de ressources et plus de sens.',
  'be-like-water':
    'Des organisations flexibles, capables de s’adapter à tous les contextes.',
  'trust-thrust':
    'Sans confiance, aucune technologie ne peut réellement passer à l’échelle.',

  // Process on the Fly
  'whole-lotta-fusion':
    'Des processus dynamiques composés à partir de multiples sources.',
  'micro-process-magic':
    'Des micro‑processus agiles pour répondre à des besoins très ciblés.',
  'ctrl-alt-human':
    'L’humain reste maître des décisions clés dans des systèmes automatisés.',
  'autonomous-enterprise':
    'Vers des organisations capables de s’auto‑piloter en temps réel.',

  // Nature’s Code
  'my-chemical-advance':
    'La chimie et la biotech inspirent de nouvelles formes d’innovation.',
  'language-of-life':
    'Exploiter les langages du vivant pour créer autrement.',
  'paint-it-light':
    'La lumière devient un médium technologique à part entière.',
  'mind-over-machine':
    'Quand le vivant et la machine s’influencent mutuellement.',

  // Invisible Infostructure
  'cloud-encounters':
    'Le cloud devient plus distribué, souverain et intelligent.',
  'everything-everywhere':
    'Une connectivité totale entre systèmes, lieux et écosystèmes.',
  'simply-the-edge':
    'Le calcul se rapproche du terrain pour plus de réactivité.',
  'ok-qompute':
    'De nouvelles architectures de calcul repoussent les limites actuelles.',
};

import type { Lang } from '../i18n/types';
import { TECHNOVISION_TREND_TOOLTIPS_EN } from './TechnoVisionTooltips.en';

/** Returns the tooltip map for the given language, falling back to FR for missing keys. */
export function getTechnoVisionTooltips(lang: Lang): Record<string, string> {
  if (lang === 'fr') return TECHNOVISION_TREND_TOOLTIPS;
  // Merge: EN overrides FR where available
  return { ...TECHNOVISION_TREND_TOOLTIPS, ...TECHNOVISION_TREND_TOOLTIPS_EN };
}
