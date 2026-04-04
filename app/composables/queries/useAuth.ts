import { useMutation } from '@tanstack/vue-query'

export function useSignIn() {
  return useMutation({
    mutationFn: (body: { email: string, password: string }) =>
      $fetch('/api/auth/login', { method: 'POST', body }),
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (body: { email: string, password: string, name?: string }) =>
      $fetch('/api/auth/register', { method: 'POST', body }),
  })
}

export function useLogout() {
  return useMutation({
    mutationFn: () => $fetch('/api/auth/logout', { method: 'POST' }),
  })
}
