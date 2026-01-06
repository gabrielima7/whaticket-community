# Whaticket

Sistema de atendimento multichannel via WhatsApp.

## Stack

**Backend:** NestJS • Prisma • PostgreSQL • Redis • Socket.io • Baileys  
**Frontend:** React 19 • Vite • MUI 6 • Zustand

## Quick Start

```bash
# Clone e configure
git clone https://github.com/gabrielima7/whaticket-community.git
cd whaticket-community
cp .env.example .env

# Docker (recomendado)
docker compose up -d --build

# Ou desenvolvimento local
cd backend && npm install && npm run start:dev
cd frontend && npm install && npm run dev
```

**URLs:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`
- Swagger: `http://localhost:3001/api`

## Features

| Core | Premium |
|------|---------|
| ✅ Multi-atendimento | ✅ Etiquetas coloridas |
| ✅ Filas/Setores | ✅ Kanban drag & drop |
| ✅ Tickets | ✅ Agendamentos |
| ✅ CRM de Contatos | ✅ Chat Interno |
| ✅ QR Code real-time | ✅ Campanhas |
| ✅ Webhooks | ✅ IA (Prompts) |

## Estrutura

```
├── backend/         # NestJS API
│   ├── prisma/      # Schema + migrations
│   └── src/modules/ # auth, tickets, tags, campaigns...
└── frontend/        # React SPA
    └── src/pages/   # Tickets, Kanban, Campaigns...
```

## License

MIT
