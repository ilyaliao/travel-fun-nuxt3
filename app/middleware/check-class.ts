import { cityMap } from '~/constants'

export default defineNuxtRouteMiddleware((to) => {
  const { class: classParam, name } = to.params as { class: string, name: string }

  if (classParam !== 'country' && classParam !== 'city')
    return abortNavigation()

  if (classParam === 'city' && !cityMap.has(name))
    return abortNavigation()
})
