<script setup>
import { ref } from 'vue'
import SingleLink from './components/SingleLink.vue';

const link = ref('')
</script>

<template>
  <div class="container">
    <SingleLink :link="link" />
    <input type="text" v-model="link" placeholder="Paste a link to turn to QR Code">
    <a :disabled="!link" :class="{ 'disabled': link === '', 'downloadButton': true }" download="qrcode.png"
      :href="qrCodeImage">Download QR code as png</a>
  </div>
</template>

<style lang="scss" scoped>
:root {
  background: var(--background);
  color: var(--text);
  font: 1rem "PT Sans", sans-serif;
}

input {
  width: 360px;
  background: #fff;
  color: var(--input-text-color);
  font: inherit;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .1);
  border: 0;
  outline: 0;
  padding: 22px 18px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 3rem;
}

.disabled {
  pointer-events: none;
  opacity: .5;
}

.downloadButton {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--button-bg-color);
  color: white;
  text-decoration: none;
}
</style>
