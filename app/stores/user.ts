export const useUserStore = defineStore('user', () => {
  const loginStatus = ref(false)
  const tokenCookie = useCookie('token')

  const getToken = computed(() => (loginStatus.value ? tokenCookie.value : null))

  function setToken(token: string, _expired: number) {
    tokenCookie.value = token
    loginStatus.value = true
  }

  function clearToken() {
    tokenCookie.value = null
    loginStatus.value = false
  }

  return {
    getToken,
    loginStatus,
    setToken,
    clearToken,
  }
})
