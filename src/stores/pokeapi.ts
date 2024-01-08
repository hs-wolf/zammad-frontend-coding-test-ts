import { acceptHMRUpdate, defineStore } from 'pinia'
import { POKEAPI_STORE_ID } from '../utils'
import type { ISnack } from '../types'

interface IState {
  att?: string
}

// eslint-disable-next-line import/prefer-default-export
export const usePokeapiStore = defineStore(POKEAPI_STORE_ID, {
  state: (): IState => ({}),
  getters: {},
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokeapiStore, import.meta.hot))
}
