export interface User {
  id?: string,
  username?: string,
  email: string,
  password: string,
  token?: string
}

export interface SessionToken {
  value: string,
  expiryDate: number
}

export interface Profile {
  searches: Array<any>,
  heroes: Array<any>
}

export interface Environment {
  production: boolean,
  heroDbUrl: string
}
