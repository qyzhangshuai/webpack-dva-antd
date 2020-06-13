/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 16:26:22
 * @LastEditTime: 2020-06-13 20:08:07
 * @LastEditors: zs
 */
const { defaultResult, Mock } = require('./_common')

function getUsers(count = 10) {
  return Mock.mock({
    ...defaultResult,
    [`data|${count}`]: [
      {
        'id|+1': 1,
        'name': '@cname',
        'email': '@email',
        'phone': /^1[34578]\d{9}$/,
        'type': /^(human|label|place){1}$/,
        'website': '@domain',
        'avatar': '@image("200x100", "@name")'
      }
    ]
  });
}

module.exports = {
  ['get /web/users1'](req, res) {
    const query = req.query;
    let count = 10; // 请求几条数据
    if (query && query.count) {
      count = query.count;
    }
    res.json(getUsers(count));
  },
  ['/app/users2'](req, res) {
    const query = req.query;
    let count = 10; // 请求几条数据
    if (query && query.count) {
      count = query.count;
    }
    setTimeout(() => {
      res.json(getUsers(count));
    }, 300);
  },
  ['post /app/users3'](req, res) {
    const body = req.body;
    let count = 10; // 请求几条数据
    if (body && body.count) {
      count = body.count;
    }
    return res.json(getUsers(count));
  },
  ['get /app/users3/id'](req, res) {
    const body = req.body;
    let count = 10; // 请求几条数据
    if (body && body.count) {
      count = body.count;
    }
    return res.json(getUsers(count));
  },
}
