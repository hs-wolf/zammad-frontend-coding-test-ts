<template>
  <div class="flex flex-col h-full">
    <header class="bg-gray-800 text-white">
      <div class="mx-auto px-8">
        <div class="relative flex items-center justify-between h-16">
          <div
            class="flex-1 flex items-center gap-10 justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex-shrink-0 flex items-center">
              <img class="w-14 h-14" src="../../assets/icons/logo.svg" />
              <img class="ml-3" src="../../assets/icons/logotype.svg" />
            </div>
            <Navbar />
          </div>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../Navbar.vue'
</script>
