/**
 * Created by maying on 16/11/19.
 */

import React, { Component, PropTypes } from 'react';
// 引入 connect 工具函数
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './UserApp.less';
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';
import { routerRedux } from 'dva/router';

// Users Container Component
function UserApp({ location, dispatch, users }) {


  const {
    loading, list, total, current, field, keyword,
    currentItem, modalVisible, modalType,
  } = users;

  // 传到下级的props
  const userSearchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch(routerRedux.push({
        pathname: '/user',
        query: { ...fieldsValue, page: 1 },
      }));
    },
    onAdd() {

      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        },
      });

    },
  };


  const userListProps = {
    dataSource: list,
    loading,
    total,
    current,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/user',
        query: { field, keyword, page },
      }));
    },
    onDeleteItem(name) {
      dispatch({
        type: 'users/delete',
        payload: name,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
  };

  const userModalProps = {

    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,

    onOk(data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      });
    },

    onCancel() {
      dispatch({
        type: 'users/hideModal',
      });
    },
  };


  // 解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html


  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  return (

      <div className={styles.normal}>
        <br/>
        <UserSearch {...userSearchProps} />
        <UserList {...userListProps} />
        <UserModalGen />
      </div>

  );

}


UserApp.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据，这里关联了 users
function mapStateToProps(state) {
  return {users:state.users};
}

// 建立数据关联关系
export default connect(mapStateToProps)(UserApp);

// Users Container Component 的设计
// 基础工作都准备好了，接下来就开始设计 Users Container Component。
// 在本项目中 Users Container 的表现为 Route Components（这也是 dva 推荐的结构划分)，
// 可以理解页面维度的容器，所以我们在 /routes/ 下加入 Users.jsx。

//
// // 1. 传统写法
// const App = React.createClass({});
//
// // 2. es6 的写法
// class App extends React.Component({});
//
// // 3. stateless 的写法（我们推荐的写法）
// const App = (props) => ({});

