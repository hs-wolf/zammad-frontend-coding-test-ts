<template>
  <div
    v-if="pokemon"
    class="relative flex flex-col items-center md:flex-row gap-5 p-5 w-full max-w-5xl mx-auto bg-gradient-to-b from-gray-200 to-gray-100 rounded-md"
  >
    <img
      v-bind:src="POKEMON_SPRITE_FRONT_ANIMATED_URL(pokemon?.id)"
      v-bind:alt="pokemon?.name"
      width="256"
      height="256"
      v-on:error="
        (e) => setFallbackImage(e, pokemon?.sprites.front_default ?? '')
      "
    />
    <div class="flex flex-col gap-1 text-base">
      <h1 class="text-3xl font-semibold">
        #{{ pokemon.id }} - {{ CAPITALIZED_NAME(pokemon.name) }}
      </h1>
      <p>
        <span class="font-semibold">Height:</span>
        {{ pokemon.height }}dm
      </p>
      <p>
        <span class="font-semibold">Weight:</span>
        {{ pokemon.weight }}hg
      </p>
      <div class="flex flex-col gap-1">
        <p class="font-semibold">Types:</p>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="pokeType in pokemon.types"
            v-bind:key="pokeType.type.name"
            class="text-gray-300 bg-gray-700 px-2 py-1 rounded-md"
          >
            {{ pokeType.type.name.toUpperCase() }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <p class="font-semibold">Base stats:</p>
        <div class="flex flex-wrap gap-1 text-sm">
          <p
            v-for="pokeStat in pokemon.stats"
            v-bind:key="pokeStat.stat.name"
            class="flex gap-1 bg-gray-200 border border-gray-300 px-2 py-1 rounded-md"
          >
            <span>{{ pokeStat.stat.name.toUpperCase() }}</span>
            <span class="font-semibold">{{ pokeStat.base_stat }}</span>
          </p>
        </div>
      </div>
    </div>
    <button class="absolute right-5 top-5" v-on:click.prevent="$emit('close')">
      <img src="../assets/icons/close.svg" alt="Close" name="Close" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Pokemon, SnackType } from '../types'
import { POKEMON_SPRITE_FRONT_ANIMATED_URL, CAPITALIZED_NAME } from '../utils'
import { useSnackbarStore } from '../stores'

defineProps<{ pokemon: Pokemon }>()

defineEmits<{ (e: 'close'): void }>()

const snackbarStore = useSnackbarStore()

// Set the default sprit as fallback if the pokemons gif doesnt exist.
const setFallbackImage = (e: Event, url: string) => {
  snackbarStore.createSnack({
    type: SnackType.ERROR,
    message: 'This Pokémon doesn`t have an animated sprite.',
  })
  const target = e?.target as HTMLImageElement
  if (target.src) {
    target.src = url
  }
}
</script>

<style scoped></style>
