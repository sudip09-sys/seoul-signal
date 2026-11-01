FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json server.mjs ./
COPY public ./public
ENV NODE_ENV=production PORT=3000 DB_PATH=/data/jamo.sqlite
RUN mkdir -p /data && chown -R node:node /app /data
USER node
EXPOSE 3000
CMD ["node","server.mjs"]
