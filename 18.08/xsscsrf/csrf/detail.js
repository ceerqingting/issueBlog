const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html;charset="utf-8"');
  fs.readFile('./detail.html', 'utf-8', function(err, data) {
    if(err) {
      console.log('detail loadfail')
    }else {
      res.end(data)
    }
  })
})

server.listen(3002, hostname, () => {
  console.log(`http://${hostname}:3002`)
})
