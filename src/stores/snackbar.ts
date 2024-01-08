import { acceptHMRUpdate, defineStore } from 'pinia'
import { SNACKBAR_STORE_ID } from '../utils'
import type { ISnack } from '../types'

interface IState {
  snacksList: ISnack[]
  snackTimer: number
  offsetTimer: number
  waitingSnack: boolean
  currentTimeOut?: NodeJS.Timeout
}

// eslint-disable-next-line import/prefer-default-export
export const useSnackbarStore = defineStore(SNACKBAR_STORE_ID, {
  state: (): IState => ({
    snacksList: [],
    snackTimer: 5 * 1000,
    offsetTimer: 1 * 1000,
    waitingSnack: false,
  }),
  getters: {
    currentSnack(state) {
      return state.snacksList[0]
    },
  },
  actions: {
    // Push a new stack to the list and try to clear the current list.
    createSnack(snack: ISnack) {
      this.snacksList.push({ ...snack, message: snack.message })
      this.clearSnackList()
    },
    // If the list is currently being cleared return, otherwise clear the current snack after a timer.
    clearSnackList() {
      if (this.waitingSnack || !this.snacksList.length) {
        return
      }
      this.waitingSnack = true
      this.currentTimeOut = setTimeout(this.clearCurrentSnack, this.snackTimer)
    },
    // Resets the sanck timeout, remove the current snack and reset the "clearing status".
    // If there are leftover snacks in the list, try to clear the current list after a delay.
    clearCurrentSnack() {
      clearTimeout(this.currentTimeOut)
      this.snacksList.splice(0, 1)
      this.waitingSnack = false
      if (this.snacksList.length) {
        setTimeout(() => this.clearSnackList, this.offsetTimer)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))
}
