import { useMutation } from '@pinia/colada'

interface SigninRes {
  expired: number
  token: string
  uid: string
}

export function useSignIn() {
  const api = useApiClient()

  return useMutation({
    mutation: (body: { username: string, password: string }) =>
      api.authFetch<SigninRes>('admin/signin', { method: 'POST', body }),
  })
}

export function useLogout() {
  const api = useApiClient()

  return useMutation({
    mutation: () => api.authFetch('logout', { method: 'POST' }),
  })
}
