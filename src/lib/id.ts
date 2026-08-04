let counter = 0;

/** Client-side unique id for cart lines / saved designs — not a stable database id. */
export function generateId(prefix: string) {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}
