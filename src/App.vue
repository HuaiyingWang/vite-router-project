<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/review">Review</RouterLink>
        <RouterLink to="/todo">Todo</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer>
    <div class="wrapper">
      <p>© 2025 第二週作業繳交：串接 Todo List API</p>
    </div>
  </footer>
</template>

<style scoped></style>
