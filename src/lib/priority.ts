export const PRIORITY_ORDER = {
  High: 1,
  Medium: 2,
  Low: 3,
} as const;

export type Priority = keyof typeof PRIORITY_ORDER;