# API de Gestão Hoteleira - Hotel Senac

Projeto acadêmico desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas. Trata-se de uma API RESTful completa para o gerenciamento de um hotel, integrando funcionalidades de **Reserva de Quartos** e **Controle de Estadia**.

A aplicação foi construída seguindo arquitetura em camadas, utilizando **Node.js** com **ES Modules**, e opera com persistência de dados em memória.

## 🚀 Funcionalidades

O sistema integra dois módulos principais:

### Módulo 1: Gestão de Reservas
- **Gerenciamento de Quartos:** Cadastro de quartos e tipos de quarto (Simples, Duplo, Suíte).
- **Controle de Reservas:**
  - Criação de reservas com validação de **capacidade** do quarto.
  - Validação de **conflito de datas** (impede *overbooking*).
  - Consulta detalhada (popula dados do cliente e do quarto na resposta).
- **Gestão de Usuários do Sistema:** Cadastro e login administrativo.

### Módulo 2: Controle de Estadia e Hóspedes
- **Gestão de Hóspedes:** CRUD completo para cadastro de hóspedes (separado dos usuários do sistema).
- **Fluxo de Estadia:**
  - **Check-in:** Valida hóspede e inicia a estadia.
  - **Check-out:** Calcula automaticamente o valor total com base nas diárias e na data de saída.
- **Relatórios:** Listagem de estadias com filtros por cliente, mês e ano.

## 🛠 Tecnologias e Arquitetura

- **Linguagem:** Node.js (JavaScript Moderno - ES Modules)
- **Framework:** Express.js
- **Segurança:**
  - `jsonwebtoken` (JWT) para autenticação e proteção de rotas.
  - `bcrypt` para hash seguro de senhas.
- **Tratamento de Erros:** Middleware global de erros (`express-async-errors`) com classe personalizada `ApiError` para respostas HTTP padronizadas.
- **Arquitetura:** Camadas bem definidas:
  - `Routes` (Definição de endpoints)
  - `Controllers` (Validação de entrada e resposta)
  - `Services` (Regras de negócio complexas)
  - `Repositories` (Acesso aos dados em memória)

---

## ⚙️ Como Executar

### Pré-requisitos
- Node.js (v14 ou superior)
- Git

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU-USUARIO/api-hotel.git](https://github.com/SEU-USUARIO/api-hotel.git)
cd api-hotel