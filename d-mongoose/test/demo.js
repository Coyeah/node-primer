const mongoose = require('mongoose');

// 连接 mongodb 数据库
// localhost => 本机
// test => 数据库
mongoose.connect('mongodb://localhost/test');

// 创建一个模型，即设计数据库
// MongoDB 是动态的，灵活，只需要在代码中设计数据库即可
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));
