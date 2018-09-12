const fs = require('fs');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const server = http.createServer();

const conf = require('./config/defaultConfig');

server.on('request', function (req, res) {
  console.log(`Get a request, info => ${req.url} || ${req.socket.remotePort} || ${req.socket.remoteAddress}`);

  let urlObj = url.parse(req.url);
  console.log(req.method);

  switch (urlObj.pathname) {
    case '/': {
      fs.readFile('./template/search.html', 'utf-8', function (err, data) {
        if (err) throw err;
        res.end(data);
      })
      break;
    }
    case '/search': {
      let obj = queryString.parse(url.parse(req.url).query);
      console.log(obj);
      res.end(JSON.stringify(obj));
      break;
    }
    case '/input': {
      if (req.method === 'POST') {
        let postData = '';
        req.on('data', function (datachunk) {
          postData += datachunk;
        });
        req.on('end', function () {
          res.end(postData);
        });
      }
      break;
    }
    case '/info': {
      res.end('info.page');
      break;
    }
    default: {
      res.end('404 Not Found');
    }
  }
});

server.listen(conf.port, function () {
  console.log(`http:127.0.0.1:${conf.port}`);
})
