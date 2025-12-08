<template>
  <header>
    <div class="container">
      <h1>Sistema de documentos</h1>
      <button @click="handleLogout">Logout</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout } from '@/api/auth';
import { authService } from '@/services/auth.js';

const router = useRouter()

const handleLogout = async (event) => {
  event.preventDefault()

  if (!confirm('Tem certeza que deseja sair?')) {
    return
  }

  try {
    await logout()
    authService.setUnauthenticated()
    router.push('/login')
  } catch (err) {
    alert('Erro ao fazer logout.')
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

header {
  color: $white;
  width: 100%;
  height: 70px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  font-family: sans-serif;
  background-color: $primary;
}

h1 {
  font-size: 24px;
  text-align: left;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background: none;
  border: none;
  color: $white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
}
</style>
