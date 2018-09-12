const url = require('url');
const queryString = require('querystring');

/*
url           - 对url解析
querystring   - 对get查询数据解析
 */

let urlStr = 'http://www.coyeah.com/search?q=html';
// let urlStr = '/search?q=html';

let urlObj = url.parse(urlStr);
console.log(urlObj);

let queryStr = urlObj.query;

let queryObj = queryString.parse(queryStr);
console.log(queryObj);

console.log(queryObj.q);
