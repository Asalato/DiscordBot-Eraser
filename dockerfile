FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1
# メモリ管理のためのフラグを追加：--expose-gc でガベージコレクションを明示的に呼び出し可能に、
# --max-old-space-size=512 でヒープメモリ上限を256MBに設定
CMD [ "node", "--expose-gc", "--max-old-space-size=256", "server.js" ]
