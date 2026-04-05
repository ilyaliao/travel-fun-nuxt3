declare module '#auth-utils' {
  interface User {
    id: number
    email: string
    name: string
  }

  interface UserSession {
    loggedInAt: number
  }
}

declare module 'nuxt-auth-utils' {
  interface User {
    id: number
    email: string
    name: string
  }
}

export {}
