<template>
  <div class="flex-1 flex flex-col gap-5 py-10 px-5 overflow-auto">
    <h1 class="text-3xl font-bold">Search your Pokémon!</h1>
    <div class="flex">
      <input
        id=""
        type="text"
        name="search"
        placeholder="Pokémon name or id"
        class="w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md outline-none text-base"
      />
    </div>
    <button
      type="button"
      class="bg-red-300 rounded-sm p-2"
      v-on:click.prevent="search"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const search = () => {
  const response = axios.get('https://pokeapi.co/api/v2/')
  console.log(response)
}
</script>
