<script setup>
import { ref, onMounted, watch } from 'vue'
import { listDocuments, toggleBlocklist, deleteDocument } from '@/api/documents'

const props = defineProps({
  reload: {
    type: Boolean,
    default: false,
  },
})

const documents = ref([])
const isLoading = ref(false)
const showMenu = ref(null)

const type = ref('all')
const search = ref('')
const orderBy = ref('desc')
const blocklisted = ref('all')

async function fetchDocuments() {
  isLoading.value = true
  const filters = {}

  if (search.value) {
    filters.document = search.value
  }

  if (type.value !== 'all') {
    filters.type = type.value
  }

  if (blocklisted.value !== 'all') {
    filters.blocklisted = blocklisted.value
  }

  if (orderBy.value) {
    filters.orderBy = orderBy.value
  }

  try {
    documents.value = await listDocuments(filters)
  } catch (err) {
    alert('Não foi possível carregar os documentos.')
    documents.value = []
  } finally {
    isLoading.value = false
  }
}

const handleFilter = (event) => {
  event.preventDefault()
  fetchDocuments()
}

const toggleBlockDocument = async (id, blocklisted) => {
  const confirmed = window.confirm('Tem certeza que deseja bloquear/desbloquear este documento?')
  if (!confirmed) return

  try {
    await toggleBlocklist(id, blocklisted);
    await fetchDocuments()
  } catch (err) {
    alert('Erro ao excluir documento. Tente novamente.')
  }
}

const removeDocument = async (id) => {
  const confirmed = window.confirm('Tem certeza que deseja excluir este documento?')
  if (!confirmed) return

  try {
    await deleteDocument(id)
    await fetchDocuments()
  } catch (err) {
    alert('Erro ao excluir documento. Tente novamente.')
  }
}

const toggleMenu = (id) => {
  if (showMenu.value === id) {
    showMenu.value = null
  } else {
    showMenu.value = id
  }
}

const closeMenu = () => {
  showMenu.value = null
}

onMounted(() => {
  fetchDocuments()
})

watch(
  () => props.reload,
  () => {
    showMenu.value = null
    fetchDocuments()
  }
)
</script>

<template>
  <section class="document-list">
    <form class="filters" @submit="handleFilter">
      <label class="form-group" for="search">
        Buscar:
        <input type="text" name="search" id="search" v-model="search" v-mask="'#'" maxlength="14"
          placeholder="Buscar documento..." />
      </label>
      <label class="form-group" for="type">
        Tipo:
        <select name="type" id="type" v-model="type">
          <option value="all">Todos</option>
          <option value="cpf">CPF</option>
          <option value="cnpj">CNPJ</option>
        </select>
      </label>
      <label class="form-group" for="blocklisted">
        Filtrar por bloqueio:
        <select name="blocklisted" id="blocklisted" v-model="blocklisted">
          <option value="all">Todos</option>
          <option value="true">Bloqueados</option>
          <option value="false">Não bloqueados</option>
        </select>
      </label>
      <label class="form-group" for="orderBy">
        Ordenar por:
        <select name="orderBy" id="orderBy" v-model="orderBy">
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
      </label>
      <label class="form-group" for="">
        <button type="submit" class="btn-primary btn-search" :disabled="isLoading">
          {{ isLoading ? 'Buscando...' : 'Buscar' }}
        </button>
      </label>
    </form>
    <div class="list">
      <h2>Lista de Documentos</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Número</th>
            <th>Status</th>
            <th>Data de cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!documents.length">
            <td colspan="5">Nenhum documento encontrado.</td>
          </tr>
          <tr v-else v-for="doc in documents" :key="doc.id">
            <td>{{ doc.type }}</td>
            <td>{{ doc.document }}</td>
            <td>{{ doc.blocklisted ? 'Bloqueado' : 'Ativo' }}</td>
            <td>{{ new Date(doc.createdAt).toLocaleDateString('pt-BR') }}</td>
            <td>
              <div class="dropdown" @blur="closeMenu">
                <button class="dropdown-btn" @click="toggleMenu(doc.id)">⋯</button>
                <div v-if="showMenu === doc.id" class="dropdown-menu">
                  <button @click.stop="toggleBlockDocument(doc.id, !doc.blocklisted)">
                    {{ doc.blocklisted ? 'Desbloquear' : 'Bloquear' }}
                  </button>
                  <button @click.stop="removeDocument(doc.id)">Excluir</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>



<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.document-list {
  flex: 1;
  width: 100%;
}

.filters {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 20px;
  background: $white;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: $shadow-md;
  border-radius: $card-radius;
}

table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  background: $white;
  border-radius: $card-radius;
  box-shadow: $shadow-md;
}

tr {
  border-bottom: 1px solid $border-color;
}

thead th {
  &:first-child {
    border-top-left-radius: $card-radius;
  }

  &:last-child {
    border-top-right-radius: $card-radius;
  }
}

th,
td {
  padding: 12px 16px;
  text-align: left;
}

th {
  background-color: $gray-100;
}

tbody {
  tr {
    &:last-child {
      border-bottom: none;
      td:first-child {
        border-bottom-left-radius: $card-radius;
      }

      td:last-child {
        border-bottom-right-radius: $card-radius;
      }
    }

    &:hover {
      background-color: $gray-50;
    }
  }
}

.form-group {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

input[type="text"],
select {
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
  padding: 10px 16px;
  background-color: $bg-primary;
  border: none;
  border-radius: $card-radius;

  &:focus-visible {
    outline: $primary 2px solid;
  }
}

.btn-search {
  margin-top: auto;
}

@media (max-width: 600px) {
  .form-group {
    width: 100%;
  }

  .list {
    overflow: visible;
    overflow-x: scroll;
  }
}

.dropdown {
  position: relative;
  display: inline-block;
  outline: none;
}

.dropdown-btn {
  transform: rotate(90deg);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background-color: $gray-200;
  }
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: $white;
  border: 1px solid $gray-400;
  border-radius: 4px;
  box-shadow: $shadow-md;
  z-index: 1000;
  min-width: 120px;

  button {
    width: 100%;
    padding: 8px 12px;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
      background-color: $gray-100;
    }
  }
}
</style>
