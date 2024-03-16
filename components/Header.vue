<script setup lang="ts">
  import { menu } from '../stores/menu'
</script>

<template>
  <header class="header">
    <NuxtLink 
      class="link"
      to="/"
      name="home"
    >Home</NuxtLink>

    <button 
      class="menu-button"
      @click="menu.toggleMenu"
    >
      <span>{{ menu.isMenu ? 'close' : 'menu'}}</span>
    </button>
  </header>
</template>

<style scoped>
.header {
  grid-area: header;
  height: 40px;
  padding: 0 20px;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--color-1);
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);

  line-height: 1.5;
}

.link {
  padding: 3px 5px;
  border-radius: 5px;
  cursor: pointer;

  color: var(--color-background);
  font-weight: 600;
  line-height: 1.1em;
}
.link:hover {
  background: none;
}

.menu-button {
  display: none;
}

@media (max-width: 650px) {
  .header {
    justify-content: space-between;
  }

  .menu-button {
    display: block;
    color: var(--color-background);
  }
  .menu-button > span {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
