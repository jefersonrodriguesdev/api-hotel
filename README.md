# API de Gestão Hotel Senac

Projeto desenvolvido para a disciplina de Desenvolvimento de Serviços e APIs, focado na criação de uma API RESTful para o gerenciamento de reservas de um hotel, utilizando Node.js e Express.

Este projeto cobre as funcionalidades de gestão de quartos, clientes e reservas, implementando regras de negócio e autenticação de usuários.

## Funcionalidades (Aluno 1)

- **Gestão de Quartos:** CRUD completo para tipos de quarto e quartos.
- **Gestão de Usuários:** Cadastro (`/registrar`) e Autenticação (`/login`) com senhas seguras (bcrypt) e JSON Web Tokens (JWT).
- **Gestão de Reservas:** CRUD completo para reservas.
- **Regras de Negócio:**
  - Não permite reservas conflitantes no mesmo período.
  - Não permite reservas que excedam a capacidade máxima do quarto.

## Arquitetura

O projeto utiliza uma arquitetura em camadas para separação de responsabilidades:
- **`routes`**: Define os endpoints da API.
- **`controllers`**: Recebe as requisições e envia as respostas.
- **`services`**: Contém toda a lógica e regras de negócio.
- **`repositories`**: Camada de abstração para acesso aos dados (em memória).
- **`middleware`**: Contém os middlewares de autenticação e tratamento de erros.

## Tecnologias Utilizadas

- Node.js
- Express
- jsonwebtoken (para autenticação JWT)
- bcrypt (para hash de senhas)
- express-async-errors (para tratamento de erros)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- Git

### 1. Clone o repositório

```bash
git clone [https://github.com/jefersonrodriguesdev/api-hotel.git] (https://github.com/jefersonrodriguesdev/api-hotel.git)

cd jefersonrodriguesdev/api-hotel.git