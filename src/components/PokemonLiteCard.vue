<template>
  <div
    class="flex flex-col hover:bg-gray-800 hover:text-white active:scale-95 transition-all bg-gray-200 border border-gray-300 rounded-md"
  >
    <div class="flex flex-col p-2 text-center">
      <p class="font-semibold">#{{ pokemonLite?.id }}</p>
      <p class="break-all">
        {{ pokemonLite?.name }}
      </p>
    </div>
    <button
      type="button"
      name="select-pokemon"
      class="flex justify-center w-full p-2 hover:animate-ping"
      v-on:click.prevent="$emit('select', pokemonLite)"
    >
      <img
        v-bind:src="pokemonLite.sprite"
        v-bind:alt="pokemonLite?.name"
        width="128"
        height="128"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { PokemonLite } from '../types'

defineProps<{ pokemonLite: PokemonLite }>()

defineEmits<{ (e: 'select', value: PokemonLite): void }>()
</script>

<style scoped></style>
