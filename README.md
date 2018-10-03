# 入门NodeJS

入门 NodeJS 的一些练习。起于想自己做一个脚手架，用于React开发。目标目标~

## 目录

### webService

简单的 web 服务器练习，在链接跳转和 GET 与 POST 的请求访问上的处理。

### feedback

使用 nodeJS 原生写的一个留言板服务器练习。

### d-express

基于 express 包的一个留言板服务器练习。

#### 总结下开发思路步骤

* 处理模板
* 配置开放静态资源
* 配置模版引擎
* 路由设计
* 提取路由模块，开发
* 封装独立文件，用于处理数据的业务操作
* 根据路由实现具体业务功能

#### 模块化思想

* 模块职责单一

#### 关于模块化

* javascript 天生不支持模块化
* NodeJS 中对 JavaScript 进行特殊的模块化支持，`CommonJS`
* 在浏览器中可以像 NodeJS 中的模块一样编程
  * `<script>` 标签引用加载，且需要考虑加载顺序问题和作用域
  * require.js  第三方库  AMD
  * sea.js      第三方库  CMD
* 无论是 `CommonJS`、`AMD`、`CMD`、`UMD`、`EcmaScript 6 Modules 官方规范` 都是为了解决JavaScript的模块化问题

### d-commander

基于 commander 包的一个命令行练习。

相关成果：[wherever](https://github.com/Coyeah/wherever)

#### 关于 wherever

一个基于 NodeJS 静态服务器，相对简单，用于查看文件目录、为前端提供API服务。

想法来源于，每一次开发前端，页面数据都是写死了，不利于开发。后期使用了 mockJS ，但是还是不是通过网络连接。毕竟计算机网络也是很重要的。

### d-puppeteer

基于 puppeteer 包的一个爬虫练习。

相关成果：[node-crawler](https://github.com/Coyeah/node-crawler)

---

## 相关知识点

### package.json 和 package-lock.json

* npm5 以前不会有 package-lock.json，npm5 以后才添加的
* 安装包时，npm 会生成或更新 package-lock.json 这个文件
* npm5 以后不必要使用 `-S` / `--save`，自动保存依赖信息
* package-lock.json 会保存 node_modules 中所有包的信息（版本、下载地址），以至于重新 `npm install` 的速度会提升
* package-lock.json 可以防止版本升级，锁定版本。

### 关系型数据库和非关系型数据库

表就是关系，或者说表与表之间存在的关系。

关系型数据库：

* 需要通过 `sql` 语言来操作
* 在操作之前都需要设计表结构
* 数据表支持约束
  * 唯一的
  * 主键
  * 默认值
  * 非空

非关系型数据库：

* 灵活
* 部分非关系型数据库就是键值对（key - value）
* MongoDB 是长得最像关系型数据的非关系型数据库
  * 数据库 > 数据库
  * 数据表 > 集合（数组）
  * 表记录 > （文档对象）
* MongoDB 不需要设计表结构


### MongoDB

#### 数据存储结构

* 可以有多个数据库
* 一个数据库中可以有多个集合（表）
* 一个集合可以有多个文档（表记录）
* 文档结构灵活，没有限制。不需要像 `MySQL` 先创建数据库、表，设计表结构

#### 命令行操作

启动：

```shell
# MongoDB 默认使用执行 mongod 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录
# 所以在第一次执行该命令之前先手动新建一个 /data/db

mongod
```

如果想要修改默认的数据存储目录，可以：

```shell
mongod --dbpath=数据存储目录路径
```

停止：

```shell
# Ctrl + c
```

连接与退出数据库:

```shell
# 默认连接本机的 mongodb

mongo

# 在连接状态数据 exit 退出连接
```

基本命令:

* `show dbs` > 查看显示所有数据库
* `db` > 查看当前操作的数据库
* `use '数据库名称'` > 切换到指定的数据（如果没有会新建）

官网：[传送门](https://www.mongodb.com/)

参考资料：[传送门](http://www.runoob.com/mongodb/mongodb-tutorial.html)

#### NodeJS 操作

使用官方的 MongoDB 包进行操作。

[https://github.com/mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native)

使用第三方 `mongoose` 来操作 MongoDB 数据库。基于官方的 mongodb 包再一次封装。

[https://mongoosejs.com/](https://mongoosejs.com/)


### Node 知识点

#### path 路径操作模块

* path.basename
  * 获取一个路径中的文件名（默认包含拓展名）
* path.dirname
  * 获取一个路径中的目录部分
* path.extname
  * 获取一个路径中的拓展名部分
* path.parse
  * 把一个路径转换为对象
    * root  > 根目录
    * dir   > 目录
    * base  > 包含后缀名的文件名
    * ext   > 后缀名
    * name  > 不包含后缀名的文件名
* path.join
  * 当你需要进行路径拼接的时候，建议使用这个方法
* path.isAbsolute
  * 判断一个路径是否为绝对路径

参考文档：[传送门](http://nodejs.cn/api/path.html)

#### Node 中的其他成员

在每个模块中，除了 `require`、`exports` 等模块相关 API 以外，还有两个特殊成员：

* `__dirname`  > 可以用于获取当前文件模块所属目录的绝对路径 * 动态获取
* `__filename` > 可以用来获取当前文件的绝对路径 * 动态获取
* `__dirname` 和 `__filename` 是不受执行 node 命令所属路径的影响

在文件操作中，使用相对路径是不可靠的，因为在 Node 中文件操作的路径被设计为相对于执行 node 命令所处的路径（no bug）。

为了解决这个问题，只需要把相对路径转变为绝对路径即可。

```JavaScript
__dirname + '/code.js' // c:\code.js
```

为了避免以上问题，在文件操作中使用相对路径都统一转换为**动态的绝对路径**。

在模块的路径标识和文件操作中的相对路径标识不一样。
```JavaScript
require(./code.js) // 执行 node 命令所属路径的影响
```
