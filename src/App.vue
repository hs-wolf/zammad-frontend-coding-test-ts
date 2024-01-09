<template>
  <div class="fixed inset-0 flex flex-col">
    <router-view />
    <Snackbar />
  </div>
</template>

<script setup lang="ts">
import Snackbar from './components/Snackbar.vue'
</script>
