export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/booking')
    return abortNavigation()
})
