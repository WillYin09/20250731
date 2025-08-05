# Dockerfile for Next.js + pnpm on Tencent CloudBase
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json, package-lock.json (if any), and pnpm-lock.yaml (if any)
COPY package.json ./
COPY package-lock.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# Copy all project files
COPY . .

# Build Next.js project
RUN pnpm build

# Expose port 3000
EXPOSE 3000

# Start Next.js server (SSR/API enabled), listen on 0.0.0.0:3000
CMD ["pnpm", "start", "--", "-H", "0.0.0.0", "-p", "3000"] 