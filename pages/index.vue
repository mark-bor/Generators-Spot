<script setup>
</script>

<template>
  <main class="home">
    <h1 class="title">Welcome to Generators</h1>

    <p class="text">Here are some generators which can help you generate data that you need.</p>
  </main>
</template>

<style scoped>
.home {
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
}

.title {
  color: #925FF0;
  font-size: 45px;
  font-weight: 700;
}

.text {
  width: 50%;

  text-align: center;
  font-size: 20px;
}
</style>
