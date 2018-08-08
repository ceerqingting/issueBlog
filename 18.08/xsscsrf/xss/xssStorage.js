const http = require('http');

let userInput = '';

function handleRequest(req, res) {
  console.log(req)
  const method = req.method
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, FETCH');
  if (method == 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    })
    req.on('end', () => {
      if(body) {
        userInput = body;
      }
      res.end();
    })
  } else {
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.write(userInput);
    res.end();
  }
}

const server = new http.Server();
server.listen('8001', '127.0.0.1');
server.on('request', handleRequest);