'use strict';
const qs = require('qs');

const [users] = [
                  require('../mockData/users.js'),
                 ];

function query(field,id,datas){

  let _result = null;
  if (id) {
    for (let data of datas) {
      if(data[field] === id) {
        _result = data;
        break;
      };
    };
  } else {
    _result = datas;
  };
  return {
    success: true,
    data: _result,
    _meta: {
      has_more: true,
      result_count:20,
    }
  };
};


module.exports = {

// GET示例
  'GET /api/users/': function (req, res) {
    let _result = query('id', qs.parse(req.query).id, users);
    console.log('_result',_result)
    setTimeout(function () { res.json(_result); }, 500);
  },

  // GET示例
  // 'POST /contracts/82hdfwr2r9dshif92/': function (req, res) {
  //   let _result = {ok: true};
  //   setTimeout(function () { res.json(_result); }, 500);
  // },

};
