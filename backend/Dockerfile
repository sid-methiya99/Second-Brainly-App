
FROM node:20-alpine

# Install bash & curl (needed for Bun install)
RUN apk add --no-cache bash curl

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Copy package.json and lockfile first (for caching)
COPY package.json package-lock.json ./

# Install dependencies with npm (more reliable for Docker)
RUN npm ci

# Copy source code
COPY . .

# Debug: List files to ensure they're copied correctly
RUN echo "=== Current directory ===" && pwd && \
    echo "=== All files ===" && ls -la && \
    echo "=== src directory ===" && ls -la src/ && \
    echo "=== server.ts exists ===" && ls -la src/server.ts && \
    echo "=== Bun version ===" && bun --version && \
    echo "=== Node version ===" && node --version

# Compile TypeScript to JavaScript
RUN npm run build

EXPOSE 3000

# Run the compiled JavaScript using npm start
CMD ["npm", "start"]
