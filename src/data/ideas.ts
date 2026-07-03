/**
 * Ideas from the lab — broad product directions (no product names, no statuses).
 * Future: replace this static array with a fetch from a Workers/D1 endpoint
 * without touching the component markup.
 */
export interface IdeaDirection {
  /** stable identifier for future backend mapping */
  id: string;
  title: string;
  description: string;
  /** small geometric marker beside the card title (direction 1c) */
  marker: { shape: 'hex' | 'dot' | 'square' | 'diamond'; color: 'honey' | 'clay' | 'green' };
}

export const ideaDirections: IdeaDirection[] = [
  {
    id: 'family-school',
    title: 'Family life & school rhythm',
    description:
      'For routines, activities, meals, school moments and daily household coordination.',
    marker: { shape: 'hex', color: 'honey' },
  },
  {
    id: 'group-events',
    title: 'Group planning & events',
    description:
      'For decisions, shared tasks, notes, timelines, photos and moments that groups need to organise together.',
    marker: { shape: 'dot', color: 'clay' },
  },
  {
    id: 'service-business',
    title: 'Small service businesses',
    description:
      'For coaches, tutors, creators and independent professionals who need simpler ways to manage clients, bookings and progress.',
    marker: { shape: 'square', color: 'green' },
  },
  {
    id: 'home-decisions',
    title: 'Home & shared decisions',
    description:
      'For households that need a calmer way to plan tasks, compare options and make decisions together.',
    marker: { shape: 'diamond', color: 'clay' },
  },
  {
    id: 'learning-growth',
    title: 'Learning & personal growth',
    description:
      'For goals, habits, study plans, practice routines and self-improvement journeys.',
    marker: { shape: 'hex', color: 'green' },
  },
  {
    id: 'community-local',
    title: 'Community & local coordination',
    description:
      'For small groups, churches, clubs, neighbourhoods and communities that need lightweight ways to organise people, activities and shared responsibilities.',
    marker: { shape: 'dot', color: 'honey' },
  },
];
