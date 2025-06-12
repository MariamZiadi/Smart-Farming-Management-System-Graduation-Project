export function parseInterval(planString: string): number | null {
  const match = planString.match(/every (\d+) days?/i);
  return match ? parseInt(match[1]) : null;
}
