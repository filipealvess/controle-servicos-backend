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
```env
# porta onde o servidor executará
SERVER_PORT = 

# link do banco de dados MySQL
DATABASE_URL = 
```

4. Instale as dependências
```
npm install
```

5. Execute a aplicação
```
npm start
```
