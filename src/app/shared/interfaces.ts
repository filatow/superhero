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

export interface HeroPowerstats {
  intelligence: number | string,
  strength: number | string,
  speed: number | string,
  durability: number | string,
  power: number | string,
  combat: number | string
}

export interface HeroImage {
  url: string
}

export interface Hero {
  id: string,
  name: string,
  powerstats: HeroPowerstats,
  biography: object,
  appearance: object,
  work: object,
  connections: object,
  image: HeroImage
}

export interface PowerupDescription {
  powername: string,
  value: string
}

export interface Powerup {
  name: string,
  image: string,
  description: PowerupDescription,
  usesCount: number,
  inactive?: boolean
}

export interface FightResult {
  time: number,
  hero: Hero,
  enemy: Hero,
  victory: boolean
}

export interface Profile {
  searches: string[],
  heroes: Hero[],
  selectedHeroIndex?: number,
  powerups: Powerup[],
  fightResults: FightResult[]
}

export interface Environment {
  production: boolean,
  heroDbUrl: string
}
