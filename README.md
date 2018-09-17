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
