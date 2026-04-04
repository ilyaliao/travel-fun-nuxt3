import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useDevice() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smallerOrEqual('sm')
  return { isMobile }
}
