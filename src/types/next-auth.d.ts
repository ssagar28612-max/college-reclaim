import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role: string
    department?: string | null
    coordinatorTitle?: string | null
  }

  interface Session {
    user: User & {
      id: string
      role: string
      department?: string | null
      coordinatorTitle?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    department?: string | null
    coordinatorTitle?: string | null
  }
}