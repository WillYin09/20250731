# Dockerfile for Next.js + pnpm on Tencent CloudBase
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if any)
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# Copy all project files
COPY . .

# Build Next.js project
RUN pnpm build

# Expose port 3000
EXPOSE 3000

# Start Next.js server (SSR/API enabled), listen on 0.0.0.0:$PORT
CMD ["sh", "-c", "echo '=== Container Startup ===' && echo 'Current time: $(date)' && echo 'PORT env: $PORT' && echo 'Starting Next.js on port ${PORT}...' && echo 'Waiting 5 seconds for startup preparation...' && sleep 5 && echo 'Server is ready, starting Next.js...' && pnpm start -H 0.0.0.0 -p $PORT"] 