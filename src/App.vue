<script setup>
import { ref, watch } from 'vue'
import QRCode from 'qrcode'

const makeQr = async (link) => {
  return QRCode.toDataURL(link, { errorCorrectionLevel: 'H' })
}


const link = ref('')
const loading = ref(false)
const qrCodeImage = ref('')

watch(link, async (newLink) => {
  loading.value = true
  try {
    const qr = await makeQr(newLink)
    qrCodeImage.value = qr
    console.log(qr)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false    
  }
})

</script>

<template>
  <div class="container">
    <div>
      <p v-if="loading">Loading...</p>
      <img v-if="link && !loading" :src="qrCodeImage" :alt="link" >
    </div>
    
    <input type="text" v-model="link">
    
    <a :disabled="!link" :class="{'disabled': link === '', 'downloadButton': true}" download="qrcode.png" :href="qrCodeImage">Download QR code as png</a>
  </div>

</template>

<style lang="scss" scoped>
 
$background: #f5f6fa;
$text: #9c9c9c;
$input-bg-color: #fff;
$input-text-color: #a3a3a3;
$button-bg-color: #5463c9;
$button-text-color: #fff;

:root {
	background: $background;
	color: $text;
	font: 1rem "PT Sans", sans-serif;
}


  .disabled {
    pointer-events: none;
  opacity: .5;  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 3rem;
  }

  .downloadButton {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: $button-bg-color;
    color: white;
    text-decoration: none;
  }

  input {
    width: 360px;
		background: #fff;
		color: $input-text-color;
		font: inherit;
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);
		border: 0;
		outline: 0;
		padding: 22px 18px;
  }

  img {
    width: 256px;
    height: 256px;
  }
</style>
