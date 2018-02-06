var qs = require('querystring');
var http = require('http')
var server = http.createServer();

server.on('request', function(req, res){
  var params = qs.parse(req.url.split('?')[1]);
  res.writeHead(200, {
    'Set-Cookie': 'l=a123456;Path=/;Domain=127.0.0.1;HttpOnly'   // HttpOnly:脚本无法读取
});
  res.write(JSON.stringify(params));
  res.end();
})

server.listen('8080');
console.log('server is running at port 8080');