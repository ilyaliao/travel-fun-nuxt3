import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

type FetchOptions = NitroFetchOptions<NitroFetchRequest>

export function useApiClient() {
  const { apiBase, apiSecret } = useRuntimeConfig().public

  const baseURL = `${apiBase}/api/${apiSecret}`
  const authBaseURL = apiBase as string

  function apiFetch<T>(url: string, options: FetchOptions = {}) {
    const token = useCookie('token').value
    return $fetch<T>(url, {
      baseURL,
      ...options,
      headers: {
        ...(token ? { Authorization: token } : {}),
        ...options.headers,
      },
    })
  }

  return {
    get: <T>(url: string, options?: FetchOptions) =>
      apiFetch<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body?: FetchOptions['body'], options?: FetchOptions) =>
      apiFetch<T>(url, { ...options, method: 'POST', body }),
    put: <T>(url: string, body?: FetchOptions['body'], options?: FetchOptions) =>
      apiFetch<T>(url, { ...options, method: 'PUT', body }),
    delete: <T>(url: string, body?: FetchOptions['body'], options?: FetchOptions) =>
      apiFetch<T>(url, { ...options, method: 'DELETE', body }),
    authFetch: <T>(url: string, options?: FetchOptions) =>
      apiFetch<T>(url, { ...options, baseURL: authBaseURL }),
  }
}
