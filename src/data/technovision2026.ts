export interface Container {
  id: string;
  name: string;
  accentColor: string;
  dimensionWeights: {
    foundations: number;
    execution: number;
    balance: number;
  };
}

export interface Trend {
  id: string;
  name: string;
  containerId: string;
}

export const CONTAINERS: Container[] = [
  {
    id: 'you-experience',
    name: 'You Experience',
    accentColor: '#E91E8C',
    dimensionWeights: { foundations: 0.4, execution: 0.4, balance: 0.2 },
  },
  {
    id: 'we-collaborate',
    name: 'We Collaborate',
    accentColor: '#9C27B0',
    dimensionWeights: { foundations: 0.3, execution: 0.5, balance: 0.2 },
  },
  {
    id: 'thriving-on-data',
    name: 'Thriving on Data',
    accentColor: '#FF5722',
    dimensionWeights: { foundations: 0.5, execution: 0.3, balance: 0.2 },
  },
  {
    id: 'physical-matters',
    name: 'Physical Matters',
    accentColor: '#4CAF50',
    dimensionWeights: { foundations: 0.4, execution: 0.4, balance: 0.2 },
  },
  {
    id: 'applications-unleashed',
    name: 'Applications Unleashed',
    accentColor: '#FF9800',
    dimensionWeights: { foundations: 0.3, execution: 0.5, balance: 0.2 },
  },
  {
    id: 'balance-by-design',
    name: 'Balance by Design',
    accentColor: '#12ABDB',
    dimensionWeights: { foundations: 0.1, execution: 0.2, balance: 0.7 },
  },
  {
    id: 'process-on-the-fly',
    name: 'Process on the Fly',
    accentColor: '#FF6B35',
    dimensionWeights: { foundations: 0.3, execution: 0.5, balance: 0.2 },
  },
  {
    id: 'natures-code',
    name: "Nature's Code",
    accentColor: '#66BB6A',
    dimensionWeights: { foundations: 0.4, execution: 0.3, balance: 0.3 },
  },
  {
    id: 'invisible-infostructure',
    name: 'Invisible Infostructure',
    accentColor: '#0070AD',
    dimensionWeights: { foundations: 0.5, execution: 0.3, balance: 0.2 },
  },
];

export const TRENDS: Trend[] = [
  // You Experience
  { id: 'face-to-interface', name: 'Face to Interface', containerId: 'you-experience' },
  { id: 'youre-something-spatial', name: "You're Something Spatial", containerId: 'you-experience' },
  { id: 'internet-of-twins', name: 'Internet of Twins', containerId: 'you-experience' },
  { id: 'knowing-me-knowing-ux', name: 'Knowing Me, Knowing U(X)', containerId: 'you-experience' },

  // We Collaborate
  { id: 'my-identity-my-business', name: 'My Identity, My Business', containerId: 'we-collaborate' },
  { id: 'autonomous-agent-alliance', name: 'Autonomous Agent Alliance', containerId: 'we-collaborate' },
  { id: 'synergy2', name: 'Synergy2', containerId: 'we-collaborate' },
  { id: 'economy-of-things', name: 'Economy of Things', containerId: 'we-collaborate' },

  // Thriving on Data
  { id: 'data-sharing-is-caring', name: 'Data Sharing is Caring (But Take Care!)', containerId: 'thriving-on-data' },
  { id: 'ai-meshed-up', name: 'AI Meshed Up', containerId: 'thriving-on-data' },
  { id: 'net-zero-data', name: 'Net Ø Data', containerId: 'thriving-on-data' },
  { id: 'the-thing-with-data', name: 'The Thing with Data', containerId: 'thriving-on-data' },

  // Physical Matters
  { id: 'material-world', name: 'Material World', containerId: 'physical-matters' },
  { id: 'mission-adaptable', name: 'Mission: Adaptable', containerId: 'physical-matters' },
  { id: 'terminal-velocity', name: 'Terminal Velocity', containerId: 'physical-matters' },
  { id: 'to-intelligence-and-beyond', name: 'To Intelligence... and Beyond!', containerId: 'physical-matters' },

  // Applications Unleashed
  { id: 'honey-i-shrunk', name: 'Honey, I Shrunk the Applications', containerId: 'applications-unleashed' },
  { id: 'when-code-goes-know', name: 'When Code Goes Know', containerId: 'applications-unleashed' },
  { id: 'chat-is-the-new-super-app', name: 'Chat is the New Super App', containerId: 'applications-unleashed' },
  { id: 'app-robot', name: 'App = A Robot', containerId: 'applications-unleashed' },

  // Balance by Design
  { id: 'technology-business', name: 'Technology ε∍ Business', containerId: 'balance-by-design' },
  { id: 'we-augment', name: 'WE augment!', containerId: 'balance-by-design' },
  { id: 'do-good-do-less-do-well', name: 'Do Good, Do Less, Do Well', containerId: 'balance-by-design' },
  { id: 'be-like-water', name: 'Be Like Water', containerId: 'balance-by-design' },
  { id: 'trust-thrust', name: 'Trust Thrust', containerId: 'balance-by-design' },

  // Process on the Fly
  { id: 'whole-lotta-fusion', name: 'Whole Lotta Fusion', containerId: 'process-on-the-fly' },
  { id: 'micro-process-magic', name: 'Micro Process Magic', containerId: 'process-on-the-fly' },
  { id: 'ctrl-alt-human', name: 'CTRL-ALT-Human', containerId: 'process-on-the-fly' },
  { id: 'autonomous-enterprise', name: 'Autonomous Enterprise', containerId: 'process-on-the-fly' },

  // Nature's Code
  { id: 'my-chemical-advance', name: 'My Chemical Advance', containerId: 'natures-code' },
  { id: 'language-of-life', name: 'Language of Life', containerId: 'natures-code' },
  { id: 'paint-it-light', name: 'Paint it Light', containerId: 'natures-code' },
  { id: 'mind-over-machine', name: 'Mind over Machine', containerId: 'natures-code' },

  // Invisible Infostructure
  { id: 'cloud-encounters', name: 'Cloud Encounters of the Third Kind', containerId: 'invisible-infostructure' },
  { id: 'everything-everywhere', name: 'Everything, Everywhere, All At Once Connected', containerId: 'invisible-infostructure' },
  { id: 'simply-the-edge', name: 'Simply the Edge', containerId: 'invisible-infostructure' },
  { id: 'ok-qompute', name: 'Ok Qompute!', containerId: 'invisible-infostructure' },
];

