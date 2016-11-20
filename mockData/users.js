const createData = require('./createDatas.js');

const data = [
  {
    total: 3,
    current: 1,
    loading: false,
    list: [
      {
        name: '张三',
        age: 23,
        address: '成都',
      },
      {
        name: '李四',
        age: 24,
        address: '杭州',
      },
      {
        name: '王五',
        age: 25,
        address: '上海',
      },
    ],
  }
];
module.exports = data;
// module.exports = createData(data);
