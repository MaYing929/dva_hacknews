/**
 * Created by maying on 16/11/19.
 */
import React, { PropTypes } from 'react';
import { Table, Popconfirm,message, Pagination } from 'antd';

// 采用 stateless 的写法
const UserList = ({
  total, current, loading, dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
}) => {

  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="#">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.name)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

  // // 定义分页对象
  // const pagination = {
  //   total,
  //   current,
  //   pageSize: 10,
  //   onChange: ()=>{},
  // };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={onPageChange}
      />
    </div>
  );

}


UserList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default UserList;


// export default ()=><div>user list</div>;
