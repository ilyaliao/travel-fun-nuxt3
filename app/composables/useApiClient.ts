export function useApiClient() {
  const config = useRuntimeConfig()
  const { apiBase, apiSecret } = config.public

  const baseURL = `${apiBase}/api/${apiSecret}`
  const authBaseURL = apiBase as string

  function getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {}
    const token = useCookie('token').value
    if (token)
      headers.Authorization = token
    return headers
  }

  async function apiFetch<T>(
    url: string,
    options: RequestInit & { baseURL?: string } = {},
  ): Promise<T> {
    const { baseURL: overrideBase, ...fetchOptions } = options
    return $fetch<T>(url, {
      baseURL: overrideBase || baseURL,
      headers: {
        ...getHeaders(),
        ...(fetchOptions.headers as Record<string, string>),
      },
      ...fetchOptions,
    })
  }

  return {
    get: <T>(url: string, options?: any) => apiFetch<T>(url, { method: 'GET', ...options }),
    post: <T>(url: string, body?: any, options?: any) =>
      apiFetch<T>(url, { method: 'POST', body, ...options }),
    put: <T>(url: string, body?: any, options?: any) =>
      apiFetch<T>(url, { method: 'PUT', body, ...options }),
    delete: <T>(url: string, body?: any, options?: any) =>
      apiFetch<T>(url, { method: 'DELETE', body, ...options }),
    authFetch: <T>(url: string, options?: any) =>
      apiFetch<T>(url, { baseURL: authBaseURL, ...options }),
  }
}
