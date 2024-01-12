<template>
  <div class="container">
    <div>
        <p v-if="loading">Loading...</p>
        <img v-if="link && !loading" :src="qrCodeImage" :alt="link">
    </div>
    <input type="text" v-model="link" placeholder="Paste a link to turn to QR Code">
    <a :disabled="!link" :class="{ 'disabled': link === '', 'downloadButton': true }" download="qrcode.png"
      :href="qrCodeImage">Download QR code as png</a>
  </div>


</template>

<script setup>

import { ref, watch } from 'vue'
import makeQr from "../qrcode"

const loading = ref(false)
const qrCodeImage = ref('')
const link = ref('')

watch(link, async (newLink) => {
    loading.value = true
    try {
        const qr = await makeQr(newLink)
        qrCodeImage.value = qr
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
})

</script>

<style scoped>

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
  gap: 3rem;
  height: 100%;
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


img {
    width: 256px;
    height: 256px;
}
</style>