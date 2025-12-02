<script setup>
import { ref, onMounted } from 'vue'
import { listDocuments } from '@/api/documents'

const documents = ref([])

async function fetchDocuments() {
  try {
    documents.value = await listDocuments()
  } catch (err) {
    alert('Não foi possível carregar os documentos.')
    documents.value = []
  }
}

onMounted(() => {
  fetchDocuments()
})
</script>

<template>
  <section class="list-document">
    <div class="filters">
      <label for="search">
        Buscar:
        <input type="text" name="search" id="search" placeholder="Buscar documento..." />
      </label>
      <label for="type">
        Tipo:
        <select name="type" id="type">
          <option value="all">Todos</option>
          <option value="cpf">CPF</option>
          <option value="cnpj">CNPJ</option>
        </select>
      </label>
      <label for="blocklisted">
        Filtrar por bloqueio:
        <select name="blocklisted" id="blocklisted">
          <option value="all">Todos</option>
          <option value="true">Bloqueados</option>
          <option value="false">Não bloqueados</option>
        </select>
      </label>
      <label for="orderBy">
        Ordenar por:
        <select name="orderBy" id="orderBy">
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
      </label>
    </div>
    <div class="documents-list">
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
              <button>Bloquear</button>
              <button>Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped lang="scss">
.list-document {
  flex: 1;
  margin-left: 20px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f5f5f5;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

label {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

input[type="text"],
select {
  margin-top: 8px;
  height: 56px;
  padding: 0 16px;
  background-color: #f2f5fc;
  border: none;
  border-radius: 6px;

  &:focus-visible {
    outline: #4546cc 2px solid;
  }
}
</style>
