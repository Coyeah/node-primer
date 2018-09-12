let PORT = 3000;
let http = require('http');
let server = http.createServer();

server.on('request', function (req, res) {
  console.log(`Get request: ${req.url} - ${req.socket.remotePort} - ${req.socket.remoteAddress}`);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  switch(req.url) {
    case '/': {
      res.end('index page');
      break;
    }
    case '/info': {
      let info = [
        {name: '张三', content: '3'},
        {name: '李四', content: '2'},
        {name: '王五', content: '1'},
      ]
      res.end(JSON.stringify(info));
      break;
    }
    default: {
      res.end('404 Not find');
      break;
    }
  }
});

server.listen(PORT, function () {
  console.log(`http://127.0.0.1:${PORT}`);
});
