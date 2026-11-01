FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json server.mjs ./
COPY public ./public
ENV NODE_ENV=production PORT=3000 DB_PATH=/data/jamo.sqlite
RUN mkdir -p /data && chown -R node:node /app /data
# Startup prepares the mounted volume, then server.mjs drops to uid/gid 1000.
USER root
EXPOSE 3000
CMD ["node","server.mjs"]
