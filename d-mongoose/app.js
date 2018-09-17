// 引用包
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

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

// 提供静态资源服务
// 公开指定目录
// 不指定路径，不需要以 '/public/' 开头
// app.use(express.static(__dirname + '/public/'));
// 指定路径 => /public/*
app.use('/public', express.static('public'));

// 把路由容器挂载到 app 上
app.use(router);

// 通过中间件，定制 404 页面
// 需要放在路由容器之后，顺序检测
app.use(function (req, res) {
  res.type('text/html');
  res.status(404);
  res.render('404.html');
});

app.listen(3000, function () {
  console.log('app is running at port 3000');
});
