<script setup lang="ts">
  import { computed } from 'vue'
  import { passwords } from '../stores/passwords'
  import IconCopy from '../components/icons/IconCopy.vue'

  type CheckboxesData = {name: string, label: string}

  const checkboxes: CheckboxesData[] = [
    {name: 'numbers', label: 'Numerics 0-9'},
    {name: 'low', label: 'Low liters a-z'},
    {name: 'large', label: 'Large liters A-Z'},
    {name: 'symbols', label: 'Special characters'},
    {name: 'repeat', label: 'Avoid repeating characters'},
  ];
  
  const isPLength = computed(() => {
    return 4<=passwords.pLength && passwords.pLength<=15;
  });
  const isPQuantity = computed(() => {
    return 1<=passwords.pQuantity && passwords.pQuantity<=50;
  });

  function copyPasswords() {
    let pass = '';
    passwords.passwords.forEach(p => pass += p+'\n')
    navigator.clipboard.writeText(pass);
  }
</script>

<template>
  <main class="passwords-generator">
    <h1 class="title">Passwords Generator</h1>

    <div>
      <section class="setting">
        <h2 class="setting-title">Setting</h2>
  
        <ul class="checkboxes-list">
          <li v-for="c of checkboxes">
            <label class="checkbox" :for="c.name">
              <input 
                :id="c.name"
                type="checkbox"
                :name="c.name" 
                :value="c.name"
                :checked="passwords.options.includes(c.name)"
                @input="passwords.setOptions(($event.target as HTMLInputElement).value)"
              />
              <span>{{ c.label }}</span>
            </label>
          </li>
        </ul>
  
        <div class="number-inputs">
          <label class="input">
            <span :style="!isPLength ? {color: '#FF4524'} : null">Length</span>
            <input 
              :style="!isPLength ? {outline: '1px solid #FF4524'} : null"
              type="number" 
              min="4" max="15" 
              :value="passwords.pLength"
              @input="passwords.setPLength(($event.target as HTMLInputElement).value)"
            />
            <span 
              v-if="!isPLength"
              class="note"
            >min 4, max 15 </span>
          </label>
          
          <label class="input">
            <span :style="!isPQuantity ? {color: '#FF4524'} : null">Quantity</span>
            <input 
              :style="isPQuantity ? null : {outline: '1px solid #FF4524'}"
              type="number" 
              min="1" max="50" 
              :value="passwords.pQuantity" 
              @input="passwords.setPQuantity(($event.target as HTMLInputElement).value)"
            />
            <span 
              v-if="!isPQuantity"
              class="note"
            >min 1, max 50 </span>
          </label>
        </div>
  
        <div class="buttons">
          <button 
            class="button reset"
            @click="passwords.reset"
          >Reset</button>
          <button 
            class="button generate"
            @click="passwords.generate"
            :disabled="!isPLength || !isPQuantity"
          >Generate</button>
        </div>
      </section>
    </div>

    <section class="passwords">
      <h2 class="setting-title">Passwords:</h2>

      <button 
        v-if="passwords.passwords?.length>0" 
        class="copy-button"
        @click="copyPasswords"
      >
        <IconCopy />
        <span>Copy</span>
      </button>

      <ul class="passwords-list">
        <li 
          class="password" 
          v-for="p in passwords.passwords"
        >{{ p }}</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.passwords-generator {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: 30px;
  column-gap: 50px;
}

.setting {
  width: 270px;
  padding: 20px;

  background-color: #d9d9d9;
  border-radius: 10px;
}

.setting-title {
  margin-bottom: 15px;
  line-height: 1.2em;
}

.checkboxes-list {
  margin-bottom: 16px;

  display: flex;
  flex-direction: column;
  gap: 5px;
}
.checkbox {
  padding: 3px 5px;

  display: flex;
  align-items: center;
  gap: 7px;

  border-radius: 5px;
}
.checkbox:hover {
  background-color: #925FF020;
}
.checkbox > input {
  width: 16px;
  height: 16px;

  cursor: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  background-color: transparent;
  border: 2px solid #54656f;
  border-radius: 5px;
}
.checkbox > input:checked {
  border: 0;
  background: #925FF0;
}
.checkbox > span {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.1em;
}

.number-inputs {
  margin-bottom: 30px;
  position: relative;

  display: flex;
  gap: calc(50% - 80px);
}
.input {
  display: flex;
  flex-direction: column;
}
.input > span {
  font-size: 14px;
}
.input > input {
  width: 80px;
  padding-left: 15px;

  display: flex;
  align-items: center;

  border: none;
  border-radius: 5px;
  outline: none;
  
  color: #925FF0;
  font-size: 15px;
  font-weight: 500;
  line-height: 2em;
}
.note {
  position: absolute;
  top: 100%;

  font-size: 13px;
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
  border: 2px solid #925FF0;
}
.button.generate {
  background-color: #925FF0;
  color: #FFFFFF;
}

.passwords {
  position: relative;
  width: calc(100% - (270px + 50px));
}
.copy-button {
  padding: 5px 7px;

  position: absolute;
  top: 1px;
  right: calc(100% - 270px);

  display: flex;
  align-items: center;
  column-gap: 7px;

  background-color: #925FF0;
  border-radius: 5px;
  cursor: pointer;

  color: #FFFFFF;
}
.passwords-list {
  margin-left: 10px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 15px;
}
.password {
  font-size: 15px;
  line-height: 1.55em;
}

@media (max-width: 900px) {
  .copy-button {
    right: 1px;
  }
}

@media (max-width: 830px) {
  .passwords-generator {
    flex-direction: column;
    align-items: center;
  }
 
  .passwords {
    width: 270px;
  }
}

@media (max-width: 650px) {
  .passwords-generator {
    flex-direction: row;
    align-items: flex-start;
  }
 
  .passwords {
    width: calc(100% - (270px + 50px));
  }
}

@media (max-width: 560px) {
  .passwords-generator {
    flex-direction: column;
    align-items: center;
  }
 
  .passwords {
    width: 270px;
  }
}
</style>
