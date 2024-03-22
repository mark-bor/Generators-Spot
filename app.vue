<script setup>
  import Header from "./components/Header.vue";
  import Navigation from "./components/Navigation.vue";
</script>

<template>
  <div class="root-component">
    <Header />
    <Navigation />
    <NuxtPage />
  </div>
</template>

<style>
@import url("./assets/main.css");
</style>