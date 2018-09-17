var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

// 设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

/*
var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
 */

// 将文档结构发布为模型
// mongoose.model 方法是用于将一个架构发布为 model
// 第一个参数：传入一个大写名词单数字符串用于表示数据库名称
//            mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//            e.g. User => users
// 第二个参数：架构 Schema
//    返回值：模型构造函数
var User = mongoose.model('User', userSchema);

// [官方文档](https://mongoosejs.com/docs/api.html#Model)

// ====================== //
// ========= 增 ========= //
// ====================== //

// 使用模型构造函数对集合中的数据进行操作
// var admin = new User({
//   username: 'admin',
//   password: '123456',
//   email: 'coeyeah_chen@outlook.com'
// });
//
// admin.save().then(() => console.log('success!'));

// ====================== //
// ========= 查 ========= //
// ====================== //

// 查询全部
User.find((err, docs) => {
  if (err) {
    console.log(err);
  } else {
    console.log(docs);
  }
});

// 条件查询
// User.find({
//   username: 'admin'
// }, (err, docs) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(docs);
//   }
// });

// 只查询第一条匹配数据
// User.findOne({
//   username: 'admin',
//   password: '123456'
// }, (err, docs) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(docs);
//   }
// });

// ====================== //
// ========= 改 ========= //
// ====================== //

// 修改指定 ID 的数据
// var id = '5b9f6fede9762521b4fc9005';
// User.findByIdAndUpdate(id, {
//   password: '123123'
// }, err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('success!');
//   }
// })

// ====================== //
// ========= 删 ========= //
// ====================== //

// User.remove({
//   username: 'admin'
// }, err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('success!');
//   }
// })

// 根据条件删除一个
// Model。findOneAndRemove(conditions, [options], [callback]);

// 根据 ID 删除一个
// Model。findByIdAndRemove(id, [options], [callback]);
