'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const responseTime = require('koa-response-time');
const compress = require('koa-compress');
const cors = require('kcors');
const logger = require('koa-logger');
const log = require('rainbowlog');
const config = require('./config');

const port = config.port || 80;
const app = new Koa();

app.use(responseTime());
if (process.NODE_ENV === 'development') { app.use(logger()); }
app.use(compress());
app.use(cors());
app.use(serve(__dirname + '/dist'));

app.listen(port, (err) => {
  if (err) {
    if (err.code == 'EADDRINUSE') {
      log.error(`${port}端口正在被占用，请关闭占用端口的进程`);
      log.error(`可以用此命令查找进程: lsof -i tcp:${port}`);
      process.exit(1);
    }
    log.error('端口监听失败', err.message);
  }
  log.info(`成功监听${port}端口`);
});
