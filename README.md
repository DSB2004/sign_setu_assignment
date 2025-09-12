## Introduction

This project is a **Assignment for SignSetu**, built with modern web technologies to demonstrate skills in building responsive, performant, and maintainable applications.  
The goal of this assignment is to implement core features such as **data fetching, state management, pagination, filtering, server actions and cron job** while following best practices in **Next.js, TypeScript, and Tailwind CSS**.

It leverages **TanStack Query** for efficient server state management and caching, ensuring smooth and optimized data handling.

### Tech Stack

- Next.Js
- Typescript
- Tailwind CSS
- Tanstack Query
- BullMQ
- MongoDB
- Redis

### Local Setup

#### Setting Environment

- Clone the repository

```bash
git clone https://github.com/DSB2004/sign_setu_assignment.git

cd /sign_setu_assignment
```

- In your terminal, run

```bash
# npm
npm install

# bun
bun i
```

- To start the development server

```bash
# npm
npm run dev

# bun
bun run dev
```

- To start cron worker

```bash
# npm
npm run ./src/worker/index.ts

#bun
bun run ./src/worker/index.ts

```

### Deployment

- Local Development: http://localhost:3000
- Live Development:
