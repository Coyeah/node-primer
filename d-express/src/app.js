// 引用包
const express = require('express');
const bodyParser = require('body-parser');

// 创建服务器应用程序
// 相当于 http.createServer()
const app = express();

// 配置实用 art-template 模版引擎
// 第一个参数，表示，渲染以 .art 结尾的文件使用 art-template 模版引擎
// express-art-template
app.engine('html', require('express-art-template'));

// 配置 body-body-parser
// 配置后会在 req 请求对象上多出一个属性：body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse applictation/json
app.use(bodyParser.json());

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

// Express 为 Response 配置了 render 方法，默认不可使用，如果配置了模版引擎则可用
// 默认在 /views/ 中寻找文件
// 如果想要修改默认的 views 目录
// app.set('views', **render函数的默认路径**);
app.get('/', function (req, res) {
  res.render('index.html', {
    comments: comments,
  });
});

app.get('/post', function (req, res) {
  res.render('post.html');
});

// express 获取 post 数据，使用第三方插件（中间件） body-parser
app.post('/message/post/', function (req, res) {
  let obj = {
    ...req.body,
    dateTime: '2018-09-16',
  };
  comments.unshift(obj);
  res.redirect('/');
});

// 提供静态资源服务
// 公开指定目录
// 不指定路径，不需要以 '/public/' 开头
// app.use(express.static(__dirname + '/public/'));
// 指定路径 => /public/*
app.use('/public/', express.static(__dirname + '/public/'));

app.listen(3000, function () {
  console.log('app is running at port 3000');
});
