# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:24-alpine AS builder
WORKDIR /app

# Compilar Nitro para un servidor Node (no Cloudflare)
ENV NITRO_PRESET=node-server

# Instalar dependencias con cache de capas
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código y construir
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# El servidor de Nitro escucha en este puerto dentro del contenedor
ENV PORT=5666

# Solo necesitamos la salida del build para ejecutar
COPY --from=builder /app/.output ./.output

EXPOSE 5666
CMD ["node", ".output/server/index.mjs"]
