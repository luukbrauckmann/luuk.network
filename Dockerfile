FROM node:lts AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN --mount=type=secret,id=datocms_token \
    DATOCMS_TOKEN=$(cat /run/secrets/datocms_token) \
    npm run build

FROM node:lts AS runtime

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
