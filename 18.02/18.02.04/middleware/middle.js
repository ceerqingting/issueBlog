var express = require('express');
var proxy = require('http-proxy-middleware');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var app = express();

var requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
}
app.use(requestTime);

app.get('/index.html',function(req, res) {
  res.sendFile(__dirname+ '/index.html');
});

app.use('/login', proxy({
  target: 'http:127.0.0.1:8080',
  changeOrigin: true,
  onProxyRes: function(proxyRes, req, res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Credentials', 'true');
  },
  cookieDomainRewrite: 'localhost:8000'
}));


app.listen(8000)