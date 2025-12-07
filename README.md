# API de Gestão Hoteleira – Hotel Senac

Projeto acadêmico desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas.  
Trata-se de uma **API RESTful** completa para o gerenciamento de um hotel, integrando funcionalidades de:

- **Reserva de Quartos** (Aluno 1)
- **Controle de Estadia e Hóspedes** (Aluno 2)

A aplicação segue arquitetura em camadas, utiliza **Node.js + Express** com **ES Modules** e faz **persistência de dados em banco PostgreSQL**.

---

## 🚀 Funcionalidades

### Módulo 1 – Reserva de Quartos (Aluno 1)

- **Tipos de Quarto**
  - Cadastro de tipos (Simples, Duplo, Suíte) com capacidade de hóspedes.
  - Evita cadastro duplicado de tipo.
- **Quartos**
  - Cadastro de quartos com número, tipo, valor da diária e status.
  - Validação se o tipo de quarto existe.
- **Reservas**
  - Criação de reservas relacionando **quarto** e **cliente**.
  - Regras de negócio:
    - Validação de **capacidade** de pessoas do quarto.
    - Validação de **conflito de datas** para evitar overbooking.
  - CRUD completo com busca por ID.
- **Usuários do Sistema**
  - Cadastro e login com e-mail e senha.
  - Autenticação com **JWT**.
  - Integração com **OAuth Google** (login com conta Google).

---

### Módulo 2 – Controle de Estadia (Aluno 2)

- **Hóspedes (Clientes do Hotel)**
  - CRUD completo com nome, CPF, telefone e e-mail.
  - Separado dos usuários do sistema (quem usa a API).
- **Estadias**
  - **Check-in:**
    - Valida se o hóspede existe.
    - Registra início da estadia.
  - **Check-out:**
    - Calcula automaticamente:
      - diferença entre datas,
      - quantidade de diárias cobradas (no mínimo 1),
      - valor total da estadia (`diasCobrados × valorDiaria`).
    - Atualiza a estadia no banco com `dataSaida`, `diasCobrados` e `valorTotal`.
- **Relatórios**
  - Relatório de estadias com filtros por:
    - `clienteId` (opcional),
    - mês,
    - ano.

---

## 🛠 Tecnologias e Arquitetura

- **Linguagem:** Node.js (ES Modules)
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL (via `pg`)
- **Segurança:**
  - `jsonwebtoken` para autenticação JWT.
  - `bcrypt` para hash de senhas.
  - `passport` + `passport-google-oauth20` para login com Google.
- **Documentação:**
  - `swagger-ui-express` servindo um documento **OpenAPI 3.0** em `/api/docs`.
- **Tratamento de Erros:**
  - `express-async-errors` para capturar exceções assíncronas.
  - Classe `ApiError` para respostas padronizadas com `statusCode` e `message`.
- **Arquitetura em Camadas:**
  - `routes/` → define os endpoints REST.
  - `controllers/` → lidam com `req`/`res` e chamam os services.
  - `services/` → regras de negócio e validações.
  - `repositories/` → acesso ao banco PostgreSQL.
  - `database/` → configuração do pool de conexão e script de criação de tabelas.
  - `middleware/` → autenticação JWT e tratamento de erros.

---

## 📁 Estrutura Simplificada do Projeto

```text
src/
  app.js              # Configuração da aplicação Express
  server.js           # Sobe o servidor HTTP

  config/
    passport.js       # Estratégia de OAuth Google
    swagger.js        # Configuração do Swagger UI

  database/
    index.js          # Conexão com PostgreSQL
    init.js           # Script para criar as tabelas

  routes/
    auth.routes.js
    usuario.routes.js
    tipoQuarto.routes.js
    quarto.routes.js
    hospede.routes.js
    reserva.routes.js
    estadia.routes.js

  controllers/
    usuario.controller.js
    tipoQuarto.controller.js
    quarto.controller.js
    hospede.controller.js
    reserva.controller.js
    estadia.controller.js
    relatorio.controller.js

  services/
    usuario.service.js
    tipoQuarto.service.js
    quarto.service.js
    hospede.service.js
    reserva.service.js
    estadia.service.js
    relatorio.service.js

  repositories/
    usuario.repository.js
    tipoQuarto.repository.js
    quarto.repository.js
    hospede.repository.js
    reserva.repository.js
    estadia.repository.js

  middleware/
    auth.middleware.js
    errorHandler.middleware.js

  errors/
    ApiError.js

  docs/
    openapi.json       # Especificação OpenAPI para o Swagger
