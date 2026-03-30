import { ACTION_TEMPLATES, type ActionTemplate } from '../data/actionTemplates';
import { TRENDS } from '../data/technovision2026';
import type { DimensionScores } from './scoring';
import type { Dimension } from '../data/questions';

export interface SelectedAction {
  id: string;
  title: string;
  description: string;
  benefit: string;
  impactedTrendNames: string[];
  targetDimension: Dimension;
}

const DIMENSION_KEY_TO_LABEL: Record<keyof DimensionScores, Dimension> = {
  foundations: 'Foundations',
  execution: 'Execution',
  balance: 'Balance',
};

export function selectActions(
  dimensions: DimensionScores,
  selectedTrendIds: string[]
): SelectedAction[] {
  // Sort dimension keys from weakest to strongest
  const sortedKeys = (Object.keys(dimensions) as Array<keyof DimensionScores>).sort(
    (a, b) => dimensions[a] - dimensions[b]
  );

  // Weakest dimension gets 2 actions, medium gets 1
  const targetDimensions: Dimension[] = [];
  if (sortedKeys.length >= 1) {
    targetDimensions.push(DIMENSION_KEY_TO_LABEL[sortedKeys[0]]);
    targetDimensions.push(DIMENSION_KEY_TO_LABEL[sortedKeys[0]]);
  }
  if (sortedKeys.length >= 2) {
    targetDimensions.push(DIMENSION_KEY_TO_LABEL[sortedKeys[1]]);
  }

  const selectedIds = new Set<string>();
  const result: SelectedAction[] = [];

  for (const dim of targetDimensions) {
    if (result.length >= 3) break;
    const candidate = ACTION_TEMPLATES.find(
      a => a.targetDimension === dim && !selectedIds.has(a.id)
    );
    if (candidate) {
      selectedIds.add(candidate.id);
      result.push(buildSelectedAction(candidate, selectedTrendIds));
    }
  }

  // Fill up to 3 if needed
  for (const template of ACTION_TEMPLATES) {
    if (result.length >= 3) break;
    if (!selectedIds.has(template.id)) {
      selectedIds.add(template.id);
      result.push(buildSelectedAction(template, selectedTrendIds));
    }
  }

  return result.slice(0, 3);
}

function buildSelectedAction(
  template: ActionTemplate,
  selectedTrendIds: string[]
): SelectedAction {
  const relevantIds = template.impactedTrendIds.filter(id => selectedTrendIds.includes(id));
  const displayIds = relevantIds.length > 0 ? relevantIds : template.impactedTrendIds.slice(0, 2);

  const impactedTrendNames = displayIds
    .map(id => TRENDS.find(t => t.id === id)?.name ?? id);

  return {
    id: template.id,
    title: template.title,
    description: template.description,
    benefit: template.benefit,
    impactedTrendNames,
    targetDimension: template.targetDimension,
  };
}
