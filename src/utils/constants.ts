export const SNACKBAR_STORE_ID = 'SNACKBAR_STORE_ID'
export const POKEAPI_STORE_ID = 'POKEAPI_STORE_ID'

export const POKEAPI_POKEMON_LIST_SEARCH = (limit: number, offset: number) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

export const POKEAPI_POKEMON_UNIQUE_SEARCH = (id: number) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`

export const POKEMON_SPRITE_FRONT_DEFAULT_URL = (id?: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

export const POKEMON_SPRITE_FRONT_ANIMATED_URL = (id?: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
