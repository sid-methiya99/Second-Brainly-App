FROM node:20-alpine

WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server with proper host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
