<script setup lang="ts">
  import { text } from '../stores/text';
</script>

<template>
  <main class="text-generator">
    <h1
      v-if="text.chat.length<1"
      class="title"
    >Text Generator</h1>

    <ul id="chat" class="chat">
      <li 
        v-for="c in text.chat"
        :id="c.id"
        :class="`message ${c?.who.toLowerCase()}`"
      >
        <h3>{{ c.who }}</h3>
        <p>{{ c.text }}</p>  
      </li>
    </ul>

    <div class="typing-panel">
      <textarea 
        id="typing-field" 
        class="typing-field"
        name="typing field" 
        cols="30" rows="3"
        :value="text.text"
        @input="text.setText(($event.target as HTMLInputElement).value)"
        @keyup.ctrl.enter="text.generate"
      >{{ text.text }}</textarea>

      <div class="buttons">
        <button 
          class="button reset"
          @click="text.reset"
        >Reset</button>
        <button 
          class="button generate"
          @click="text.generate"
          :disabled="!text.text || text.text.length<1"
        >Generate</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
#__nuxt > main {
  overflow: hidden;
  padding: 0;
}

.text-generator {
  position: relative;
  margin-bottom: 125px;
  
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: 30px;
  column-gap: 50px;
}

.title {
  margin-top: 20px;
}

.chat { 
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-bottom: 40px;

  display: flex;
  flex-direction: column;
  row-gap: 20px;

  overflow-y: auto;
}

.message {
  max-width: 70%;
  padding: 8px 15px;

  background-color: var(--color-2);
  border-radius: 15px;
}
.you {
  margin-left: auto;
  border-bottom-right-radius: none;
}
.chatbot {
  margin-right: auto;
  border-bottom-left-radius: none;
}

.message > h3 {
  color: var(--color-1);
  font-size: 16px;  
}

.message > p {
  font-size: 15px;
}

.typing-panel {
  width: calc(100% - 250px - 40px);
  height: 125px;
  padding: 20px;

  position: fixed;
  right: 20px;
  bottom: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: var(--color-managing);
  border-radius: 20px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
}

.typing-field {
  width: 100%;
  height: 50px;
  padding: 5px 7px;

  resize: none;
  outline: none;
  border: none;
  border-radius: 10px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
.button {
  padding: 3px 5px;
  border-radius: 5px;
  cursor: pointer;
}
.button.reset {
  border: 2px solid var(--color-1);
}
.button.generate {
  background-color: var(--color-1);
}

@media (max-width: 650px) {
  #__nuxt > main {
    padding-bottom: 125px;
  }

  .chat { 
    padding: 10px;
    padding-bottom: 20px;
    row-gap: 10px;
  }

  .message {
    max-width: 80%;
  }

  .typing-panel {
    width: calc(100% - 40px);
  }
}

@media (max-width: 435px) {
  .typing-panel {
    width: calc(100% - 20px);
    right: 10px;
    bottom: 10px;
  }
}
</style>
