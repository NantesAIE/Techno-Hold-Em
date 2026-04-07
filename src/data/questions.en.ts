// src/data/questions.en.ts
// Techno Hold ’Em – Dynamic question selection driven by selected TechnoVision 2026 trends
// English version – aligned with TechnoVision tone and concepts

import type { Question, QuestionOption } from './questions';

// ─────────────────────────────────────────────────────────────────────────────
// Shared option templates (EN)
// ─────────────────────────────────────────────────────────────────────────────

const OPT_MATURITY: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Yes — in place and used in production", value: 3 },
  { id: "b", label: "Partly — on a limited scope", value: 2 },
  { id: "c", label: "Planned / in progress — not operational yet", value: 1 },
  { id: "d", label: "No / not on the roadmap", value: 0 },
];

const OPT_CLARITY: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Very clear (defined, shared, measurable)", value: 3 },
  { id: "b", label: "Fairly clear (defined, not always measured)", value: 2 },
  { id: "c", label: "Still unclear / differs across stakeholders", value: 1 },
  { id: "d", label: "Not defined at this stage", value: 0 },
];

const OPT_RISK: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Risks identified + active mitigation plan", value: 3 },
  { id: "b", label: "Risks identified, mitigations partly defined", value: 2 },
  { id: "c", label: "Risks sensed, not structured yet", value: 1 },
  { id: "d", label: "Not identified / not addressed", value: 0 },
];

const OPT_GOV: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "Roles, decisions and trade‑offs are structured", value: 3 },
  { id: "b", label: "Governance exists but lacks consistency", value: 2 },
  { id: "c", label: "Ad‑hoc governance, driven by urgency", value: 1 },
  { id: "d", label: "No clear governance", value: 0 },
];

