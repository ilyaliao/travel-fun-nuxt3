import { useMutation } from '@pinia/colada'

export function useSignIn() {
  return useMutation({
    mutation: (body: { email: string, password: string }) =>
      $fetch('/api/auth/login', { method: 'POST', body }),
  })
}

export function useRegister() {
  return useMutation({
    mutation: (body: { email: string, password: string, name?: string }) =>
      $fetch('/api/auth/register', { method: 'POST', body }),
  })
}

export function useLogout() {
  return useMutation({
    mutation: () => $fetch('/api/auth/logout', { method: 'POST' }),
  })
}
