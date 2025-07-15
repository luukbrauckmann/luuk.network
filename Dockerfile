FROM node:lts AS runtime
WORKDIR /app
COPY . .
ARG DATOCMS_TOKEN
ENV DATOCMS_TOKEN=${DATOCMS_TOKEN}
RUN npm install
RUN npm run build
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
