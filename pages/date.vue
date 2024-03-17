<script setup lang="ts">
  import { computed } from 'vue'
  import { date } from '../stores/date'
  import IconCopy from '../components/icons/IconCopy.vue'
  
  const yearsValidation = computed(() => {
    const difference = date.toYear - date.fromYear;
    return difference>=0
  });
  const quantityValidation = computed(() => {
    return 1<=date.quantity && date.quantity<=50
  });

  function copyDates() {
    let datesList: string = '';
    date.dates.forEach(p => datesList += p+'\n')
    navigator.clipboard.writeText(datesList);
  }
</script>

<template>
  <main class="dates-generator">
    <h1 class="title">Date Generator</h1>

    <div>
      <section class="setting">
        <h2 class="section-title">Setting</h2>
    
        <div class="from-to">
          <label class="input">
            <span>From year</span>
            <input
              :style="!yearsValidation ? {outline: '1px solid #FF4524'} : null"
              type="number"
              min="1" :max="new Date().getFullYear()"
              :value="date.fromYear"
              @input="date.setFromYear(($event.target as HTMLInputElement).value)"
            />
            <span
              v-if="!yearsValidation"
              class="note"
            >This year can't be bigger</span>
          </label>
          
          <label class="input">
            <span>To year</span>
            <input
              :style="!yearsValidation ? {outline: '1px solid #FF4524'} : null"
              type="number"
              min="1" :max="new Date().getFullYear()"
              :value="date.toYear"
              @input="date.setToYear(($event.target as HTMLInputElement).value)"
            />
            <span
              v-if="!yearsValidation"
              class="note"
            >This year can't be smaller</span>
          </label>

          <label class="input quantity">
            <span>Quantity</span>
            <input
              :style="!quantityValidation ? {outline: '1px solid #FF4524'} : null"
              type="number" 
              min="1" max="50"
              :value="date.quantity"
              @input="date.setQuantity(($event.target as HTMLInputElement).value)"
            />
            <span
              v-if="!quantityValidation"
              class="note"
            >Min 1, max 50</span>
          </label>
        </div>
  
        <div class="buttons">
          <button 
            class="button reset"
            @click="date.reset"
          >Reset</button>
          <button 
            class="button generate"
            @click="date.generate"
            :disabled="!yearsValidation || !quantityValidation"
          >Generate</button>
        </div>
      </section>
    </div>

    <section class="dates">
      <h2 class="section-title">Dates:</h2>

      <button 
        v-if="date.dates?.length>0" 
        class="copy-button"
        @click="copyDates"
      >
        <IconCopy />
        <span>Copy</span>
      </button>

      <ul class="dates-list">
        <li 
          class="date" 
          v-for="d in date.dates"
        >{{ d }}</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.dates-generator {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: 30px;
  column-gap: 50px;
}

.setting {
  width: 270px;
  padding: 20px;

  background-color: var(--color-managing);
  border-radius: 10px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
}

.section-title {
  margin-bottom: 15px;
  line-height: 1.2em;
}

.from-to {
  margin-bottom: 30px;
  position: relative;

  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
.input {
  position: relative;
  display: flex;
  flex-direction: column;
}
.input > span {
  font-size: 14px;
}
.input > input {
  width: 100%;
  padding-left: 15px;

  display: flex;
  align-items: center;

  border: none;
  border-radius: 5px;
  outline: none;
  
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 2em;
}
.note {
  position: absolute;
  top: 0;
  right: 0;

  color: var(--color-error);
  font-size: 13px;
}
.quantity > input {
  width: 80px;
  text-align: left;
}
.quantity > .note {
  top: 100%;
  left: 0;
  line-height: 1.15em;
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

.dates {
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

  background-color: var(--color-1);
  border-radius: 5px;
  cursor: pointer;

  color: var(--color-background);
}
.dates-list {
  margin-left: 10px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 15px;
}
.date {
  font-size: 15px;
  line-height: 1.55em;
}

@media (max-width: 900px) {
  .copy-button {
    right: 1px;
  }
}

@media (max-width: 830px) {
  .dates-generator {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
 
  .dates {
    width: 270px;
  }
}

@media (max-width: 650px) {
  .dates-generator {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
 
  .dates {
    width: calc(100% - (270px + 50px));
  }
}

@media (max-width: 560px) {
  .dates-generator {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
 
  .dates {
    width: 270px;
  }
}
</style>
