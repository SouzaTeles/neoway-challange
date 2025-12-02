<script setup>
import { ref } from 'vue';
import AppHeader from './components/Header.vue';
import DocumentRegister from './components/DocumentRegister.vue';
import DocumentList from './components/DocumentList.vue';
import Login from './components/Login.vue';

const isAuthenticated = ref(false);

const handleLoggedIn = () => {
	isAuthenticated.value = true;
};
</script>

<template>
  <main>
		<Login v-if="!isAuthenticated" @logged-in="handleLoggedIn" />
		<template v-else>
			<AppHeader/>
			<div class="container">
				<DocumentRegister />
				<DocumentList />
			</div>
		</template>
  </main>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  font-family: sans-serif;
}

main {
  background: gainsboro;
  height: 100vh;
}

.container {
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
}
</style>
