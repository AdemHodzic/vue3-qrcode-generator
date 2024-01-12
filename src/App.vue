<script setup>
import SingleLink from './components/SingleLink.vue';
import CSVUpload from './components/CSVUpload.vue';

</script>

<template>
  <div class="container">
    <SingleLink />
    <CSVUpload />
  
  </div>

</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 50%;
  height: 100%;
  width: 100%;
}
</style>
