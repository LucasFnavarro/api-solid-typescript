# 🍕 API Delivery - Sistema de Entrega

> **⚠️ PROJETO DESENVOLVIDO EXCLUSIVAMENTE PARA FINS DE ESTUDO E APRENDIZADO ⚠️**

Este projeto é uma API REST completa para um sistema de delivery, desenvolvida com foco em **Clean Architecture**, **princípios SOLID**, e **boas práticas de desenvolvimento**. O objetivo principal é demonstrar conhecimentos avançados em desenvolvimento backend com Node.js, TypeScript e arquitetura limpa.

## 🎯 Objetivo do Projeto

Este projeto foi criado como um exercício prático para consolidar conhecimentos em:

- **Clean Architecture** (Arquitetura Limpa)
- **Princípios SOLID**
- **Test-Driven Development (TDD)**
- **Design Patterns** (Factory, Repository, Use Cases)
- **TypeScript** avançado
- **Testes automatizados** com Vitest
- **Validação de dados** com Zod
- **Autenticação JWT**
- **Upload de arquivos** com Cloudinary
- **Banco de dados** com Prisma ORM

## 🏗️ Arquitetura e Padrões

### Clean Architecture

O projeto segue os princípios da Clean Architecture, organizando o código em camadas bem definidas:

```
src/
├── modules/
│   ├── users/
│   │   ├── controllers/          # Camada de Interface/Apresentação
│   │   ├── use-cases/            # Camada de Aplicação (Regras de Negócio)
│   │   ├── repositories/         # Camada de Infraestrutura (Dados)
│   │   ├── factories/            # Factory Pattern para Dependências
│   │   ├── errors/               # Erros específicos do domínio
│   │   └── schemas/              # Validação de entrada (Zod)
│   └── address/
├── middlewares/                  # Middlewares customizados
├── config/                       # Configurações externas
├── lib/                          # Bibliotecas e utilitários
└── @types/                       # Definições de tipos TypeScript
```

### Princípios SOLID Aplicados

#### 🔹 Single Responsibility Principle (SRP)
- Cada classe tem uma única responsabilidade bem definida
- Use Cases focados em uma única operação de negócio
- Repositories responsáveis apenas por persistência de dados

#### 🔹 Open/Closed Principle (OCP)
- Interfaces abstratas que permitem extensão sem modificação
- Novos repositórios podem ser criados implementando `IUsersRepository`

#### 🔹 Liskov Substitution Principle (LSP)
- Implementações concretas podem substituir abstrações sem quebrar funcionalidade
- `PrismaUsersRepository` e `InMemoryUserRepository` são intercambiáveis

#### 🔹 Interface Segregation Principle (ISP)
- Interfaces específicas e coesas
- Clientes não dependem de métodos que não utilizam

#### 🔹 Dependency Inversion Principle (DIP)
- Use Cases dependem de abstrações, não de implementações concretas
- Injeção de dependência através de construtores
- Factory Pattern para criação de dependências

## 🛠️ Tecnologias e Ferramentas

### Backend Core
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem tipada
- **Fastify** - Framework web rápido e eficiente
- **Prisma ORM** - Object-Relational Mapping
- **PostgreSQL** - Banco de dados relacional

### Autenticação e Segurança
- **JWT (JSON Web Tokens)** - Autenticação stateless
- **bcryptjs** - Hash de senhas
- **@fastify/jwt** - Plugin JWT para Fastify
- **@fastify/cookie** - Gerenciamento de cookies

### Validação e Tipagem
- **Zod** - Schema validation e parsing
- **TypeScript** - Sistema de tipos estático

### Upload e Mídia
- **Cloudinary** - Serviço de upload e processamento de imagens
- **@fastify/multipart** - Upload de arquivos

### Testes
- **Vitest** - Framework de testes moderno e rápido
- **In-Memory Repository** - Testes isolados sem banco de dados

