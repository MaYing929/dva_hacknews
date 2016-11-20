import { create, remove, update, query } from '../services/users';
import { parse } from 'qs';

export default {
  namespace: 'users',

  state: {
    list: [],
    total: null,
    field: '',
    keyword: '',
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },
  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === 'user') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },


  },

  effects: {

// 首先我们需要增加 *query 第二个参数 *query({ payload }, { select, call, put }) ，其中 call 和 put 是 dva 提供的方便操作 effects 的函数，简单理解
// call 是调用执行一个函数而 put 则是相当于 dispatch 执行一个 action，
// 而 select 则可以用来访问其它 model

    *query({ payload }, { select, call, put }) {

      yield put({ type: 'showLoading' });
      const { data } = yield call(query);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data[0].list,
            total: data.data[0].total,
            current: data.data[0].current
          }
        });
      }
    },

    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { name: payload });
      data:{
        success:true
      }
      if (data && data.success) {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
      }
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    },
  },

  reducers: {
    showLoading(state){
      return { ...state, loading: true };
    }, // 控制加载状态的 reducer
    deleteSuccess(state, action) {
      const name = action.payload;
      const newList = state.list.filter(user => user.name !== name);
      console.log('删除后',newList)
      return { ...state, list: newList, loading: false };
    },
    updateSuccess(state, action) {
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      console.log('action_showModal',action)
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
  }
}
