# 🛒 Web3 E-Commerce

Full-stack e-commerce platform with cryptocurrency payments, built with Next.js 14, Node.js, PostgreSQL, and Web3 integration. Accept ETH, USDT, USDC and other tokens on Ethereum and BSC.

## Features

- **Crypto Payments** — Accept ETH, USDT, USDC, DAI via smart contract escrow
- **Product Catalog** — Categories, search, filters, sorting
- **Shopping Cart** — Persistent cart with localStorage + server sync
- **Order Management** — Track orders, escrow status, dispute resolution
- **User Auth** — Email + MetaMask wallet login
- **Admin Dashboard** — Products, orders, analytics
- **Multi-chain** — Ethereum, BSC, Polygon support
- **Responsive** — Mobile-first design with Tailwind CSS
- **SEO Optimized** — SSR with Next.js App Router

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Next.js API Routes, Node.js |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js + SIWE (Sign-In with Ethereum) |
| Payments | Smart Contract Escrow (Solidity) |
| Storage | Cloudflare R2 / AWS S3 |
| Deploy | Docker + Nginx |

## Quick Start

```bash
# Setup
cp .env.example .env
# Edit .env with your DATABASE_URL, WALLET_PRIVATE_KEY, etc.

# Install & Run
npm install
npx prisma migrate dev
npm run dev
# Open http://localhost:3000
```

## Architecture

```
src/
├── app/                  # Next.js App Router
│   ├── page.tsx          # Homepage
│   ├── products/         # Product pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Crypto checkout
│   ├── orders/           # Order tracking
│   └── admin/            # Admin dashboard
├── components/           # Reusable UI
│   ├── ProductCard.tsx
│   ├── CartDrawer.tsx
│   ├── CryptoPay.tsx     # Web3 payment component
│   └── Nav.tsx
├── api/                  # API Routes
│   ├── products/
│   ├── orders/
│   └── webhook/          # Blockchain event listeners
├── lib/
│   ├── web3.ts           # Contract interaction
│   ├── prisma.ts         # DB client
│   └── auth.ts           # Auth config
└── types/                # TypeScript types
```

## Smart Contract

The escrow contract ensures buyers and sellers are protected:

1. Buyer pays crypto into escrow
2. Seller ships the product
3. Buyer confirms receipt → payment released to seller
4. Disputes handled via arbitration

## License

MIT
