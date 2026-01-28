## 🚀 Backend CRM Netcom

API REST desenvolvida para dar suporte ao **CRM Netcom**, responsável pela **gestão acadêmica e comercial**, processamento de dados, filtros avançados e geração de informações utilizadas em dashboards.

Este backend foi construído com foco em **organização, clareza de responsabilidades e integração eficiente com o frontend**.

---

## 🎯 Visão Geral

O **Backend CRM Netcom** processa os dados da aplicação, permitindo:

- Gestão de **matriculados** e **interessados**
- Filtros avançados por data, categoria e curso
- Busca de dados usados em **relatórios**
- Padronização de respostas para consumo frontend

---

## 🧠 Principais Funcionalidades

✅ Cadastro, consulta, edição e exclusão de **Matriculados** e **Interessados**

✅ Filtros avançados por:
- Intervalo de datas
- Categoria
- Curso

✅ Endpoints de **relatórios** para dashboards

✅ Respostas JSON padronizadas

✅ Tratamento consistente de erros e validações

---

## 📊 Endpoints de Relatórios

A API fornece endpoints específicos para alimentar dashboards, como:

- Total de matrículas por período
- Total de interessados por período
- Matrículas por curso
- Interessados por canal

Esses endpoints foram pensados para **uso direto em gráficos**, evitando processamento desnecessário no frontend.

---

## 🛠️ Tecnologias Utilizadas

- 🟢 **Node.js**
- 🚀 **Express.js**
- 🗄️ **Banco de dados relacional** (com ORM Sequelize)
- 🔗 **API REST**

---

## 🧩 Arquitetura e Boas Práticas

- Separação clara de responsabilidades:
  - **Controllers**: lógica das requisições
  - **Models**: estrutura e regras dos dados
  - **Routes**: definição dos endpoints
- Código organizado, legível e escalável
- Padronização de respostas HTTP

Este backend reflete preocupações reais de um desenvolvedor **Full Stack**, pensando em **manutenção e crescimento do sistema**.

---

## 🔗 Integração com Frontend

O backend é consumido diretamente pelo **Frontend CRM Netcom**, formando uma solução **Full Stack completa**:
O frontend dessa aplicação pode ser visto em: https://github.com/eduardocprogramador/frontend_crm_netcom