// Sector → suggested trend IDs
export const SECTOR_SUGGESTIONS: Record<string, string[]> = {
  'Public': ['we-augment', 'trust-thrust', 'ctrl-alt-human', 'do-good-do-less-do-well'],
  'Financial Services': ['my-identity-my-business', 'trust-thrust', 'be-like-water', 'data-sharing-is-caring'],
  'Manufacturing': ['material-world', 'mission-adaptable', 'internet-of-twins', 'we-augment'],
  'Energy & Utilities': ['net-zero-data', 'terminal-velocity', 'do-good-do-less-do-well', 'we-augment'],
  'Retail / CPG': ['chat-is-the-new-super-app', 'economy-of-things', 'knowing-me-knowing-ux', 'trust-thrust'],
  'Telco / Media': ['everything-everywhere', 'simply-the-edge', 'face-to-interface', 'we-augment'],
  'Cross-industry': ['ai-meshed-up', 'autonomous-agent-alliance', 'we-augment', 'technology-business'],
};

// Nature → suggested trend IDs
export const NATURE_SUGGESTIONS: Record<string, string[]> = {
  'BUILD': ['when-code-goes-know', 'app-robot', 'autonomous-enterprise'],
  'BUILD / RUN': ['micro-process-magic', 'ctrl-alt-human', 'mission-adaptable'],
  'TMA': ['honey-i-shrunk', 'whole-lotta-fusion', 'be-like-water'],
};

export function suggestTrends(sector: string, nature: string): string[] {
  const sectorList = SECTOR_SUGGESTIONS[sector] ?? [];
  const natureList = NATURE_SUGGESTIONS[nature] ?? [];

  const combined: string[] = [];
  const seen = new Set<string>();

  const add = (id: string) => {
    if (!seen.has(id) && TRENDS.find(t => t.id === id)) {
      seen.add(id);
      combined.push(id);
    }
  };

  sectorList.slice(0, 2).forEach(add);
  natureList.slice(0, 1).forEach(add);

  // Ensure at least 1 Balance by Design trend
  const hasBalance = combined.some(id => {
    const t = TRENDS.find(tr => tr.id === id);
    return t?.containerId === 'balance-by-design';
  });

  if (!hasBalance) {
    const fallback = sectorList.find(id => {
      const t = TRENDS.find(tr => tr.id === id);
      return t?.containerId === 'balance-by-design';
    }) ?? 'trust-thrust';
    add(fallback);
  }

  // Pad to 3 if needed with random non-duplicate trends
  if (combined.length < 3) {
    for (const t of TRENDS) {
      if (!seen.has(t.id)) {
        add(t.id);
        if (combined.length >= 3) break;
      }
    }
  }

  return combined.slice(0, 3);
}

export function getContainer(containerId: string): Container {
  return CONTAINERS.find(c => c.id === containerId) ?? CONTAINERS[0];
}

export function getTrend(trendId: string): Trend | undefined {
  return TRENDS.find(t => t.id === trendId);
}
