import type { LogoutRes, SigninRes } from '~/types'
import { useMutation } from '@tanstack/vue-query'

export function useSignIn() {
  const api = useApiClient()

  return useMutation({
    mutationFn: (body: { username: string, password: string }) =>
      api.authFetch<SigninRes>('admin/signin', { method: 'POST', body }),
  })
}

export function useLogout() {
  const api = useApiClient()

  return useMutation({
    mutationFn: () => api.authFetch<LogoutRes>('logout', { method: 'POST' }),
  })
}
