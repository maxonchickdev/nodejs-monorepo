# syntax=docker/dockerfile:1
# Monorepo image: production Nest API from apps/backend
ARG NODE_VERSION=22.22.0
FROM node:${NODE_VERSION}-bookworm-slim AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
	&& rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY tsconfig.base.json ./
COPY apps/backend/package.json apps/backend/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

RUN npm ci

COPY apps/backend apps/backend

# prisma.config.ts loads .env; provide a build-only URL for `prisma generate` (no DB required)
RUN echo 'POSTGRES_URL=postgresql://build:build@127.0.0.1:5432/build' > apps/backend/.env

ARG POSTGRES_URL=postgresql://build:build@127.0.0.1:5432/build
ENV POSTGRES_URL=${POSTGRES_URL}

RUN npm run db:generate -w @nodejs-monorepo/backend
RUN npm run build -w @nodejs-monorepo/backend

FROM node:${NODE_VERSION}-bookworm-slim AS production

WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
	&& rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

RUN npm ci --omit=dev

COPY --from=builder /app/apps/backend/dist apps/backend/dist
COPY --from=builder /app/apps/backend/prisma/generated apps/backend/prisma/generated
COPY --from=builder /app/apps/backend/prisma/schema.prisma apps/backend/prisma/schema.prisma
COPY --from=builder /app/apps/backend/prisma/migrations apps/backend/prisma/migrations

WORKDIR /app/apps/backend

EXPOSE 8000

CMD ["node", "dist/src/main.js"]
