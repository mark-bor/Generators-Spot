<script setup lang="ts">
  import { menu } from '../stores/menu';
  import IconWrench from './icons/IconWrench.vue';

  type LinkData = {
    link: string
    uncompleted: boolean
  }

  const links: LinkData[] = [
    {link: 'passwords', uncompleted: false}, 
    {link: 'date', uncompleted: false},
    {link: 'text', uncompleted: true},
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
          :to="`/${l.link}`"
          @click="menu.setMenu(false)"
        >{{ upperFirstLetter(l.link) }}</NuxtLink>
        <span v-if="l.uncompleted" class="icon-with-explanation">
          <IconWrench />
          <span class="explanation">This section is in development ptocess.</span>
        </span>
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

  background-color: var(--color-background);
}

.list {
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.list > li {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
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

.icon-with-explanation {
  min-width: 24px;
  width: 24px;
  height: 24px;
  position: relative;
  
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  overflow: hidden;
}
.icon-with-explanation:hover {
  overflow: visible;
  background-color: var(--color-2);
}

.explanation {
  width: 190px;
  padding: 5px 10px;
  position: absolute;
  left: 25px;

  background-color: var(--color-background);
  border-radius: 7px;
}
.icon-with-explanation:hover > .explanation {
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
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

  .link {
    font-size: 22px;
  }

  .explanation {
    right: 25px;
    left: auto;
  }
}
</style>