### DevOps e Tooling
- **tsx** - Execução TypeScript em desenvolvimento
- **tsup** - Build tool para TypeScript
- **Prisma CLI** - Migrations e gerenciamento do banco

## 🧪 Estratégia de Testes

### Test-Driven Development (TDD)
O projeto segue a metodologia TDD com foco em:
- **Testes unitários** para Use Cases
- **Repository Pattern** para isolamento de dados
- **In-Memory Repository** para testes rápidos e determinísticos
- **Cobertura de cenários** de sucesso e erro

### Estrutura de Testes
```typescript
// Exemplo de teste para Use Case
describe("Register User Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new RegisterUserUseCase(inMemoryRepository);
  });

  it("deve cadastrar um novo usuário", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      phone: "(11) 99999-9999"
    });

    expect(result.user.email).toBe("john@example.com");
  });
});
```

## 🔧 Funcionalidades Implementadas

### 👤 Gestão de Usuários
- ✅ Cadastro de usuários
- ✅ Autenticação (login/logout)
- ✅ Perfil do usuário
- ✅ Atualização de dados
- ✅ Upload de avatar
- ✅ Exclusão de conta
- ✅ Listagem de usuários

### 📍 Gestão de Endereços
- ✅ Cadastro de endereços
- ✅ Listagem de endereços do usuário
- ✅ Associação usuário-endereço

### 🔐 Sistema de Autenticação
- ✅ JWT com refresh token
- ✅ Middleware de verificação
- ✅ Controle de roles (ADMIN, CLIENT, DELIVERYMAN, RESTAURANT)
- ✅ Proteção de rotas sensíveis

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Conta no Cloudinary (para upload de imagens)

### Configuração

1. **Clone o repositório**
```bash
git clone <repository-url>
cd api-delivery
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env baseado em .env.example
DATABASE_URL="postgresql://user:password@localhost:5432/delivery"
JWT_SECRET="your-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
PORT=3000
NODE_ENV="development"
```

4. **Execute as migrations**
```bash
npx prisma migrate dev
```

5. **Inicie o servidor**
```bash
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev        # Modo desenvolvimento com watch
npm run test       # Executa todos os testes
npm run test:watch # Testes em modo watch
```

## 🎨 Design Patterns Implementados

### 🏭 Factory Pattern
Criação centralizada de Use Cases com todas as dependências:
```typescript
export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository);

  return registerUserUseCase;
}
```

### 📦 Repository Pattern
Abstração da camada de dados:
```typescript
export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  // ... outros métodos
}
```

### 🎯 Use Case Pattern
Encapsulamento de regras de negócio:
```typescript
export class RegisterUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(request: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    // Regras de negócio aqui
  }
}
```

## 📚 Aprendizados e Conhecimentos Demonstrados

### 🎯 Clean Architecture
- Separação clara de responsabilidades
- Independência de frameworks e bibliotecas externas
- Facilidade para testes e manutenção
- Inversão de dependências

### 🧪 Qualidade de Código
- **100% TypeScript** com tipagem rigorosa
- **Testes automatizados** para todas as regras de negócio
- **Validação de entrada** com Zod schemas
- **Tratamento de erros** customizados por domínio

### 🔒 Segurança
- **Hash de senhas** com bcrypt
- **Autenticação JWT** stateless
- **Validação rigorosa** de entradas
- **Controle de acesso** baseado em roles

### 📈 Performance e Escalabilidade
- **Fastify** para alta performance
- **Conexão única** com banco de dados
- **Queries otimizadas** com Prisma
- **Estrutura modular** para fácil escalabilidade

## 🎓 Conceitos Avançados Aplicados

### Dependency Injection
```typescript
// Use Case recebe dependências no constructor
export class RegisterUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
}
```

### Error Handling Customizado
```typescript
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User with same email already exists");
  }
}
```

### Middleware Pattern
```typescript
export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
```

> **Lembre-se: Este é um projeto de estudo! 🎓**
>
> O foco está na qualidade do código, arquitetura limpa e aplicação de boas práticas, não em funcionalidades de produção.