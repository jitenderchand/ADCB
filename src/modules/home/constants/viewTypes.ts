export const VIEW_TYPES = {
  MAP: "map",
  GRID: "grid",
} as const;

export type ViewType = typeof VIEW_TYPES.MAP | typeof VIEW_TYPES.GRID;

