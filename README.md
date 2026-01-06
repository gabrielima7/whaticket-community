# Whaticket Community (Enterprise Edition)

Projeto Open Source de *Ticket System* multi-tenancy para suporte via WhatsApp, reescrito com tecnologias modernas.

## 🚀 Tecnologias

### Backend
- **Node.js 18+** & **NestJS 11** - Framework moderno para Node.js.
- **TypeScript 5** - Tipagem estática para robustez.
- **PostgreSQL 16** - Banco de dados relacional.
- **Prisma ORM 7** - Acesso ao banco de dados type-safe.
- **Socket.io** - Comunicação em tempo real.
- **Baileys** - Biblioteca leve para conexão com WhatsApp (sem Selenium/Browser).
- **BullMQ & Redis** - Gerenciamento de filas de processamento.
- **Docker** - Containerização completa.

### Frontend
- **React 19** - Biblioteca de UI.
- **Vite 6** - Build tool ultra-rápido.
- **TypeScript 5** - Segurança de tipos no frontend.
- **MUI v6 (Material UI)** - Componentes de interface modernos.
- **Zustand** - Gerenciamento de estado global leve e flexível.
- **TanStack Query** (React Query) - Gerenciamento de estado assíncrono.
- **Socket.io Client** - Cliente WebSocket.

## 📚 Funcionalidades

### Core
- ✅ **Multi-atendimento**: Vários atendentes no mesmo número.
- ✅ **Filas/Setores**: Organize o atendimento por departamentos.
- ✅ **Tickets**: Gerenciamento completo de chamados.
- ✅ **CRM**: Cadastro de contatos e clientes.
- ✅ **Conexão Real-time**: QR Code ao vivo e chat fluido.
- ✅ **PWA**: Funciona como aplicativo no celular.

### Premium Features (Phase 7)
- ✅ **Sistema de Etiquetas (Tags)**: Categorização visual de tickets e contatos com cores personalizadas.
- 🔄 **Kanban**: Quadro de atendimento com drag & drop (em desenvolvimento).
- 🔄 **Agendamentos**: Envio programado de mensagens (em desenvolvimento).
- 🔄 **Chat Interno**: Mensagens entre atendentes (em desenvolvimento).
- 🔄 **Campanhas**: Disparos em massa (em desenvolvimento).

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
```bash
cd backend
npm install
docker compose up -d postgres redis   # Sobe apenas os serviços necessários
npx prisma migrate dev                 # Executa migrações
npm run start:dev                      # Inicia em modo desenvolvimento
```

#### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Acesse: `http://localhost:5173` (Vite Default)

## 📁 Estrutura do Projeto

```
whaticket-community/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # Autenticação JWT
│   │   │   ├── users/         # Gerenciamento de usuários
│   │   │   ├── tickets/       # Sistema de tickets
│   │   │   ├── contacts/      # CRM de contatos
│   │   │   ├── queues/        # Filas de atendimento
│   │   │   ├── tags/          # Sistema de etiquetas (NEW)
│   │   │   ├── messages/      # Mensagens WhatsApp
│   │   │   ├── whatsapp/      # Conexão Baileys
│   │   │   ├── webhooks/      # Integrações externas
│   │   │   ├── prompts/       # Prompts de IA
│   │   │   └── ai/            # Módulo de IA
│   │   └── gateways/          # WebSocket Gateway
│   └── prisma/
│       └── schema.prisma      # Modelos do banco
├── frontend/
│   ├── src/
│   │   ├── pages/             # Páginas React
│   │   ├── services/          # Serviços de API
│   │   ├── context/           # Contextos e stores
│   │   └── layout/            # Layouts e navegação
│   └── index.html
└── docker-compose.yaml
```

## 🔌 API Endpoints

### Tags (Sistema de Etiquetas)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tags` | Lista todas as etiquetas |
| POST | `/tags` | Cria nova etiqueta |
| PUT | `/tags/:id` | Atualiza etiqueta |
| DELETE | `/tags/:id` | Remove etiqueta |
| POST | `/tags/:id/tickets/:ticketId` | Vincula tag a ticket |
| DELETE | `/tags/:id/tickets/:ticketId` | Remove tag de ticket |
| POST | `/tags/:id/contacts/:contactId` | Vincula tag a contato |
| DELETE | `/tags/:id/contacts/:contactId` | Remove tag de contato |

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou Pull Requests.

## 📄 Licença

MIT License.
