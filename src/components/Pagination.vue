<template>
  <div
    class="flex flex-col justify-end md:flex-row md:items-center gap-5 w-full max-w-5xl mx-auto"
  >
    <div
      v-if="!hideQueryText"
      class="bg-gray-200 border border-gray-300 rounded-md relative flex flex-1"
    >
      <button
        type="button"
        class="absolute flex justify-center items-center w-10 h-10"
        v-bind:class="{ 'pointer-events-none': !queryText }"
        v-on:click.prevent="changeQueryText('')"
      >
        <img
          v-if="queryText"
          src="../assets/icons/close.svg"
          alt="Search"
          class="w-6 h-6"
        />
        <img
          v-else
          src="../assets/icons/search.svg"
          alt="Search"
          class="w-6 h-6"
        />
      </button>
      <input
        id="text"
        v-bind:value="queryText"
        type="text"
        name="search"
        pattern="[a-zA-Z0-9]+"
        placeholder="Pokémon name or id"
        class="w-full py-2 px-3 ps-10 bg-transparent outline-none text-base"
        v-on:input.prevent="
          (e) => changeQueryText((e.target as HTMLInputElement).value)
        "
      />
    </div>
    <div class="flex items-center justify-center gap-2">
      <p class="whitespace-nowrap">Results per page:</p>
      <select
        id="limit"
        name="select-limit"
        class="bg-gray-200 border border-gray-300 rounded-md h-10 p-2"
        v-bind:value="selectedLimit"
        v-on:change="changeLimit"
      >
        <option v-for="limit in limits" v-bind:key="limit">
          {{ limit }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <button
        name="previous"
        type="button"
        class="pagination-button rounded-s-3xl rounded-e-md"
        v-on:click.prevent="changePage('previous')"
      >
        Previous
      </button>
      <div class="flex items-center justify-center gap-2">
        <p class="whitespace-nowrap">Page:</p>
        <select
          id="page-bottom"
          name="select-page"
          class="bg-gray-200 border border-gray-300 rounded-md h-10 p-2"
          v-bind:value="selectedPage"
          v-on:change="
            (e) =>
              $emit(
                'changePage',
                parseInt((e.target as HTMLSelectElement).value),
              )
          "
        >
          <option v-for="page in pages" v-bind:key="page" v-bind:value="page">
            {{ page + 1 }}
          </option>
        </select>
      </div>
      <button
        name="next"
        type="button"
        class="pagination-button rounded-e-3xl rounded-s-md"
        v-on:click.prevent="changePage('next')"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedLimit: number
  selectedPage: number
  limits: number[]
  pages: number[]
  queryText?: string
  hideQueryText?: true
}>()

const emits = defineEmits<{
  (e: 'changeLimit', value: number): void
  (e: 'changePage', value: number): void
  (e: 'changeText', value: string): void
}>()

const changeLimit = (e: Event) =>
  emits('changeLimit', parseInt((e.target as HTMLSelectElement).value, 10))

// Check if the page is the last or the first one before trying to change It.
const changePage = async (action?: 'previous' | 'next') => {
  if (action === 'previous') {
    if (props.selectedPage - 1 >= 0) {
      emits('changePage', props.pages[props.selectedPage - 1])
    }
  }
  if (action === 'next') {
    if (props.selectedPage + 1 < props.pages.length) {
      emits('changePage', props.pages[props.selectedPage + 1])
    }
  }
}

const changeQueryText = (text: string) => {
  const filtered = text.match(/[a-zA-Z0-9]+/g)?.join('') ?? ''
  emits('changeText', filtered)
}
</script>

<style scoped>
.pagination-button {
  @apply flex justify-center items-center h-10 text-gray-300 bg-gray-700 px-3 py-2 text-sm font-medium;
  @apply hover:bg-gray-900 hover:text-white hover:scale-95 transition-all;
}
</style>
