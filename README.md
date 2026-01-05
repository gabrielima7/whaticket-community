# Whaticket Community (Enterprise Edition)

Projeto Open Source de *Ticket System* multi-tenancy para suporte via WhatsApp, reescrito com tecnologias modernas.

## 🚀 Tecnologias

### Backend
- **Node.js** & **NestJS** - Framework moderno para Node.js.
- **TypeScript** - Tipagem estática para robustez.
- **PostgreSQL** - Banco de dados relacional.
- **Prisma ORM** - Acesso ao banco de dados type-safe.
- **Socket.io** - Comunicação em tempo real.
- **Baileys** - Biblioteca leve para conexão com WhatsApp (sem Selenium/Browser).
- **BullMQ & Redis** - Gerenciamento de filas de processamento.
- **Docker** - Containerização completa.

### Frontend
- **React 19** - Biblioteca de UI.
- **Vite 6** - Build tool ultra-rápido.
- **TypeScript** - Segurança de tipos no frontend.
- **MUI v6 (Material UI)** - Componentes de interface modernos.
- **Zustand** - Gerenciamento de estado global leve e flexível.
- **TanStack Query** (React Query) - Gerenciamento de estado assíncrono.
- **Socket.io Client** - Cliente WebSocket.

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (v18+)
- Docker & Docker Compose
- Git

### Passos Rápidos (Docker)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gabrielima7/whaticket-community.git
   cd whaticket-community
   ```

2. **Configure as variáveis de ambiente:**
   Copie o `.env.example` para `.env` na raiz e ajuste as credenciais (ou use os padrões do docker-compose).
   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   ```

3. **Suba os containers:**
   ```bash
   docker compose up -d --build
   ```

O backend estará em `http://localhost:3001` e o frontend em `http://localhost:3000`.

### Desenvolvimento Local

#### Backend
1. Entre na pasta `backend`:
   ```bash
   cd backend
   npm install
   ```
2. Inicie o banco de dados (se não usar docker completo):
   ```bash
   docker compose up -d postgres redis
   ```
3. Rode as migrações:
   ```bash
   npx prisma migrate dev
   ```
4. Inicie em modo dev:
   ```bash
   npm run start:dev
   ```

#### Frontend
1. Entre na pasta `frontend`:
   ```bash
   cd frontend
   npm install
   ```
2. Inicie em modo dev:
   ```bash
   npm run dev
   ```
   Acesse: `http://localhost:5173` (Vite Default)

## 📚 Funcionalidades

- ✅ **Multi-atendimento**: Vários atendentes no mesmo número.
- ✅ **Filas/Setores**: Organize o atendimento por departamentos.
- ✅ **Tickets**: Gerenciamento completo de chamados.
- ✅ **CRM**: Cadastro de contatos e clientes.
- ✅ **Conexão Real-time**: QR Code ao vivo e chat fluido.
- ✅ **PWA**: Funciona como aplicativo no celular.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou Pull Requests.

## 📄 Licença

MIT License.
