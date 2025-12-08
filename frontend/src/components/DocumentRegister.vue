<template>
  <aside class="register-document">
    <h2>Cadastrar Documento</h2>
    <h3 class="subtitle">Adicione um CPF ou CNPJ ao sistema</h3>
    <div class="options">
      <label>
        <input type="radio" name="documentType" value="CPF" v-model="documentType" @change="documentNumber = ''" />
        CPF
      </label>
      <label>
        <input type="radio" name="documentType" value="CNPJ" v-model="documentType" @change="documentNumber = ''" />
        CNPJ
      </label>
    </div>
    <label class="document-input">
      Número do documento
      <input type="text" ref="documentInputRef" :key="documentType" v-model="documentNumber" v-mask="computedMask" :placeholder="placeholder" :maxlength="maxLength" @keyup.enter="registerDocument" />
    </label>
    <button class="btn-primary" @click="registerDocument" :disabled="!isRegisterEnabled() || isLoading">
      {{ isLoading ? 'Cadastrando...' : 'Cadastrar' }}
    </button>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { isValidCPF, isValidCNPJ } from 'cnpj-cpf-validator'
import { saveDocument } from '@/api/documents'

const TYPE_CPF = 'CPF'
const TYPE_CNPJ = 'CNPJ'

const emit = defineEmits(['registered'])

const documentInputRef = ref(null)
const documentType = ref('CPF')
const documentNumber = ref('')
const isLoading = ref(false)

const computedMask = computed(() => {
  return documentType.value === TYPE_CPF ? '###.###.###-##' : '##.###.###/####-##'
})

const placeholder = computed(() => {
  return documentType.value === TYPE_CPF ? '000.000.000-00' : '00.000.000/0000-00'
})

const maxLength = computed(() => {
  return documentType.value === TYPE_CPF ? 14 : 18
})

const isRegisterEnabled = () => {
  const cleanNumber = documentNumber.value.replace(/\D/g, '')
  if (documentType.value === TYPE_CPF) {
    return cleanNumber.length === 11
  } else {
    return cleanNumber.length === 14
  }
}

const registerDocument = () => {
  const cleanNumber = documentNumber.value.replace(/\D/g, '')
  let isValid = false

  if (documentType.value === TYPE_CPF) {
    isValid = isValidCPF(cleanNumber)
  } else {
    isValid = isValidCNPJ(cleanNumber)
  }

  if (!isValid) {
    alert('Número de documento inválido.')
    documentNumber.value = ''
    documentInputRef.value.focus()
    return
  }

  isLoading.value = true
  saveDocument(documentType.value, cleanNumber)
    .then(() => {
      alert('Documento cadastrado com sucesso!')
      documentNumber.value = ''
      documentInputRef.value.focus()
      emit('registered')
    })
    .catch(err => {
      if (err.response?.data?.error) {
        alert(err.response.data.error)
        return
      }
      alert('Erro ao cadastrar documento. Tente novamente.')
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.register-wrapper {
  flex: 1;
  padding: 20px;
  background: $gray-50;
}

.register-document {
  min-width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: $white;
}

h2 {
  color: $primary;
  margin-bottom: 5px;
}

.subtitle {
  margin-bottom: 15px;
}

.document-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #333;
  font-weight: 500;
}

input[type="text"] {
  padding: 10px 12px;
  border: 1px solid $gray-400;
  border-radius: 4px;
}

.btn-primary {
  margin-top: 10px;
}
</style>
