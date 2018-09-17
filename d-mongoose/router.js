const fs = require('fs');
const express = require('express');

const Comments = require('./api/Comments.js');

// express 路由容器
const router = express.Router();

// 把路由都挂载在 router 路由容器中

// Express 为 Response 配置了 render 方法，默认不可使用，如果配置了模版引擎则可用
// 默认在 /views/ 中寻找文件
// 如果想要修改默认的 views 目录
// app.set('views', **render函数的默认路径**);
router.get('/', function(req, res) {
  Comments.find(function(err, data) {
    if (err) {
      return res.status(500).send(err);
    }

    res.render('index.html', {
      comments: data,
    });
  });
});

router.get('/send', function(req, res) {
  res.render('send.html');
});

// express 获取 post 数据，使用第三方插件（中间件） body-parser
router.post('/send/post/', function(req, res) {
  // console.log(req.body);

  Comments.save(req.body, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
  });
});

router.get('/message/edit', function(req, res) {
  Comments.updateById({
    id: req.query.id,
    status: 1,
  }, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
  });
})

router.get('/message/delete', function(req, res) {
  Comments.deleteById(req.query.id, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
  });
})

module.exports = router;
