/**
 * Why BeeCooLabs exists — the principles behind the lab.
 */
export interface Principle {
  id: string;
  title: string;
  description: string;
}

export const principles: Principle[] = [
  {
    id: 'domain-first',
    title: 'Domain-first',
    description: 'Built around real-life areas, not random feature lists.',
  },
  {
    id: 'focused-super-apps',
    title: 'Super apps, but focused',
    description: 'Multiple related tools in one simple place.',
  },
  {
    id: 'privacy-default',
    title: 'Privacy by default',
    description: 'Collect less, explain more, avoid unnecessary accounts where possible.',
  },
  {
    id: 'community-shaped',
    title: 'Community-shaped',
    description: 'Ideas, feedback and real use should influence what gets built.',
  },
  {
    id: 'built-small',
    title: 'Built small, improved often',
    description: 'Launch useful things early, then improve from real needs.',
  },
];
