<script setup></script>

<template>
  <main>
    <header>
      <h1>Sistema de documentos - teste</h1>
    </header>
    <div class="container">
      <aside class="register-document">
        <h2>Cadastrar Documento</h2>
        <h3>Adicione um CPF ou CNPJ ao sistema</h3>
        <div class="options">
          <label>
            <input type="radio" name="documentType" value="CPF" checked />
            CPF
          </label>
          <label>
            <input type="radio" name="documentType" value="CNPJ" />
            CNPJ
          </label>
        </div>
        <legend>Número do documento</legend>
        <input type="text" name="document" placeholder="000.000.000-00" />
        <button id="register" class="btn-blue">Cadastrar</button>

      </aside>
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
              <tr>
                <td>CPF</td>
                <td>123.456.789-00</td>
                <td>Ativo</td>
                <td>2024-01-01</td>
                <td>
                  <button>Bloquear</button>
                  <button>Excluir</button>
                </td>
              </tr>
              <tr>
                <td>CNPJ</td>
                <td>12.345.678/0001-00</td>
                <td>Bloqueado</td>
                <td>2024-02-15</td>
                <td>
                  <button>Desbloquear</button>
                  <button>Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
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

header {
  color: white;
  height: 70px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  font-family: sans-serif;
  background-color: #1b1b96;
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

.options {
  margin: 12px 0;
  display: flex;
  flex-direction: row;
  label {
    display: flex;
    flex-direction: row;
    margin-right: 12px;
    input {
      margin-right: 8px;
    }
  }
}

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

.btn-blue {
  height: 56px;
  background-color: #1b1b96;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.register-document {
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: white;
}
</style>
