# API de Vendas

## Descrição

Esta API permite o gerenciamento de vendas, incluindo a criação de vendas, e de compras associadas.

Após criar uma venda, é possível gerar uma compra. Ao clicar em gerar compra, você escolhe a venda, e qual produto você quer adiconar a sua compra,
permitindo escolher produtos de diferentes vendas

## Tecnologias Utilizadas

- **Backend:** NestJS
- **Frontend:** Next.js
- **Banco de Dados:** Postgresql+Prisma ORM rodando em docker
- **Documentação da API:** Swagger (acessível em `http://localhost:3000/api`)

## Estrutura do Projeto

- **Backend :** Contém a implementação da API RESTful utilizando NestJS.
- **Frontend:** Interface de usuário construída com Next.js para interação com a API.

## Endpoints

### Vendas

- **GET /venda**: Retorna todas as vendas.
- **GET /venda{id} **: Retorna uma venda e seus produtos associados.
- **POST /venda**: Cria uma nova venda.

### Produtos

- **GET /produto**: Retorna todos os produtos.
- **GET /produtos/venda/{id} **: Retorna todos os produtos associados a uma venda
- **POST /produto**: Cria um novo produto. 

### Compras

- **GET /compra**: Retorna todas as compras.
- **POST /compra**: Cria uma nova compra associada a uma venda.
- **GET /compra/{id}**: Retorna uma compra específica pelo ID.

## Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/Laretz/Shopify.git
     rodar backend = npm run start:dev
     rodar frontend = npm run dev
     rodar bd no navegador = npx prisma studio


   
   ```
