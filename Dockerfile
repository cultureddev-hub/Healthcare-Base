FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all source files
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run dev server with hot reload
CMD ["npm", "run", "dev"]
