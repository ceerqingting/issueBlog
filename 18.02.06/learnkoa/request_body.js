import { prototype } from 'module';

var koa = require('koa');
var parse = require('co-body');
var app = new koa();
app.use(function *(next) {
  var body = yield parse(this);
  
  this.body = yield parse(this);
})
app.listen(3000)