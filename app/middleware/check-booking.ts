export default defineNuxtRouteMiddleware((to) => {
  if (to.name === 'booking')
    return abortNavigation()
})
