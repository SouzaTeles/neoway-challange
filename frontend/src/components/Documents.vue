<script setup>
import { ref } from 'vue';
import AppHeader from './AppHeader.vue';
import DocumentRegister from './DocumentRegister.vue';
import DocumentList from './DocumentList.vue';

const reloadFlag = ref(false);

const handleDocumentRegistered = () => {
  reloadFlag.value = !reloadFlag.value;
};
</script>

<template>
  <div>
    <AppHeader />
    <div class="container">
      <DocumentRegister @registered="handleDocumentRegistered" class="grow-on-mobile"/>
      <DocumentList :reload="reloadFlag" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  justify-content: space-between;
}

@media (max-width: 1010px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
