FROM node:lts AS base
WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --omit=dev

FROM base AS build-deps
RUN npm install

FROM build-deps AS build
COPY . .
RUN --mount=type=secret,id=datocms_token \
    DATOCMS_TOKEN=$(cat /run/secrets/datocms_token) \
    npm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ARG PORT=4321
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD node ./dist/server/entry.mjs
