/**
 * Roadmap shaped by ideas — public, simple, future-facing direction groups.
 * No internal roadmap details, no per-app development statuses.
 * Future: this can be served from a small CMS/D1 table with the same shape.
 */
export interface RoadmapGroup {
  id: string;
  label: string;
  /** column accent (direction 1c): honey = now, clay = next, sage dashed = future */
  accent: 'honey' | 'clay' | 'sage';
  items: string[];
}

export const roadmapGroups: RoadmapGroup[] = [
  {
    id: 'now',
    label: 'Now shaping',
    accent: 'honey',
    items: [
      'BeeCooLabs foundation',
      'Brand website',
      'Privacy-first product principles',
      'Early family-focused tools',
    ],
  },
  {
    id: 'next',
    label: 'Next exploring',
    accent: 'clay',
    items: [
      'Group coordination tools',
      'Event planning experiences',
      'Independent work and service tools',
      'Shared household planning',
    ],
  },
  {
    id: 'future',
    label: 'Future possibilities',
    accent: 'sage',
    items: [
      'Reusable mini-app templates',
      'Community-shaped feature voting',
      'Public product experiments',
      'Simple ways to suggest what should be built next',
    ],
  },
];
