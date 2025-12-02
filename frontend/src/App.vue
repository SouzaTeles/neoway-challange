<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import DocumentRegister from './components/DocumentRegister.vue';
import DocumentList from './components/DocumentList.vue';
import Login from './components/Login.vue';

const isAuthenticated = ref(false);
const reloadFlag = ref(false);

const handleLoggedIn = () => {
	isAuthenticated.value = true;
};

const handleLogout = () => {
  isAuthenticated.value = false;
};

const handleDocumentRegistered = () => {
  reloadFlag.value = !reloadFlag.value;
};
</script>

<template>
  <main>
		<Login v-if="!isAuthenticated" @logged-in="handleLoggedIn" />
		<template v-else>
			<AppHeader @logout="handleLogout" />
			<div class="container">
				<DocumentRegister @registered="handleDocumentRegistered" />
				<DocumentList :reload="reloadFlag" />
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

@media (max-width: 1010px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
