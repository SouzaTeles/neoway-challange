<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'
import { authService } from '@/services/auth.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

onMounted(() => {
  if (authService.isAuthenticated()) {
    router.push('/')
  }
})

const handleSubmit = async (event) => {
  event.preventDefault()
  isLoading.value = true

  try {
    await login(email.value, password.value)
    authService.setAuthenticated()
    router.push('/')
  } catch (err) {
    alert('Erro ao fazer login. Verifique as credenciais.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <form class="login-card" @submit="handleSubmit">
      <h2>Login</h2>
      <p class="subtitle">Entre para acessar o cadastro e a lista de documentos</p>
      <label>
        E-mail
        <input type="email" v-model="email" required />
      </label>

      <label>
        Senha
        <input type="password" v-model="password" required />
      </label>
      <button class="btn-primary" type="submit" :disabled="isLoading">
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: gainsboro;
}

.login-card {
  background: white;
  padding: 32px 28px;
  border-radius: 6px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h2 {
  margin: 0;
}

.subtitle {
  margin: 0;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}

input {
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #d0d0d0;

  &:focus-visible {
    outline: #4546cc 2px solid;
  }
}

button.btn-primary {
  margin-top: 8px;
  width: 100%;
}
</style>
