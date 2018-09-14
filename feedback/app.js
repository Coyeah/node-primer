const http = require('http');
const fs = require('fs');
const url = require('url');

const template = require('art-template');

let comments = [{
    email: 'Tanmay@gmail.com',
    message: '今天天气不错！',
    dateTime: '2018-09-14',
  },
  {
    email: 'Sachin@gmail.com',
    message: '今天天气不错！',
    dateTime: '2018-09-14',
  },
  {
    email: 'Giancarlo@gmail.com',
    message: '今天天气不错！',
    dateTime: '2018-09-14',
  },
  {
    email: 'Derien@gmail.com',
    message: '今天天气不错！',
    dateTime: '2018-09-14',
  },
]

http
  .createServer()
  .on('request', function(req, res) {
    var urlObj = url.parse(req.url, true);

    if (urlObj.path.indexOf('/public/') === 0) {
      fs.readFile('.' + url, function(err, data) {
        if (err) return (res.end('404 Not Found'))

        res.end(data);
      })
    }

    switch (urlObj.pathname) {
      case '/':
        {
          fs.readFile('./views/index.html', function(err, data) {
            if (err) return (res.end('404 Not Found.'))

            let htmlStr = template.render(data.toString(), {
              comments: comments
            })
            res.end(htmlStr);
          });
          break;
        }
      case '/post':
        {
          fs.readFile('./views/post.html', function(err, data) {
            if (err) return (res.end('404 Not Found.'))

            res.end(data);
          })
          break;
        }
      case '/message/post':
        {
          comments.unshift({
            ...urlObj.query,
            dateTime: '2018-09-15'
          })
          // 服务器让客户端重定向
          // * 状态码设置为302临时重定向
          // * 在响应头中通过 Location 告诉状态码往哪重定向
          res.statusCode = 302;
          res.setHeader('Location', '/');
          res.end();
          break;
        }
      default:
        {
          fs.readFile('./views/404.html', function(err, data) {
            if (err) return (res.end('404 Not Found.'))

            res.end(data);
          })
          break;
        }
    }
  })
  .listen(3000, function() {
    console.log('http://127.0.0.1:3000, service is running...');
  });
