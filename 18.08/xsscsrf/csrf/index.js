const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';

var money = 1000
const server = http.createServer((req, res) => {
  if (req.method == 'GET' && req.url == '/getMoney') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/json;charset="utf-8"');
    console.log(money)
    res.end(String(money))
  } else if (req.method == 'GET' && req.url == '/takeMoney') {
    money = 0
    console.log('delet', money)
    res.statusCode = 200
    res.end()
  } else {
    res.setHeader('Content-Type', 'text/html;charset="utf-8"');
    res.setHeader('Set-cookie', 'token=1234;HttpOnly');
    fs.readFile('./index.html', 'utf-8', function(err, data) {
      if(err) {
        console.log('index loadfail')
      }else {
        res.end(data)
      }
    })
  }
})

server.listen(3001, hostname, () => {
  console.log(`http://${hostname}:3001`)
})
