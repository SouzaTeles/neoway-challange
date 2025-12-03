# Neoway Challenge

Sistema de cadastro e gerenciamento de documentos (CPF/CNPJ)

## Stack
- **Frontend**: Vue 3 + Vite + SCSS
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL
- **Auth**: JWT

## Pré-requisitos
- Docker e Docker Compose

## Primeiros Passos

1. **Iniciar serviços**
   ```bash
   docker compose up -d
   ```

2. **Rodar migrations** (primeira vez apenas)
   ```bash
   docker compose exec backend npx prisma migrate dev
   ```
3. **Reiniciar serviços após migração**
    ```bash
    docker compose restart
    ```

4. **Acessar aplicação**
   - Frontend: http://localhost:8081
   - Backend: http://localhost:3000


## Login na aplicação
Para fazer login: utiliza-se o usuário de testes.
E-mail: admin@example.com
Senha: admin

## Comandos Úteis

```bash
# Rodar migrations
docker compose exec backend npx prisma migrate dev

# Rodar testes
docker compose exec backend npm test

# Ver logs
docker compose logs -f

# Parar serviços
docker compose down
```

## Pendências e melhorias
### Gerais
- Implementação da busca por cep fora do filtro de listagem
- Utilização de typescript (backend e frontend)
- Especificação do build para deploy e também a configuração do build no Dockerfile
- Implementar paginação da listagem

### Backend
- Tabela de usuários e hash bcrypt para senhas
- Melhorar cobertura de testes, adição de testes de unidade
- Adicionar variáveis de ambiente em .env

### Frontend
- Melhor reutilização do css, cores em variaveis no css global
- Utilização do pinea
- Melhorar tratamento dos erros recebidos, ex: componente de login
- Substituir alerts por modais.
- Estilizar botões de ações "Bloquear" e "Excluir".
- Estilizar options dos selects
- Implementar modal de confirmação no logoff
