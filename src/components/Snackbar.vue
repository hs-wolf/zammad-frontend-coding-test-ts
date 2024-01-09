<template>
  <Transition name="slide-down">
    <div
      v-if="waitingSnack"
      class="z-50 fixed inset-x-3 top-3 flex flex-col lg:left-auto"
    >
      <button
        name="clear-snack"
        class="flex items-center gap-2 px-3 py-2 shadow rounded-md"
        v-bind:class="[currentBg]"
        v-on:click.prevent="snackbarStore.clearCurrentSnack"
      >
        <p class="w-full font-semibold break-all">
          {{ currentSnack.message }}
        </p>
        <img src="../assets/icons/close.svg" alt="Close" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { SnackType } from '../types'
import { useSnackbarStore } from '../stores'

const snackbarStore = useSnackbarStore()
const { currentSnack, waitingSnack } = storeToRefs(snackbarStore)

const currentBg = computed(() => {
  switch (currentSnack.value.type) {
    case SnackType.SUCCESS:
      return 'bg-green-300'
    case SnackType.WARNING:
      return 'bg-yellow-300'
    case SnackType.ERROR:
      return 'bg-red-300'
    default:
      return 'bg-yellow-300'
  }
})
</script>
