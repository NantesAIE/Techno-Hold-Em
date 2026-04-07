/**
 * actionTemplates.en.ts
 *
 * English action templates for Techno Hold 'Em.
 *
 */

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

export const ACTION_TEMPLATES_EN: ActionTemplate[] = [
  // Foundations actions
  {
    id: 'a1',
    title: 'Clarify business value',
    description:
      'Run a framing workshop with key stakeholders to formalize the vision, measurable objectives (OKRs / KPIs), and success criteria of the project.',
    benefit:
      'Stronger alignment across teams, fewer late-stage rework cycles, and better backlog prioritization.',
    targetDimension: 'foundations',
    impactedContainerIds: ['balance-by-design', 'process-on-the-fly'],
    impactedTrendIds: ['technology-business', 'micro-process-magic', 'be-like-water'],
  },
  {
    id: 'a2',
    title: 'Establish data governance',
    description:
      'Set up a data governance framework covering data quality, accessibility, classification, and compliance for all data used by the project.',
    benefit:
      'More reliable outcomes, GDPR compliance, and fewer production incidents linked to data issues.',
    targetDimension: 'foundations',
    impactedContainerIds: ['thriving-on-data', 'balance-by-design'],
    impactedTrendIds: ['data-sharing-is-caring', 'the-thing-with-data', 'trust-thrust'],
  },
  {
    id: 'a3',
    title: 'Define the target architecture',
    description:
      'Define cloud architecture choices, integration patterns, and non-functional requirements (performance, scalability, resilience) before development starts.',
    benefit:
      'Reduced technical debt, ensured scalability, and faster onboarding of delivery teams.',
    targetDimension: 'foundations',
    impactedContainerIds: ['invisible-infostructure', 'applications-unleashed'],
    impactedTrendIds: ['cloud-encounters', 'simply-the-edge', 'mission-adaptable'],
  },

  // Execution actions
  {
    id: 'a4',
    title: 'Break down delivery into value-driven sprints',
    description:
      'Review the backlog to identify high-value deliverables and organize them into short, measurable increments with clear acceptance criteria.',
    benefit:
      'Improved visibility, shorter time-to-market, and faster user feedback loops.',
    targetDimension: 'execution',
    impactedContainerIds: ['process-on-the-fly', 'applications-unleashed'],
    impactedTrendIds: ['micro-process-magic', 'whole-lotta-fusion', 'honey-i-shrunk'],
  },
  {
    id: 'a5',
    title: 'Map and mitigate risks',
    description:
      'Run a structured risk assessment covering security, regulatory compliance, critical integrations, and external dependencies. Assign an owner to each risk.',
    benefit:
      'Early issue anticipation, ensured compliance, and fewer late-project surprises.',
    targetDimension: 'execution',
    impactedContainerIds: ['balance-by-design', 'we-collaborate'],
    impactedTrendIds: ['trust-thrust', 'my-identity-my-business', 'do-good-do-less-do-well'],
  },
  {
    id: 'a6',
    title: 'Integrate RUN from the BUILD phase',
    description:
      'Involve operations teams from the design phase onward: define SLAs, runbooks, monitoring, and escalation procedures before go-live.',
    benefit:
      'Service continuity, fewer post-deployment incidents, and controlled operating costs.',
    targetDimension: 'execution',
    impactedContainerIds: ['process-on-the-fly', 'physical-matters'],
    impactedTrendIds: ['autonomous-enterprise', 'mission-adaptable', 'terminal-velocity'],
  },

  // Balance actions
  {
    id: 'a7',
    title: 'Define human guardrails',
    description:
      'Map automated decisions and identify control points where humans remain decision-makers. Document the required level of explainability for each automation.',
    benefit:
      'Clear accountability, end-user trust, and compliance with AI regulations (AI Act).',
    targetDimension: 'balance',
    impactedContainerIds: ['balance-by-design', 'process-on-the-fly'],
    impactedTrendIds: ['ctrl-alt-human', 'we-augment', 'autonomous-enterprise'],
  },
  {
    id: 'a8',
    title: 'Strengthen the trust chain',
    description:
      'Implement traceability, audit, and explainability mechanisms for automated decisions. Embed privacy by design and security controls from the outset.',
    benefit:
      'GDPR and AI Act compliance, increased user trust, and reduced reputational risk.',
    targetDimension: 'balance',
    impactedContainerIds: ['balance-by-design', 'we-collaborate'],
    impactedTrendIds: ['trust-thrust', 'my-identity-my-business', 'data-sharing-is-caring'],
  },
  {
    id: 'a9',
    title: 'Assess impact and sustainability',
    description:
      'Integrate environmental and societal impact metrics into project success criteria. Measure the carbon footprint of the technical stack and identify optimization levers.',
    benefit:
      'ESG alignment, reduced carbon footprint, and a strong differentiation argument for clients.',
    targetDimension: 'balance',
    impactedContainerIds: ['balance-by-design', 'natures-code'],
    impactedTrendIds: ['do-good-do-less-do-well', 'net-zero-data', 'paint-it-light'],
  },
];