const OPT_USER: [QuestionOption, QuestionOption, QuestionOption, QuestionOption] = [
  { id: "a", label: "User‑centric (tests, feedback, iterations)", value: 3 },
  { id: "b", label: "User needs considered, but rarely tested", value: 2 },
  { id: "c", label: "User needs assumed, weakly validated", value: 1 },
  { id: "d", label: "Primarily technology / constraints‑driven", value: 0 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Question bank (EN) – rich, trend‑specific
// Each trend has 3 questions: Opportunity / Readiness / Guardrails
// ─────────────────────────────────────────────────────────────────────────────

export const QUESTION_BANK_EN: Question[] = [
  // ─────────────────────────── You Experience ───────────────────────────
  {
    id: "face-to-interface__01",
    targetTrendIds: ["face-to-interface"],
    dimension: "execution",
    prompt:
      'Does your project plan for a “natural” interaction (conversation, voice, agent) as the primary entry point?',
    helper: "Think: chat/voice/agent driving the experience.",
    whyItMatters:
      "This trend reshapes how users access services: fewer menus, more intent‑driven journeys.",
    options: OPT_MATURITY,
  },
  {
    id: "face-to-interface__02",
    targetTrendIds: ["face-to-interface"],
    dimension: "balance",
    prompt:
      'Have you defined boundaries: what the “human‑like” interface should/can do… and should not do?',
    helper: "Examples: hallucinations, human escalation, tone, guardrails.",
    whyItMatters:
      "The more human an interface feels, the more trust and control become critical.",
    options: OPT_RISK,
  },
  {
    id: "face-to-interface__03",
    targetTrendIds: ["face-to-interface"],
    dimension: "foundations",
    prompt:
      "Are business intents/content (FAQ, procedures, knowledge) structured to power the experience?",
    whyItMatters:
      "Without structured knowledge, conversational interfaces remain superficial.",
    options: OPT_MATURITY,
  },

  {
    id: "youre-something-spatial__01",
    targetTrendIds: ["youre-something-spatial"],
    dimension: "execution",
    prompt:
      "Does your project leverage space (3D, AR/VR, maps, geolocation, physical context) to improve the experience?",
    whyItMatters:
      "Spatial experiences become more intuitive when the physical context matters.",
    options: OPT_MATURITY,
  },
  {
    id: "youre-something-spatial__02",
    targetTrendIds: ["youre-something-spatial"],
    dimension: "foundations",
    prompt:
      'Do you have a reliable “reality model” (maps, reference data, measurements) to anchor the spatial experience?',
    whyItMatters:
      "Spatial is powerful… but only if the underlying reality is consistent and maintainable.",
    options: OPT_CLARITY,
  },
  {
    id: "youre-something-spatial__03",
    targetTrendIds: ["youre-something-spatial"],
    dimension: "balance",
    prompt:
      "Have you assessed usage constraints (fatigue, accessibility, safety) linked to immersive experiences?",
    whyItMatters:
      "Immersion can fail if it is not comfortable, inclusive and safe.",
    options: OPT_RISK,
  },

  {
    id: "internet-of-twins__01",
    targetTrendIds: ["internet-of-twins"],
    dimension: "foundations",
    prompt:
      "Do you have an exploitable digital twin (model + data) to simulate/optimize before acting?",
    whyItMatters:
      "Digital twins reduce risk by testing decisions in the virtual world first.",
    options: OPT_MATURITY,
  },
  {
    id: "internet-of-twins__02",
    targetTrendIds: ["internet-of-twins"],
    dimension: "execution",
    prompt:
      "Is the twin connected to decision loops (alerts, recommendations, automation)?",
    whyItMatters:
      "A static twin informs; a connected twin transforms.",
    options: OPT_MATURITY,
  },
  {
    id: "internet-of-twins__03",
    targetTrendIds: ["internet-of-twins"],
    dimension: "balance",
    prompt:
      'Have you clarified who “has the final say” between simulation, AI and human expertise?',
    whyItMatters:
      "Value comes from orchestration; trust depends on accountable decisions.",
    options: OPT_GOV,
  },

  {
    id: "knowing-me-knowing-ux__01",
    targetTrendIds: ["knowing-me-knowing-ux"],
    dimension: "execution",
    prompt:
      "Does your experience adapt to user context (preferences, situation, channel, intent)?",
    whyItMatters:
      "UX becomes “intelligent” when it anticipates and adjusts without friction.",
    options: OPT_MATURITY,
  },
  {
    id: "knowing-me-knowing-ux__02",
    targetTrendIds: ["knowing-me-knowing-ux"],
    dimension: "balance",
    prompt:
      "Have you defined limits to personalization (privacy, consent, transparency)?",
    whyItMatters:
      "Personalization creates value… but can destroy trust if it feels intrusive or surprising.",
    options: OPT_RISK,
  },
  {
    id: "knowing-me-knowing-ux__03",
    targetTrendIds: ["knowing-me-knowing-ux"],
    dimension: "foundations",
    prompt:
      'Is your “profile/context” data reliable and governed (source, freshness, quality)?',
    whyItMatters:
      "Adaptive UX depends on a solid and coherent data foundation.",
    options: OPT_CLARITY,
  },

  // ─────────────────────────── We Collaborate ───────────────────────────
  {
    id: "my-identity-my-business__01",
    targetTrendIds: ["my-identity-my-business"],
    dimension: "foundations",
    prompt:
      "Is identity (people, services, things) treated as a core asset (SSO, roles, rights, proofs)?",
    whyItMatters:
      "Identity becomes the “passport” for collaboration and transactions across ecosystems.",
    options: OPT_MATURITY,
  },
  {
    id: "my-identity-my-business__02",
    targetTrendIds: ["my-identity-my-business"],
    dimension: "balance",
    prompt:
      "Have you anticipated the impact of fraud/impersonation (including AI‑enabled) on your project?",
    whyItMatters:
      "When AI can imitate, identity and trust become immediate business concerns.",
    options: OPT_RISK,
  },
  {
    id: "my-identity-my-business__03",
    targetTrendIds: ["my-identity-my-business"],
    dimension: "execution",
    prompt:
      "Are access journeys (onboarding, delegation, revocation) smooth enough to avoid workarounds?",
    whyItMatters:
      "Overly complex identity drives users to bypass controls… weakening everything.",
    options: OPT_USER,
  },

  {
    id: "autonomous-agent-alliance__01",
    targetTrendIds: ["autonomous-agent-alliance"],
    dimension: "execution",
    prompt:
      "Does your project involve agents that can execute multi‑step tasks (not just answer questions)?",
    whyItMatters:
      "The leap in value is action: plan, act, verify, and close the loop.",
    options: OPT_MATURITY,
  },
  {
    id: "autonomous-agent-alliance__02",
    targetTrendIds: ["autonomous-agent-alliance"],
    dimension: "balance",
    prompt:
      "Are agent control rules explicit (permissions, approvals, logs, escalation)?",
    whyItMatters:
      "Powerful agents without guardrails create systemic risk.",
    options: OPT_RISK,
  },
  {
    id: "autonomous-agent-alliance__03",
    targetTrendIds: ["autonomous-agent-alliance"],
    dimension: "foundations",
    prompt:
      "Do your systems expose well‑defined actions (APIs, tools) so agents can operate cleanly?",
    whyItMatters:
      "Without robust interfaces/tools, agentic remains a demo rather than an operating model.",
    options: OPT_MATURITY,
  },

  {
    id: "synergy2__01",
    targetTrendIds: ["synergy2"],
    dimension: "execution",
    prompt:
      "Does your project rely on orchestrating multiple systems/teams rather than building a single monolith?",
    whyItMatters:
      "Performance comes from synchronization: flows, responsibilities, handoffs.",
    options: OPT_CLARITY,
  },
  {
    id: "synergy2__02",
    targetTrendIds: ["synergy2"],
    dimension: "foundations",
    prompt:
      "Are interface contracts (data, APIs, events) formalized and versioned?",
    whyItMatters:
      "Without contracts, synergy quickly turns into integration chaos.",
    options: OPT_MATURITY,
  },
  {
    id: "synergy2__03",
    targetTrendIds: ["synergy2"],
    dimension: "balance",
    prompt:
      "Have you clarified trade‑offs: who optimizes what, and how to avoid side effects across domains?",
    whyItMatters:
      "Synchronizing systems also means synchronizing objectives.",
    options: OPT_GOV,
  },

  {
    id: "economy-of-things__01",
    targetTrendIds: ["economy-of-things"],
    dimension: "execution",
    prompt:
      "Does your project create value exchanges between “actors” (people, machines, services) beyond the internal organization?",
    whyItMatters:
      "This trend opens business models where “things” become active participants.",
    options: OPT_CLARITY,
  },
  {
    id: "economy-of-things__02",
    targetTrendIds: ["economy-of-things"],
    dimension: "foundations",
    prompt:
      "Do you have reliable traceability of exchanges (who did what, when, with which proofs)?",
    whyItMatters:
      "When things transact, proof and traceability become central.",
    options: OPT_MATURITY,
  },
  {
    id: "economy-of-things__03",
    targetTrendIds: ["economy-of-things"],
    dimension: "balance",
    prompt:
      'Are accountability rules clear if an autonomous actor “gets it wrong”?',
    whyItMatters:
      "New models bring new responsibilities — better to make them explicit.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Thriving on Data ───────────────────────────
  {
    id: "data-sharing-is-caring__01",
    targetTrendIds: ["data-sharing-is-caring"],
    dimension: "foundations",
    prompt:
      "Do you share (or plan to share) data with other entities (partners, business units, ecosystems)?",
    whyItMatters:
      "Value increases with sharing… but only if it is governed.",
    options: OPT_CLARITY,
  },
  {
    id: "data-sharing-is-caring__02",
    targetTrendIds: ["data-sharing-is-caring"],
    dimension: "balance",
    prompt:
      "Have you defined guardrails: usage rights, privacy, security, and re‑use conditions?",
    whyItMatters:
      "Sharing without care increases risk: leakage, non‑compliance, and loss of trust.",
    options: OPT_RISK,
  },
  {
    id: "data-sharing-is-caring__03",
    targetTrendIds: ["data-sharing-is-caring"],
    dimension: "execution",
    prompt:
      "Can your data consumers easily find, understand and use the data?",
    whyItMatters:
      "Sharing only creates value if data is truly consumable.",
    options: OPT_MATURITY,
  },

  {
    id: "ai-meshed-up__01",
    targetTrendIds: ["ai-meshed-up"],
    dimension: "execution",
    prompt:
      "Does your project combine multiple AI building blocks (models, rules, RPA, agents, search, data) rather than a single “copilot”?",
    whyItMatters:
      "Performance often comes from an intelligent mesh, not a single model.",
    options: OPT_CLARITY,
  },
  {
    id: "ai-meshed-up__02",
    targetTrendIds: ["ai-meshed-up"],
    dimension: "balance",
    prompt:
      "Do you have control mechanisms: evaluation, monitoring, transparency, and drift management?",
    whyItMatters:
      "The more AI is meshed, the more governance and observability become vital.",
    options: OPT_RISK,
  },
  {
    id: "ai-meshed-up__03",
    targetTrendIds: ["ai-meshed-up"],
    dimension: "foundations",
    prompt:
      "Are your data and interfaces ready to be “tooled” (indexing, APIs, events)?",
    whyItMatters:
      "Mesh quality depends on the foundation: data, integration, architecture.",
    options: OPT_MATURITY,
  },

  {
    id: "net-zero-data__01",
    targetTrendIds: ["net-zero-data"],
    dimension: "balance",
    prompt:
      "Have you identified which data is truly necessary… and which is costly “noise”?",
    whyItMatters:
      "Data sobriety reduces cost, risk and footprint — without losing value.",
    options: OPT_CLARITY,
  },
  {
    id: "net-zero-data__02",
    targetTrendIds: ["net-zero-data"],
    dimension: "foundations",
    prompt:
      "Do you have retention/archiving/quality rules to avoid unnecessary accumulation?",
    whyItMatters:
      "Without data hygiene, storage grows… and trust declines.",
    options: OPT_MATURITY,
  },
  {
    id: "net-zero-data__03",
    targetTrendIds: ["net-zero-data"],
    dimension: "execution",
    prompt:
      "Does the project measure the impact of data choices (volume, cost, performance) to arbitrate trade‑offs?",
    whyItMatters:
      "This trend turns sobriety into managed decisions (not good intentions).",
    options: OPT_MATURITY,
  },

  {
    id: "the-thing-with-data__01",
    targetTrendIds: ["the-thing-with-data"],
    dimension: "foundations",
    prompt:
      "Does your project leverage “close‑to‑the‑field” data (sensors, edge, IoT, real‑time events)?",
    whyItMatters:
      "When data lives near things, value becomes immediate.",
    options: OPT_CLARITY,
  },
  {
    id: "the-thing-with-data__02",
    targetTrendIds: ["the-thing-with-data"],
    dimension: "execution",
    prompt:
      "Do you have a real‑time chain (collect → process → decide) that is truly operational?",
    whyItMatters:
      "Real time is not a dashboard — it is a loop of action.",
    options: OPT_MATURITY,
  },
  {
    id: "the-thing-with-data__03",
    targetTrendIds: ["the-thing-with-data"],
    dimension: "balance",
    prompt:
      "Are security/safety constraints for connected things addressed from the start?",
    whyItMatters:
      "A single IoT/edge weak point can compromise the whole system.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Physical Matters ───────────────────────────
  {
    id: "material-world__01",
    targetTrendIds: ["material-world"],
    dimension: "execution",
    prompt:
      "Does your project involve intelligent physical assets (products, robots, devices, materials)?",
    whyItMatters:
      "When the physical world becomes intelligent, transformation moves beyond screens.",
    options: OPT_CLARITY,
  },
  {
    id: "material-world__02",
    targetTrendIds: ["material-world"],
    dimension: "foundations",
    prompt:
      "Do you have a data/interoperability strategy between physical and digital (sensors, models, APIs)?",
    whyItMatters:
      "Intelligent physical systems require an architecture that unites bits and atoms.",
    options: OPT_CLARITY,
  },
  {
    id: "material-world__03",
    targetTrendIds: ["material-world"],
    dimension: "balance",
    prompt:
      "Have you assessed safety, security and regulatory constraints linked to physical components?",
    whyItMatters:
      "As soon as you touch the real world, requirements (safety, regulation) shift up a level.",
    options: OPT_RISK,
  },

  {
    id: "mission-adaptable__01",
    targetTrendIds: ["mission-adaptable"],
    dimension: "execution",
    prompt:
      "Is your solution designed to evolve without major rewrites (modularity, versioning, compatibility)?",
    whyItMatters:
      "Adaptability becomes a competitive advantage in unstable environments.",
    options: OPT_MATURITY,
  },
  {
    id: "mission-adaptable__02",
    targetTrendIds: ["mission-adaptable"],
    dimension: "foundations",
    prompt:
      "Are your models (domain, product, data) structured enough to absorb change?",
    whyItMatters:
      "You only become adaptable if foundations are well designed.",
    options: OPT_CLARITY,
  },
  {
    id: "mission-adaptable__03",
    targetTrendIds: ["mission-adaptable"],
    dimension: "balance",
    prompt:
      'Do you have guardrails so “adaptable” does not become “unstable”?',
    whyItMatters:
      "Agility without rules can create chaos — TechnoVision insists on balance.",
    options: OPT_RISK,
  },

  {
    id: "terminal-velocity__01",
    targetTrendIds: ["terminal-velocity"],
    dimension: "execution",
    prompt:
      "Does the project need to operate at very high speed (low latency, fast decisions, automation)?",
    whyItMatters:
      "Speed requires a different architecture: observability, resilience, automation.",
    options: OPT_CLARITY,
  },
  {
    id: "terminal-velocity__02",
    targetTrendIds: ["terminal-velocity"],
    dimension: "foundations",
    prompt:
      "Do you have a performance foundation (scalability, performance testing, capacity planning) under control?",
    whyItMatters:
      "Speed is engineered — it cannot be bolted on at the end.",
    options: OPT_MATURITY,
  },
  {
    id: "terminal-velocity__03",
    targetTrendIds: ["terminal-velocity"],
    dimension: "balance",
    prompt:
      "Have you considered the risks: security, safety, and errors amplified by speed?",
    whyItMatters:
      "The faster it runs, the more costly errors become — trust turns critical.",
    options: OPT_RISK,
  },

  {
    id: "to-intelligence-and-beyond__01",
    targetTrendIds: ["to-intelligence-and-beyond"],
    dimension: "execution",
    prompt:
      'Is intelligence “distributed” (embedded, edge, cloud) based on field needs?',
    whyItMatters:
      "This trend pushes intelligence to the right place, at the right time.",
    options: OPT_CLARITY,
  },
  {
    id: "to-intelligence-and-beyond__02",
    targetTrendIds: ["to-intelligence-and-beyond"],
    dimension: "foundations",
    prompt:
      "Do you have pipelines to deploy/update models in real‑world conditions?",
    whyItMatters:
      "Beyond intelligence needs strong MLOps/ops capabilities to last.",
    options: OPT_MATURITY,
  },
  {
    id: "to-intelligence-and-beyond__03",
    targetTrendIds: ["to-intelligence-and-beyond"],
    dimension: "balance",
    prompt:
      "Have you defined fail‑safe mechanisms if the intelligence gets it wrong?",
    whyItMatters:
      "When AI acts in the real world, safety and accountability must be designed in.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Applications Unleashed ───────────────────────────
  {
    id: "honey-i-shrunk__01",
    targetTrendIds: ["honey-i-shrunk"],
    dimension: "foundations",
    prompt:
      "Is your application architecture modularized (API‑first, components, services) to evolve quickly?",
    whyItMatters:
      "Shrinking applications accelerates change and reduces legacy drag.",
    options: OPT_MATURITY,
  },
  {
    id: "honey-i-shrunk__02",
    targetTrendIds: ["honey-i-shrunk"],
    dimension: "execution",
    prompt:
      "Do you have a developer platform/CI‑CD that makes this modularity truly productive?",
    whyItMatters:
      "Without a platform, modularity can become unmanaged complexity.",
    options: OPT_MATURITY,
  },
  {
    id: "honey-i-shrunk__03",
    targetTrendIds: ["honey-i-shrunk"],
    dimension: "balance",
    prompt:
      "Do you have rules to avoid complexity explosion (standards, observability, governance)?",
    whyItMatters:
      "The more modular it gets, the more standards become essential.",
    options: OPT_GOV,
  },

  {
    id: "when-code-goes-know__01",
    targetTrendIds: ["when-code-goes-know"],
    dimension: "execution",
    prompt:
      "Does your code embed business knowledge (rules, decisions, patterns) in an explicit and maintainable way?",
    whyItMatters:
      "Code becomes a knowing asset — not just an executing one.",
    options: OPT_CLARITY,
  },
  {
    id: "when-code-goes-know__02",
    targetTrendIds: ["when-code-goes-know"],
    dimension: "foundations",
    prompt:
      "Do you have knowledge artifacts (living docs, tests, catalogs) to prevent knowledge loss?",
    whyItMatters:
      "Without capitalization, knowledge dissolves release after release.",
    options: OPT_MATURITY,
  },
  {
    id: "when-code-goes-know__03",
    targetTrendIds: ["when-code-goes-know"],
    dimension: "balance",
    prompt:
      "Have you planned how to control/justify automated decisions made by code/AI?",
    whyItMatters:
      "The more code decides, the more transparency and auditability matter.",
    options: OPT_RISK,
  },

  {
    id: "chat-is-the-new-super-app__01",
    targetTrendIds: ["chat-is-the-new-super-app"],
    dimension: "execution",
    prompt:
      "Could your project be consumed via a single conversational interface rather than multiple screens?",
    whyItMatters:
      "Chat can become the universal UI… if the orchestration behind it is solid.",
    options: OPT_CLARITY,
  },
  {
    id: "chat-is-the-new-super-app__02",
    targetTrendIds: ["chat-is-the-new-super-app"],
    dimension: "foundations",
    prompt:
      "Are your services composable (actions, APIs, tools) so they can be driven from a conversational interface?",
    whyItMatters:
      "A chat super app relies on well‑factored, action‑ready services.",
    options: OPT_MATURITY,
  },
  {
    id: "chat-is-the-new-super-app__03",
    targetTrendIds: ["chat-is-the-new-super-app"],
    dimension: "balance",
    prompt:
      "Have you framed security: access, permissions and logging for actions triggered via chat?",
    whyItMatters:
      "If chat executes, it must meet the same constraints as a critical application.",
    options: OPT_RISK,
  },

  {
    id: "app-robot__01",
    targetTrendIds: ["app-robot"],
    dimension: "execution",
    prompt:
      "Is your application designed to act (workflows, robots, agents) rather than only display/collect information?",
    whyItMatters:
      "The key shift: from application as a tool to application as an actor.",
    options: OPT_CLARITY,
  },
  {
    id: "app-robot__02",
    targetTrendIds: ["app-robot"],
    dimension: "foundations",
    prompt:
      "Do you have reliable interfaces and events to trigger/observe these automated actions?",
    whyItMatters:
      "A software robot without observability quickly becomes unmanageable.",
    options: OPT_MATURITY,
  },
  {
    id: "app-robot__03",
    targetTrendIds: ["app-robot"],
    dimension: "balance",
    prompt:
      "Have you planned human supervision, boundaries, and rollback mechanisms?",
    whyItMatters:
      "If the app acts, you must control the blast radius and accountability.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Balance by Design ───────────────────────────
  {
    id: "technology-business__01",
    targetTrendIds: ["technology-business"],
    dimension: "foundations",
    prompt:
      "Is business value “coded” into the solution (KPIs, decision loops, trade‑offs) rather than described alongside it?",
    whyItMatters:
      "TechnoVision pushes unity: business and IT move together, continuously.",
    options: OPT_CLARITY,
  },
  {
    id: "technology-business__02",
    targetTrendIds: ["technology-business"],
    dimension: "execution",
    prompt:
      "Do business and tech teams share a common rhythm (backlog, priorities, decisions)?",
    whyItMatters:
      "Without synchronization you align; with synchronization you unify.",
    options: OPT_GOV,
  },
  {
    id: "technology-business__03",
    targetTrendIds: ["technology-business"],
    dimension: "balance",
    prompt:
      "Do you have a clear mechanism to arbitrate value vs risk vs time when tensions rise?",
    whyItMatters:
      "Unity requires explicit trade‑offs — not implicit compromises.",
    options: OPT_GOV,
  },

  {
    id: "we-augment__01",
    targetTrendIds: ["we-augment"],
    dimension: "execution",
    prompt:
      "Is automation designed to augment teams (quality, speed, focus) rather than replace them?",
    whyItMatters:
      "Sustainable gains come from augmentation: keep humans on judgment and value.",
    options: OPT_CLARITY,
  },
  {
    id: "we-augment__02",
    targetTrendIds: ["we-augment"],
    dimension: "balance",
    prompt:
      "Have you defined where humans must remain in the loop (approvals, exceptions, critical decisions)?",
    whyItMatters:
      "Hands‑free ambition still requires governance: humans own the “why”.",
    options: OPT_GOV,
  },
  {
    id: "we-augment__03",
    targetTrendIds: ["we-augment"],
    dimension: "foundations",
    prompt:
      "Do you have data/indicators to measure the real effect of augmentation (quality, workload, satisfaction)?",
    whyItMatters:
      "Without measurement, augmentation becomes a feeling — not a strategy.",
    options: OPT_MATURITY,
  },

  {
    id: "do-good-do-less-do-well__01",
    targetTrendIds: ["do-good-do-less-do-well"],
    dimension: "balance",
    prompt:
      'Have you defined what “do better with less” means for this project (scope, sobriety, impacts)?',
    whyItMatters:
      "This principle turns impact into concrete decisions, not slogans.",
    options: OPT_CLARITY,
  },
  {
    id: "do-good-do-less-do-well__02",
    targetTrendIds: ["do-good-do-less-do-well"],
    dimension: "execution",
    prompt:
      "Have you already embedded optimization levers (data, compute, simplification) into delivery?",
    whyItMatters:
      "Sobriety is won in design and execution — not added at the end.",
    options: OPT_MATURITY,
  },
  {
    id: "do-good-do-less-do-well__03",
    targetTrendIds: ["do-good-do-less-do-well"],
    dimension: "foundations",
    prompt:
      "Do you track indicators to monitor cost/footprint/efficiency across releases?",
    whyItMatters:
      "Measurement enables informed trade‑offs and continuous progress.",
    options: OPT_MATURITY,
  },

  {
    id: "be-like-water__01",
    targetTrendIds: ["be-like-water"],
    dimension: "execution",
    prompt:
      "Is your project organization able to adapt quickly (priorities, dependencies, changes)?",
    whyItMatters:
      "Real agility is a property of the organization, not just a method.",
    options: OPT_GOV,
  },
  {
    id: "be-like-water__02",
    targetTrendIds: ["be-like-water"],
    dimension: "foundations",
    prompt:
      "Do your architecture and standards allow change without breaking (compatibility, modularity, contracts)?",
    whyItMatters:
      "Being like water requires foundations that absorb motion.",
    options: OPT_CLARITY,
  },
  {
    id: "be-like-water__03",
    targetTrendIds: ["be-like-water"],
    dimension: "balance",
    prompt:
      "Have you defined guardrails (security, quality, compliance) so adaptation remains controlled?",
    whyItMatters:
      "Fluidity without guardrails creates chaos — balance matters.",
    options: OPT_RISK,
  },

  {
    id: "trust-thrust__01",
    targetTrendIds: ["trust-thrust"],
    dimension: "balance",
    prompt:
      'Do you have a “trust by design” strategy (security, privacy, traceability) embedded from day one?',
    whyItMatters:
      "Without trust, adoption plateaus and scaling becomes impossible.",
    options: OPT_RISK,
  },
  {
    id: "trust-thrust__02",
    targetTrendIds: ["trust-thrust"],
    dimension: "execution",
    prompt:
      "Are audit and proof mechanisms (logs, decisions, access) operational and usable?",
    whyItMatters:
      "Trust is demonstrated: documented, measured and evidenced.",
    options: OPT_MATURITY,
  },
  {
    id: "trust-thrust__03",
    targetTrendIds: ["trust-thrust"],
    dimension: "foundations",
    prompt:
      "Are your foundations (identity, data, infrastructure) consistent with “critical‑grade” requirements?",
    whyItMatters:
      "Trust is not a layer — it is a property of the foundation.",
    options: OPT_CLARITY,
  },

  // ─────────────────────────── Process on the Fly ───────────────────────────
  {
    id: "whole-lotta-fusion__01",
    targetTrendIds: ["whole-lotta-fusion"],
    dimension: "execution",
    prompt:
      "Do your processes assemble dynamically (events, AI, orchestration) based on context?",
    whyItMatters:
      "Fusion moves you from rigid workflows to adaptive flows.",
    options: OPT_CLARITY,
  },
  {
    id: "whole-lotta-fusion__02",
    targetTrendIds: ["whole-lotta-fusion"],
    dimension: "foundations",
    prompt:
      "Do you have an event/integration architecture that supports these dynamic assemblies?",
    whyItMatters:
      "Without robust events and integration, fusion stays conceptual.",
    options: OPT_MATURITY,
  },
  {
    id: "whole-lotta-fusion__03",
    targetTrendIds: ["whole-lotta-fusion"],
    dimension: "balance",
    prompt:
      "Have you defined how to control and audit processes that change in real time?",
    whyItMatters:
      "Adaptive flows require stronger governance and observability.",
    options: OPT_RISK,
  },

  {
    id: "micro-process-magic__01",
    targetTrendIds: ["micro-process-magic"],
    dimension: "execution",
    prompt:
      "Do you break processes into reusable micro‑components rather than large end‑to‑end workflows?",
    whyItMatters:
      "Micro‑processes enable faster evolution and targeted optimization.",
    options: OPT_MATURITY,
  },
  {
    id: "micro-process-magic__02",
    targetTrendIds: ["micro-process-magic"],
    dimension: "foundations",
    prompt:
      "Do you have a clear registry (catalog) of micro‑processes and their contracts?",
    whyItMatters:
      "The magic comes from reuse — otherwise you rebuild spaghetti.",
    options: OPT_MATURITY,
  },
  {
    id: "micro-process-magic__03",
    targetTrendIds: ["micro-process-magic"],
    dimension: "balance",
    prompt:
      "Do you have quality/observability standards to avoid micro‑process debt?",
    whyItMatters:
      "Small does not mean rule‑free — otherwise complexity explodes.",
    options: OPT_GOV,
  },

  {
    id: "ctrl-alt-human__01",
    targetTrendIds: ["ctrl-alt-human"],
    dimension: "balance",
    prompt:
      "Do critical decisions remain under human control (exceptions, trade‑offs, ethics)?",
    whyItMatters:
      "Automation should amplify humans — not switch them off.",
    options: OPT_GOV,
  },
  {
    id: "ctrl-alt-human__02",
    targetTrendIds: ["ctrl-alt-human"],
    dimension: "execution",
    prompt:
      "Have you planned efficient moments of human intervention (not heavy committees)?",
    whyItMatters:
      "Human‑in‑the‑loop must stay fluid to preserve speed.",
    options: OPT_CLARITY,
  },
  {
    id: "ctrl-alt-human__03",
    targetTrendIds: ["ctrl-alt-human"],
    dimension: "foundations",
    prompt:
      "Do you have the signals (observability) that enable humans to decide at the right time?",
    whyItMatters:
      "You can only control well what you can see well.",
    options: OPT_MATURITY,
  },

  {
    id: "autonomous-enterprise__01",
    targetTrendIds: ["autonomous-enterprise"],
    dimension: "execution",
    prompt:
      "Does your project aim for self‑optimizing operations (detect, decide, act) without constant intervention?",
    whyItMatters:
      "Autonomy changes scale: less micro‑management, more performance.",
    options: OPT_CLARITY,
  },
  {
    id: "autonomous-enterprise__02",
    targetTrendIds: ["autonomous-enterprise"],
    dimension: "foundations",
    prompt:
      "Do you have strong observability (metrics, logs, traces) to govern autonomy?",
    whyItMatters:
      "Autonomy requires full visibility into what the system is doing.",
    options: OPT_MATURITY,
  },
  {
    id: "autonomous-enterprise__03",
    targetTrendIds: ["autonomous-enterprise"],
    dimension: "balance",
    prompt:
      "Have you defined limits: what the system can do alone vs what must be approved?",
    whyItMatters:
      "Autonomous does not mean uncontrolled — trust must be engineered.",
    options: OPT_RISK,
  },

  // ─────────────────────────── Nature’s Code ───────────────────────────
  {
    id: "my-chemical-advance__01",
    targetTrendIds: ["my-chemical-advance"],
    dimension: "execution",
    prompt:
      "Is your project impacted by materials/energy/batteries/chemical safety constraints?",
    whyItMatters:
      "This trend signals a chemistry/energy innovation wave reshaping products and systems.",
    options: OPT_CLARITY,
  },
  {
    id: "my-chemical-advance__02",
    targetTrendIds: ["my-chemical-advance"],
    dimension: "foundations",
    prompt:
      "Have you identified dependencies (suppliers, standards, industrialization) linked to these choices?",
    whyItMatters:
      "Chemistry imposes strong constraints: supply, regulation, certification.",
    options: OPT_RISK,
  },
  {
    id: "my-chemical-advance__03",
    targetTrendIds: ["my-chemical-advance"],
    dimension: "balance",
    prompt:
      "Are environmental and safety impacts of these choices assessed and documented?",
    whyItMatters:
      "Material innovation increases responsibility — and scrutiny.",
    options: OPT_RISK,
  },

  {
    id: "language-of-life__01",
    targetTrendIds: ["language-of-life"],
    dimension: "execution",
    prompt:
      "Does your project explore innovations inspired by life (bio, biotech, health, biomimicry)?",
    whyItMatters:
      "Life becomes a reference for innovation — beyond software alone.",
    options: OPT_CLARITY,
  },
  {
    id: "language-of-life__02",
    targetTrendIds: ["language-of-life"],
    dimension: "foundations",
    prompt:
      "Have you identified IP/regulatory constraints if you touch “bio” domains?",
    whyItMatters:
      "This terrain creates opportunity… and new constraints.",
    options: OPT_RISK,
  },
  {
    id: "language-of-life__03",
    targetTrendIds: ["language-of-life"],
    dimension: "balance",
    prompt:
      "Have you framed ethics and acceptability (stakeholders, transparency) if life‑related domains are involved?",
    whyItMatters:
      "Trust and ethics are central as soon as life enters the equation.",
    options: OPT_RISK,
  },

  {
    id: "paint-it-light__01",
    targetTrendIds: ["paint-it-light"],
    dimension: "execution",
    prompt:
      "Does your project depend on communication or compute speed/efficiency (networks, data centers, sensors)?",
    whyItMatters:
      "Photonics can reshape performance and energy consumption.",
    options: OPT_CLARITY,
  },
  {
    id: "paint-it-light__02",
    targetTrendIds: ["paint-it-light"],
    dimension: "foundations",
    prompt:
      "Have you evaluated technology options (hardware, integration, suppliers) that could change the game?",
    whyItMatters:
      "This trend invites you to consider hardware ruptures often underestimated.",
    options: OPT_CLARITY,
  },
  {
    id: "paint-it-light__03",
    targetTrendIds: ["paint-it-light"],
    dimension: "balance",
    prompt:
      "Are performance/energy choices explicitly arbitrated (sobriety vs speed)?",
    whyItMatters:
      "Performance is not free — TechnoVision pushes conscious trade‑offs.",
    options: OPT_GOV,
  },

  {
    id: "mind-over-machine__01",
    targetTrendIds: ["mind-over-machine"],
    dimension: "execution",
    prompt:
      "Does your project explore interfaces beyond screens (sensors, signals, intent)?",
    whyItMatters:
      "This trend questions the next rupture in human‑machine interaction.",
    options: OPT_CLARITY,
  },
  {
    id: "mind-over-machine__02",
    targetTrendIds: ["mind-over-machine"],
    dimension: "balance",
    prompt:
      "Have you anticipated sensitive topics: consent, privacy, misinterpretation risks?",
    whyItMatters:
      "The closer you get to human signals, the more fragile trust becomes.",
    options: OPT_RISK,
  },
  {
    id: "mind-over-machine__03",
    targetTrendIds: ["mind-over-machine"],
    dimension: "foundations",
    prompt:
      "Do you have the skills/partners required if you move toward advanced sensing?",
    whyItMatters:
      "TechnoVision also helps identify which expertise to mobilize.",
    options: OPT_CLARITY,
  },

  // ─────────────────────────── Invisible Infostructure ───────────────────────────
  {
    id: "cloud-encounters__01",
    targetTrendIds: ["cloud-encounters"],
    dimension: "foundations",
    prompt:
      "Does your cloud strategy account for sovereignty, sustainability, and multi‑cloud/hybrid mix?",
    whyItMatters:
      "Cloud “3.0” combines performance, compliance, sovereignty and sobriety.",
    options: OPT_CLARITY,
  },
  {
    id: "cloud-encounters__02",
    targetTrendIds: ["cloud-encounters"],
    dimension: "execution",
    prompt:
      "Are your cloud operations industrialized (IaC, FinOps, security, automation)?",
    whyItMatters:
      "Cloud value comes from operations — not just deployment.",
    options: OPT_MATURITY,
  },
  {
    id: "cloud-encounters__03",
    targetTrendIds: ["cloud-encounters"],
    dimension: "balance",
    prompt:
      "Have you clarified architecture rules to avoid dispersion, shadow IT and cost drift?",
    whyItMatters:
      "Without governance, cloud amplifies complexity instead of absorbing it.",
    options: OPT_GOV,
  },

  {
    id: "everything-everywhere__01",
    targetTrendIds: ["everything-everywhere"],
    dimension: "foundations",
    prompt:
      "Does your project depend on strong connectivity across sites, systems, things and partners?",
    whyItMatters:
      "When everything is connected, infrastructure becomes a strategic asset.",
    options: OPT_CLARITY,
  },
  {
    id: "everything-everywhere__02",
    targetTrendIds: ["everything-everywhere"],
    dimension: "execution",
    prompt:
      "Have you planned adequate network resilience (redundancy, monitoring, continuity plans)?",
    whyItMatters:
      "Hyper‑connectivity amplifies outages too — resilience becomes key.",
    options: OPT_MATURITY,
  },
  {
    id: "everything-everywhere__03",
    targetTrendIds: ["everything-everywhere"],
    dimension: "balance",
    prompt:
      "Have you assessed risks: security, vendor dependency, and sovereignty of flows?",
    whyItMatters:
      "Connecting everything also exposes more — guardrails matter.",
    options: OPT_RISK,
  },

  {
    id: "simply-the-edge__01",
    targetTrendIds: ["simply-the-edge"],
    dimension: "foundations",
    prompt:
      "Does your project need compute close to the field (latency, continuity, cost, confidentiality)?",
    whyItMatters:
      "Edge redistributes where intelligence lives — and changes architecture choices.",
    options: OPT_CLARITY,
  },
  {
    id: "simply-the-edge__02",
    targetTrendIds: ["simply-the-edge"],
    dimension: "execution",
    prompt:
      "Do you have an edge deployment/maintenance strategy (updates, monitoring, security) for on‑site environments?",
    whyItMatters:
      "Edge is an operational product — without ops, it will not sustain.",
    options: OPT_MATURITY,
  },
  {
    id: "simply-the-edge__03",
    targetTrendIds: ["simply-the-edge"],
    dimension: "balance",
    prompt:
      "Are physical safety/security concerns of edge equipment addressed?",
    whyItMatters:
      "Edge lives in the real world — threats are physical too.",
    options: OPT_RISK,
  },

  {
    id: "ok-qompute__01",
    targetTrendIds: ["ok-qompute"],
    dimension: "foundations",
    prompt:
      "Is your project constrained by compute capacity (AI, optimization, real time, simulation)?",
    whyItMatters:
      "This trend points to a shift in computing architectures and possibilities.",
    options: OPT_CLARITY,
  },
  {
    id: "ok-qompute__02",
    targetTrendIds: ["ok-qompute"],
    dimension: "execution",
    prompt:
      "Have you explored compute architecture options (GPUs, accelerators, hybrid patterns) suited to your use case?",
    whyItMatters:
      "Compute becomes a design choice — it must be architected, not assumed.",
    options: OPT_CLARITY,
  },
  {
    id: "ok-qompute__03",
    targetTrendIds: ["ok-qompute"],
    dimension: "balance",
    prompt:
      "Is compute energy efficiency/cost an explicit trade‑off criterion for your project?",
    whyItMatters:
      "More compute means more cost/footprint — TechnoVision pushes conscious arbitration.",
    options: OPT_GOV,
  },
];