export function mapToArray(map: Map<string, string>) {
  return Array.from(map, ([key, value]) => ({ label: value, value: key }))
}
