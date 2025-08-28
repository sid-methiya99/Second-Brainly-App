
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Debug: Check if package.json exists
RUN ls -la && echo "=== Package.json content ===" && cat package.json

RUN npm ci

COPY . .

# Debug: Check if all files are copied
RUN ls -la && echo "=== Node modules ===" && ls -la node_modules/ | head -5

# Build Vite app
RUN npm run build

# Debug: Check if build was successful
RUN ls -la dist/ && echo "=== Build completed ==="

EXPOSE 5173

# Serve built files with Vite preview
CMD ["npm", "run", "preview"]
