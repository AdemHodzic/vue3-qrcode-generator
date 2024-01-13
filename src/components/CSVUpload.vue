<template>
    <div id="drop_zone" @drop.prevent="dropHandler" @dragover="onDragOver" @dragenter.prevent @dragover.prevent>
        <h1>...or drag CSV file to create multiple QR codes and download them as zip file</h1>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue'
import Papa from 'papaparse'
import JSZip from 'jszip'

import makeQr from "../qrcode"

const links = ref([])

watch(links, async (newLinks) => {

    const zip = new JSZip();

    const newQRCodes = await Promise.all(newLinks.map(async (link) => {
        const qr = await makeQr(link)
        return { link, qr: qr.replace(/data:.*?;base64,/, "") }
    }))



    newQRCodes.forEach(({ link, qr }) => {
        return zip.file(`${link}.png`, qr, { base64: true })
    })

    zip.generateAsync({ type: "base64" }).then(data => window.location.href = "data:application/zip;base64," + data)
})


const dropHandler = (ev) => {

    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                if (file.type === "text/csv") {
                    Papa.parse(file, {
                        complete: function (results) {
                            links.value = results.data
                        }
                    });
                }
            }
        });
    }
}

const onDragOver = () => {
    console.log('dragging over')
}

</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #ccc;
    height: 100%;
}

h1 {
    font-size: 3rem;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    margin: 0;
    padding: 0;
    opacity: 0.8;
    color: var(--input-text-color);
}
</style>

