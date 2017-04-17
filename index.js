'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const config = require('./config');

const port = config.port || 80;
const app = new Koa();

app.use(serve(__dirname + '/dist'));

app.listen(port);
