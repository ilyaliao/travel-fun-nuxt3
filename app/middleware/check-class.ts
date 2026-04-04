import { cityMap } from '~/constants'

export default defineNuxtRouteMiddleware((to) => {
  const { class: classParam, name } = to.params as { class: string, name: string }

  if (!/^(country|city)$/.test(classParam))
    return abortNavigation()

  if (classParam === 'city' && !cityMap.has(name))
    return abortNavigation()
})
