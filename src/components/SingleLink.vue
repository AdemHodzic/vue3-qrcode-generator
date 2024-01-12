<template>
    <div>
        <p v-if="loading">Loading...</p>
        <img v-if="props.link && !loading" :src="qrCodeImage" :alt="props.link">
    </div>
</template>

<script setup>

import { ref, watch } from 'vue'
import makeQr from "../qrcode"

const props = defineProps(['link'])

const loading = ref(false)
const qrCodeImage = ref('')

watch(() => props.link, async (newLink) => {
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



img {
    width: 256px;
    height: 256px;
}
</style>