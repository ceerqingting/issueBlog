const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('listen');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html;charset="utf-8"');
  res.setHeader('Set-cookie', 'type=ninja;language=javascript;HttpOnly');
  fs.readFile('./index.html', 'utf-8', function(err, data) {
    if(err) {
      console.log('html load fail')
    } else {
      res.end(data)
    }
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
})

