# Controle de Serviços
Backend da aplicação [Controle de Serviços](https://github.com/filipealvess/controle-servicos), que ajuda no gerenciamento de prestadores de serviço.

## Tecnologias
- **Node:** servidor
- **Express:** rotas
- **Bcryptjs:** criptografia
- **MySQL:** banco de dados

## Como executar
> Confira se você possui o Git e o NodeJS intalados na sua máquina! ;)

1. Clone o repositório
```
git clone https://github.com/filipealvess/controle-servicos-backend.git
```

2. Entre na pasta do projeto
```
cd controle-servicos-backend
```

3. Crie um arquivo `.env` com os seguintes dados
> Para facilitar a criação das tabelas do banco de dados, você pode importar o arquivo [`database.sql`](.github/database.sql) no seu provedor de banco de dados

```env
# endereço do provedor do banco de dados
DB_HOST = 

# nome do banco de dados
DB_NAME = 

# usuário do banco de dados
DB_USER = 

# senha do banco de dados
DB_PASS = 
```

4. Instale as dependências
```
npm install
```

5. Execute a aplicação
```
npm start
```

## Importação
Para testar a importação de dados, você pode utilizar o arquivo [`spreadsheet.csv`](.github/spreadsheet.csv).
