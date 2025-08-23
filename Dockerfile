# Multi-stage build for Second-Brainly-App
FROM node:20-alpine AS base

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package.json backend/
COPY brainly-frontend/package.json brainly-frontend/

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY backend/ backend/
COPY brainly-frontend/ brainly-frontend/

# Install backend dependencies with Bun
WORKDIR /app/backend
RUN bun install --frozen-lockfile

# Install frontend dependencies with npm
WORKDIR /app/brainly-frontend
RUN npm ci --only=production

# Build stage
FROM base AS builder
WORKDIR /app

# Copy source code
COPY backend/ backend/
COPY brainly-frontend/ brainly-frontend/

# Build backend
WORKDIR /app/backend
RUN bun install --frozen-lockfile
RUN npx tsc --b

# Build frontend
WORKDIR /app/brainly-frontend
RUN npm ci
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install Bun for runtime
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Copy built backend
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/
COPY --from=builder /app/backend/bun.lock ./backend/

# Copy built frontend
COPY --from=builder /app/brainly-frontend/dist ./brainly-frontend/dist

# Install only production dependencies for backend
WORKDIR /app/backend
RUN bun install --production --frozen-lockfile

# Expose port (adjust as needed based on your backend configuration)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["bun", "run", "src/server.ts"]
