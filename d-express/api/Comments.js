/**
 * 数据操作文件
 * 目的：操作文件中的数据，只处理数据，不关心业务
 */

const fs = require('fs');

const dbPath = './db.json';

/**
 * 获取所有留言内容
 * @param  {Function} callback [description]
 */
exports.find = function (callback) {
  fs.readFile(dbPath, function (err, data) {
    // JSON.parse(data).comments
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).comments);
  })
}

/**
 * 添加新留言内容
 * @param  {Object}   obj      [description]
 * @param  {Function} callback [description]
 */
exports.save = function (obj, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err);
    }

    let comments = JSON.parse(data).comments;
    const date = new Date();
    comments.unshift({
      id: parseInt(comments[0].id) + 1,
      ...obj,
      dateTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      status: 0
    });

    fs.writeFile(dbPath, JSON.stringify({
      comments,
    }), function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  })
}

/**
 * 更新留言，根据id
 * @param  {Object}   obj      [description]
 * @param  {Function} callback [description]
 */
exports.updateById = function (obj, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err);
    }

    let comments = JSON.parse(data).comments;
    let target = comments.find(function (item) {
      return item.id == obj.id;
    })


    for (let key in obj) {
      target[key] = obj[key];
    }

    fs.writeFile(dbPath, JSON.stringify({
      comments,
    }), function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  })
}

/**
 * [description]
 * @param  {Number}   id       [description]
 * @param  {Function} callback [description]
 */
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err);
    }

    let comments = JSON.parse(data).comments;

    // comments = comments.filter(value => {
    //   if (value.id != id) {
    //     return value;
    //   }
    // });

    let targetIndex = comments.findIndex(function(item) {
      return item.id == parseInt(id);
    })
    comments.splice(targetIndex, 1);

    fs.writeFile(dbPath, JSON.stringify({
      comments,
    }), function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  })
}
