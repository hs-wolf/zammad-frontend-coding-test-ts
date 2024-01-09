export interface PokeapiResponse<T> {
  count: number
  next: string
  previous: string | null
  results: T[]
  [property: string]: unknown
}

export interface NamedAPIResource {
  name: string
  url: string
  [property: string]: unknown
}

export interface StatElement {
  base_stat: number
  effort: number
  stat: NamedAPIResource
  [property: string]: unknown
}

export interface PokemonSprites {
  back_default: null | string
  front_default: null | string
  [property: string]: unknown
}

export interface PokemonType {
  slot: number
  type: NamedAPIResource
  [property: string]: unknown
}

export interface Pokemon {
  height: number
  id: number
  name: string
  order: number
  sprites: PokemonSprites
  stats: StatElement[]
  types: PokemonType[]
  weight: number
  [property: string]: unknown
}

export interface PokemonLite {
  id: number
  name: string
  sprite: string
}
