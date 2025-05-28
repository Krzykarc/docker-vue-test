<script setup lang="ts">
import { RouterView } from 'vue-router'
import '@/design-system/variables.css'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
:root {
  --primary-color: #e31837;
  --text-color: #333;
  --background-color: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}
</style>
