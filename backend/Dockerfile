FROM node:20-alpine

# Install bash & curl (needed for Bun install)
RUN apk add --no-cache bash curl

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Copy package.json and lockfile (ensures dependencies are installed based on these)
# This order is important for Docker caching.
COPY package.json bun.lockb* ./ # <--- Make sure bun.lockb is always copied if it exists!
# If you also have package-lock.json and bun.lock files, make sure to copy them too if bun is meant to use them
# COPY package.json package-lock.json bun.lock* ./

# Install deps with Bun
RUN bun install

# Copy source code (now that dependencies are installed)
# This must be after 'bun install' to leverage caching if only code changes.
COPY . .

EXPOSE 3000

# Run built application
CMD ["bun", "start"]
