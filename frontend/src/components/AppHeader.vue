<template>
  <header>
    <div class="container">
      <h1>Sistema de documentos</h1>
      <button @click="handleLogout">Logout</button>
    </div>
  </header>
</template>

<script setup>
import { logout } from '@/api/auth';

const emit = defineEmits(['logout']);
const handleLogout = async (event) => {
  event.preventDefault()

  try {
    await logout()
    emit('logout')
  } catch (err) {
    alert('Erro ao fazer logout.')
  }
}
</script>

<style scoped>
header {
  color: white;
  width: 100%;
  height: 70px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  font-family: sans-serif;
  background-color: #1b1b96;
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
  color: white;
  border: none;
  cursor: pointer;

  &::hover {
    text-decoration: underline;
  }
}
</style>
