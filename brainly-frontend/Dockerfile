
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

# Build Vite app
RUN npm run build

EXPOSE 5173

# Serve built files with Vite preview
CMD ["npm", "run", "preview"]
