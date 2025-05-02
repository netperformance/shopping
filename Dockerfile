# Schritt 1: Build mit Vite
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Schritt 2: Ausliefern mit Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
