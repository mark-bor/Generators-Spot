<script setup lang="ts">
  import { qrCode } from '../stores/qrCode';
</script>

<template>
  <main class="qr-code-generator">
    <h1 class="title" >QR Code Generator</h1>

    <div class="setting">
      <ul class="providers">
        <li v-for="p of qrCode.providers">
          <label class="provider" :for="p">
            <input 
              :id="p"
              type="radio"
              name="provider"
              :checked="qrCode.provider?.name===p"
              @input="qrCode.setProvider(p)"
            >
            <span class="radio"></span>
            <span>{{ p }}</span>
          </label>
        </li>
      </ul>

      <label class="text-input " for="data">
        <span>Data to convert</span>
        <input
          id="data"
          type="text"
          name="text"
          :value="qrCode.data"
          @input="qrCode.setData($event)"
        >
      </label>

      <label 
        v-if="qrCode.provider?.name==='Nara Wira Digital'"
        class="select"
        for="format"
      >
        <span>Format</span>
        <select 
          id="format" 
          name="format"
          @change="qrCode.setFormat($event)"
        >
          <option 
            v-for="f of qrCode.formats" 
            :value="f"
            :selected="qrCode.format===f"
          >{{ f }}</option>
        </select>
      </label>

      <label
        v-if="qrCode.provider?.name==='Ajith Joseph' || qrCode.provider?.name==='With datatypes and logo'"
        class="select"
        for="type"
      >
        <span>Type</span>
        <select 
          id="type" 
          name="type"
          @change="qrCode.setType($event)"
        >
          <option 
            v-for="t of qrCode.types" 
            :value="t"
            :selected="qrCode.type===t"
          >{{ t }}</option>
        </select>
      </label>

      <div class="buttons">
        <button 
          class="button reset"
          @click="qrCode.reset"
        >Reset</button>
        <button 
          class="button generate"
          @click="qrCode.generate"
        >Generate</button>
      </div>
    </div>

    <section class="result">      
      <img
        v-if="qrCode.resultURL"
        id="result"
        :src="qrCode.resultURL"
        alt="QR code"
        width="200"
        height="200"
      >

      <div v-if="qrCode.resultSVG">
        {{ qrCode.resultSVG }}
      </div>

      <button 
        v-if="qrCode.resultURL || qrCode.resultSVG"
        class="download"
        @click="qrCode.download"
      >Download</button>
    </section>
  </main>
</template>

<style scoped>
.qr-code-generator {  
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: 30px;
  column-gap: 50px;
}

.title {
  margin-top: 20px;
}

.setting {
  width: 270px;
  padding: 20px;

  background-color: var(--color-managing);
  border-radius: 10px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
}

.providers {
  margin-bottom: 15px;
}
.provider {
  height: 28px;
  display: inline-flex;
  align-items: center;
  column-gap: 5px;
}
.provider > input {
  display: none;
}
.radio {
  width: 14px;
  height: 14px;

  border: 1px solid var(--color-text);
  border-radius: 50%;
}
.provider > input:checked + .radio {
  background-color: var(--color-1);
}

.text-input {
  display: block;
  width: 100%;
  margin-bottom: 14px;
}
.text-input > span {
  font-size: 14px;
  line-height: 1.1em;
}
.text-input > input {
  width: 100%;
  height: 30px;
  padding: 3px 7px;

  border: none;
  border-radius: 5px;
  outline: none;
}

.select {
  width: 100%;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  row-gap: 2px;
}
.select > span {
  font-size: 14px;
  line-height: 1.3em;
}
.select > input,
.select > select {
  width: 50%;
  height: 30px;
  padding: 3px 7px;
  
  border: none;
  border-radius: 5px;
  outline: none;
}
.select > input {
  width: 100%;
}
.select > input[type='file'] {
  width: 100%;
  padding: 0;
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 0;
}
.select > select > option {
  font-size: 14px;
  line-height: 1.5em;
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

.result {
  position: relative;
  min-width: 200px;
  width: calc(100% - (270px + 50px));

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
}
.download {
  padding: 3px 7px;

  display: flex;
  align-items: center;
  column-gap: 7px;

  background-color: var(--color-1);
  border-radius: 5px;
  cursor: pointer;

  color: var(--color-background);
  line-height: 1.3em;
}

@media (max-width: 830px) {
  .qr-code-generator {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
}

@media (max-width: 650px) {
  .qr-code-generator {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  } 
}

@media (max-width: 560px) {
  .qr-code-generator{
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
}
</style>
