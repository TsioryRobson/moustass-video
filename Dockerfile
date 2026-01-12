# --- build stage ---
FROM node:18-alpine AS builder
WORKDIR /app
ENV CI=true
# copy package manifests first for better caching
COPY package*.json ./
# use npm; change to yarn/pnpm if needed
RUN npm ci
COPY . .
RUN npm run build

# --- production image ---
FROM nginx:stable-alpine
# remove default static files
RUN rm -rf /usr/share/nginx/html/*
# copy build
COPY --from=builder /app/dist /usr/share/nginx/html
# custom nginx conf for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
