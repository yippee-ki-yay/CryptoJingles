export const EXPLORE_JINGLES_PER_PAGE = 10;

export const EXPLORE_FILTER_OPTIONS = [
  { value: 1, label: 'Version 1' },
  { value: 0, label: 'Version 0' },
  { value: 2, label: 'OG Jingles' },
  { value: 3, label: 'New Jingles' },
];

export const EXPLORE_SORTING_OPTIONS = [
  { value: '-jingleId', label: 'Highest ID first' }, // Newest first
  { value: 'jingleId', label: 'Lowest ID first' }, // Oldest first
];
