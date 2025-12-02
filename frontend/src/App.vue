<script setup>
import AppHeader from './components/Header.vue';
import DocumentRegister from './components/DocumentRegister.vue';
import DocumentList from './components/DocumentList.vue';
</script>

<template>
  <main>
    <AppHeader />
    <div class="container">
      <DocumentRegister />
      <DocumentList />
    </div>
  </main>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

main {
  background: gainsboro;
  height: 100vh;
}

.container {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}
</style>
