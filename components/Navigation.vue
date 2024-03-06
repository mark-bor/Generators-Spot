<script setup lang="ts">
  import { menu } from '../stores/menu'

  const links: string[] = [
    'passwords', 
    'date',
    'text'
  ];

  const upperFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
</script>

<template>
  <nav :class="{'nav': true, 'active': menu.isMenu}">
    <ul class="list">
      <li v-for="l of links">
        <NuxtLink 
          class="link" 
          :to="`/${l}`"
          @click="menu.setMenu(false)"
        >{{ upperFirstLetter(l) }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  grid-area: nav;
  height: calc(100vh - 40px);
  padding: 20px;

  position: sticky;
  top: 40px;
  left: 0;

  background-color: #FFFFFF;
}

.list {
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.link {
  display: inline-block;
  width: 100%;
  padding: 3px 5px;

  border-radius: 5px;

  font-size: 18px;
  font-weight: 500;
  line-height: 1.3em;
}

@media (max-width: 650px) {
  .nav {
    display: none;
    border-right: none;
  }
  .nav.active {
    display: block;
    width: 100%;

    position: fixed;
    top: 40px;
    left: 0;
    z-index: 5;
  }
}
</style>
