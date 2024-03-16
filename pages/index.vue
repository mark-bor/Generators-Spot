<script setup>
  import IconKitsuneDiary from "../components/icons/IconKitsuneDiary.vue";
  import IconGitHub from "../components/icons/IconGitHub.vue";
</script>

<template>
  <main class="home">
    <h1 class="title">Welcome to Generators Spot</h1>

    <p class="text">There are several different generators here that can help you generate the data you need, such as passwords, dates, and more.</p>

    <div class="resourses-links">
      <a 
        class="resourses-link"
        href="https://github.com/mark-bor/Generators-Spot"
        target="_blank"
      >
        <IconGitHub class="icon" />
        <span>Generators Spot on GitHub</span>
      </a>

      <a 
        class="resourses-link"
        href="https://kitsune-diary.vercel.app/"
      >
        <IconKitsuneDiary class="icon" />
        <span>Kitsune Diary</span>
      </a>
    </div>
  </main>
</template>

<style scoped>
.home {
  height: calc(100vh - 40px);
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  margin-bottom: 30px;
  color: var(--color-1);
  font-size: 45px;
  font-weight: 700;
}

.text {
  width: 70%;
  margin-bottom: 50px;

  text-align: center;
  font-size: 20px;
}

.resourses-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.resourses-link {
  padding: 1px 7px;

  display: inline-flex;
  align-items: center;
  column-gap: 8px;

  border-radius: 7px;
  background-color: var(--color-2);
}
/* .icon {
} */
.resourses-link > span {
  color: var(--color-text);
}
.resourses-link:hover > span {
  text-decoration-thickness: 1px;
  text-decoration-style: solid;
  text-decoration-color: var(--color-text);
  text-decoration-line: underline;
}
</style>
