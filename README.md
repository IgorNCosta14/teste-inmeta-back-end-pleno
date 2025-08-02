# Teste INMETA – Back-End Pleno

Este projeto é uma API RESTful desenvolvida em Node.js com TypeScript para gerenciar a documentação obrigatória de colaboradores. Seu principal objetivo é permitir o cadastro de colaboradores, o vínculo com tipos de documentos exigidos, o envio desses documentos e o acompanhamento do status de envio.

A API facilita o controle do fluxo de documentação ao permitir que usuários verifiquem quais documentos foram enviados e quais ainda estão pendentes, com suporte a filtros e paginação.

## Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **Node.js**
- **TypeScript**
- **Express**
- **TypeORM**
- **PostgreSQL**
- **TSyringe**
- **class-validator**
- **Jest**

## Instalação e Uso

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passo a passo

1. **Clone o repositório**

```bash
git clone https://github.com/IgorNCosta14/teste-inmeta-back-end-pleno.git
cd teste-inmeta-back-end-pleno
```
2. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env` e edite conforme necessário:

```bash
cp .env.example .env
```
3. **Suba os containers com Docker Compose**

```bash
docker-compose up --build -d
```

4. **Acesse a API**

```bash
http://localhost:3000
```

## Testes

Este projeto possui testes unitários implementados com [Jest](https://jestjs.io/).

1. **Instale as dependências (caso ainda não tenha feito)**

```bash
npm install
```

2. **Executar todos os testes**

```bash
npm test
```

3. Gerar relatório de cobertura de testes

```bash
npm run test:cov
```

O relatório será gerado no diretório `./coverage/lcov-report/index.html` e pode ser aberto no navegador para visualização.

## Estrutura do Projeto

```text
├── src
│   ├── app
│   │   ├── document (documents + document types)
│   │   │   ├── controllers      # Controllers
│   │   │   ├── dtos             # DTOs
│   │   │   ├── entities         # Entidades
│   │   │   ├── enums            # Enumerações
│   │   │   ├── repositories     # Repositórios
│   │   │   └── useCases         # Casos de uso
│   │   └── employee
│   │       ├── controllers      # Controllers
│   │       ├── dtos             # DTOs
│   │       ├── entities         # Entidades
│   │       ├── repositories     # Repositórios
│   │       └── useCases         # Casos de uso
│
│   ├── config
│   │   └── typeOrm              # Configurações do TypeORM
│
│   ├── infra
│   │   └── routes               # Rotas da aplicação
│
│   ├── shared
│   │   ├── container            # Injeção de dependências com TSyringe
│   │   ├── errors               # Classe e middlewares de tratamento de erros
│   │   └── middlewares          # Middlewares customizados
│
│   └── server.ts                # Ponto de entrada da aplicação
│
├── jest.setup.ts                # Configuração do Jest
├── docker-compose.yml           # Arquivo de definição dos serviços Docker
├── tsconfig.json                # Configuração do TypeScript
├── package.json                 # Dependências e scripts do projeto
└── README.md                    # Documentação do projeto
```

## Endpoints

### Employees
`POST /employees`
* **Descrição**: Cria um novo colaborador.
* **Body**: 
```json
{
    "name": "name",
    "hiredAt": "2025-07-30"
}
```

`GET /employees`
* **Descrição**: Lista de todos os colaboradores.
* **Query**: 
```json
{
  "page": 1,
  "limit": 100,
  "order": "ASC | DESC"
}
```
  
`GET /employees/:id`
* **Descrição**: Lista os documentos enviados e pendentes de um colaborador específico.
* **Params**: 
```json
{
  "id": "9a5701be-cb3a-4663-9919-2c8f6dd58021"
}
```
  
`PUT /employees/:id`
* **Descrição**: Atualiza os dados de um colaborador existente.
* **Params**: 
```json
{
  "id": "9a5701be-cb3a-4663-9919-2c8f6dd58021"
}
```
  
### Document Types
`POST /document-types`
* **Descrição**: Cadastra um novo tipo de documento.
* **Body**: 
```json
{
    "name": "CNH"
}
```

`GET /document-types`
* **Descrição**: Retorna todos os tipos de documentos ativos.

`DELETE /document-types/:id`
* **Descrição**: Exclui um tipo de documento.
* **Params**: 
```json
{
  "id": "9a5701be-cb3a-4663-9919-2c8f6dd58021"
}
```

### Documents
`POST /documents`
* **Descrição**: Cria um ou mais documentos para um colaborador.
* **Body**: 
```json
{
    "documents": [
        {
            "name": "Document name",
            "url": null,
            "employeeId": "0ba97646-63ec-4476-8afd-8b734a1c2ebc",
            "documentTypeId": "9a5701be-cb3a-4663-9919-2c8f6dd58021"
        }
    ]
}
```

`POST /documents/remove`
* **Descrição**: Deleta um ou mais documentos.
* **Body**: 
```json
{
    "ids": [ 
        "171bff5e-33a3-4ca2-84bc-971a044c37ab"
    ]
}
```

`GET /documents`
* **Descrição**: Lista todos os documentos.
* **Query**: 
```json
{
  "employeeId": "171bff5e-33a3-4ca2-84bc-971a044c37ab",
  "documentTypeId": "171bff5e-33a3-4ca2-84bc-971a044c37ab",
  "status": "pending | sent",
  "page": 1,
  "limit": 100,
  "order": "ASC | DESC"
}
```

`PUT /documents/:id/send`
* **Descrição**: Salvar url de um documento e marcá-lo enviado.
* **Body**: 
```json
{
    "url": "url"
}
```
* **Params**: 
```json
{
  "id": "9a5701be-cb3a-4663-9919-2c8f6dd58021"
}
```
