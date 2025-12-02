<template>
  <aside class="register-document">
    <h2>Cadastrar Documento</h2>
    <h3>Adicione um CPF ou CNPJ ao sistema</h3>
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
      <input type="text" ref="documentInputRef" :key="documentType" v-model="documentNumber" v-mask="computedMask"
        :placeholder="placeholder" :maxlength="maxLength" @keyup.enter="registerDocument" />
    </label>
    <button class="btn-blue" @click="registerDocument" :disabled="!isRegisterEnabled()">Cadastrar</button>
  </aside>
</template>

<script>
import { ref, computed } from 'vue'
import { isValidCPF, isValidCNPJ } from "cnpj-cpf-validator";

const TYPE_CPF = "CPF";
const TYPE_CNPJ = "CNPJ";

export default {
  name: 'DocumentRegister',
  setup() {
    const documentInputRef = ref(null)
    const documentType = ref('CPF')
    const documentNumber = ref('')

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
    }

    return {
      documentType,
      documentNumber,
      computedMask,
      placeholder,
      maxLength,
      isRegisterEnabled,
      registerDocument,
      documentInputRef,
    }
  }
}
</script>


<style scoped>
.btn-blue {
  margin-top: 10px;
  height: 56px;
  background-color: #1b1b96;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: .3s;

  &:disabled {
    background-color: #A8A8D8;
    cursor: not-allowed;
  }
}

.register-document {
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: white;
}

h2 {
  color: #1b1b96;
  margin-bottom: 5px;
}

h3 {
  color: #666;
  font-size: 14px;
  font-weight: normal;
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
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
