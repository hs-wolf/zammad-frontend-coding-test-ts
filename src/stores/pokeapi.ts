import axios from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'
import {
  CAPITALIZED_NAME,
  GET_POKEMON_ID_FROM_URL,
  POKEAPI_POKEMON_LIST_SEARCH,
  POKEAPI_POKEMON_UNIQUE_SEARCH,
  POKEAPI_STORE_ID,
  POKEMON_SPRITE_FRONT_DEFAULT_URL,
} from '../utils'
import {
  SnackType,
  type NamedAPIResource,
  type PokeapiResponse,
  type Pokemon,
  type PokemonLite,
} from '../types'
import { useSnackbarStore } from './snackbar'

interface IState {
  pokemonsLimit: number
  searchingPokemonList: boolean
  searchingUniquePokemon: boolean
  pokemonsFilterText: string
  pokemonsList: PokemonLite[]
  pokemonsCount: number
}

// eslint-disable-next-line import/prefer-default-export
export const usePokeapiStore = defineStore(POKEAPI_STORE_ID, {
  state: (): IState => ({
    pokemonsLimit: 32,
    searchingPokemonList: false,
    searchingUniquePokemon: false,
    pokemonsFilterText: '',
    pokemonsList: [],
    pokemonsCount: 0,
  }),
  getters: {
    filteredPokemons(state) {
      return state.pokemonsList
        .map((pokemon) => {
          if (
            pokemon.name
              .toLowerCase()
              .includes(state.pokemonsFilterText.toLowerCase()) ||
            pokemon.id
              .toString()
              .includes(state.pokemonsFilterText.toLowerCase())
          ) {
            return pokemon
          }
          return null
        })
        .filter((pokemon) => pokemon) as PokemonLite[]
    },
    listOfPokemonsIds(state) {
      return state.pokemonsList.map((pokemon) => pokemon.id)
    },
  },
  actions: {
    async fetchPokemons() {
      if (this.searchingPokemonList) {
        return
      }
      this.searchingPokemonList = true
      try {
        // Save the total pokemon count.
        const countResponse = await axios.get<
          PokeapiResponse<NamedAPIResource>
        >(POKEAPI_POKEMON_LIST_SEARCH(0, 0))
        this.pokemonsCount = countResponse.data.count
        // Fetch all pokemons from the API.
        const response = await axios.get<PokeapiResponse<NamedAPIResource>>(
          POKEAPI_POKEMON_LIST_SEARCH(this.pokemonsCount, 0),
        )
        // Format the results to the format we are using locally.
        const newPokemonsLite = response.data.results.map((result) => {
          const id = GET_POKEMON_ID_FROM_URL(result.url)
          return {
            id,
            name: CAPITALIZED_NAME(result.name),
            sprite: POKEMON_SPRITE_FRONT_DEFAULT_URL(id),
          }
        })
        // Push the new pokemons into the array and sort them based on Id.
        this.pokemonsList.push(...newPokemonsLite)
        useSnackbarStore().createSnack({
          type: SnackType.SUCCESS,
          message: 'Pokemons loaded!',
        })
      } catch (error) {
        console.log(error)
        useSnackbarStore().createSnack({
          type: SnackType.ERROR,
          message: 'Failed to load the Pokemons.',
        })
      } finally {
        this.searchingPokemonList = false
      }
    },
    async fetchUniquePokemon(id: number) {
      if (this.searchingUniquePokemon) {
        return null
      }
      this.searchingUniquePokemon = true
      try {
        // Fetch all pokemons from the API.
        const response = await axios.get<Pokemon>(
          POKEAPI_POKEMON_UNIQUE_SEARCH(id),
        )
        useSnackbarStore().createSnack({
          type: SnackType.SUCCESS,
          message: `Loaded details for Pokémon: ${CAPITALIZED_NAME(
            response.data.name,
          )}`,
        })
        return response.data
      } catch (error) {
        console.log(error)
        useSnackbarStore().createSnack({
          type: SnackType.ERROR,
          message: `Failed to load the Pokémon with id: ${id}.`,
        })
        return null
      } finally {
        this.searchingUniquePokemon = false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokeapiStore, import.meta.hot))
}
