<script setup>
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
        <img 
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
          alt="generators spot"
          width="20" height="20"
        />
        <span>Generators Spot on GitHub</span>
      </a>

      <a 
        class="resourses-link"
        href="https://kitsune-diary.vercel.app/"
      >
        <img 
          src="https://kitsune-diary.vercel.app/_next/static/media/logo.aadbc3bc.svg" 
          alt="kitsune diary" 
          height="20"
        />
        <span>Kitsune Diary</span>
      </a>
    </div>
  </main>
</template>

<style scoped>
.home {
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
}

.title {
  margin-bottom: 10px;
  color: var(--color-1);
  font-size: 45px;
  font-weight: 700;
}

.text {
  width: 70%;
  margin-bottom: 7px;

  text-align: center;
  font-size: 20px;
}

.resourses-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
