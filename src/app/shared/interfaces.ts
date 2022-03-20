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

export interface Hero {
  id: string,
  name: string,
  powerstats: {
    intelligence: string,
    strength: string,
    speed: string,
    durability: string,
    power: string,
    combat: string
  },
  biography: object,
  appearance: object,
  work: object,
  connections: object,
  image: {
    url: string
  }
}

export interface Powerup {
  name: string,
  image: string,
  description: {
    powername: string,
    value: string
  },
  usesCount: number,
}

export interface Profile {
  searches: Array<string>,
  heroes: Array<Hero>
  selectedHeroIndex?: number,
  powerups: Powerup[]
}

export interface Environment {
  production: boolean,
  heroDbUrl: string
}

export interface SearchError {
  response: string,
  error: string
}
