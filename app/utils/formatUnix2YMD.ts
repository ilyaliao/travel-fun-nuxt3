export function formatUnix2YMD(unix: number): string {
  const date = new Date(unix * 1000)
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
}
