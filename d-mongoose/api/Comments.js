var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  dateTime: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  }
});

var Comment = mongoose.model('Comment', commentSchema);

/**
 * 获取所有留言内容
 * @param  {Function} callback [description]
 */
exports.find = function (callback) {
  Comment.find((err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};

/**
 * 添加新留言内容
 * @param  {Object}   obj      [description]
 * @param  {Function} callback [description]
 */
exports.save = function (obj, callback) {
  const date = new Date();
  let msg = new Comment({
    ...obj,
    dateTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    status: 0
  });

  msg.save().then((product) => {
    callback(null, product);
  });
};

/**
 * 更新留言，根据id
 * @param  {Object}   obj      [description]
 * @param  {Function} callback [description]
 */
exports.updateById = function (obj, callback) {
  var id = obj.id;

  var target = {};
  for (let key in obj) {
    if (key != 'id') {
      target[key] = obj[key];
    }
  }

  Comment.findByIdAndUpdate(id, {
    ...target,
  }, err => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

/**
 * [description]
 * @param  {Number}   id       [description]
 * @param  {Function} callback [description]
 */
exports.deleteById = function (id, callback) {
  Comment.findByIdAndRemove(id, err => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}
