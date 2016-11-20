import key from 'keymaster';

import {delay} from '../utils/util'

export default {

  namespace: 'count',

  state: {
    record:0, //highest record，
    current:0 //current 表示当前速度
  },
  subscriptions: {

    // setup({ dispatch, history }) {
    // },

    keyboardWatcher({ dispatch }) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },

  },

  effects: {
    // *fetchRemote({ payload }, { call, put }) {
    // },

    *add(action,{call,put}){

      yield call(delay,1000)
      yield put({ type: 'minus' })

        }
  },

  reducers: {

    // fetch(state, action) {
    //   return { ...state, ...action.payload };
    // },

    add(state){
      const newCurrent = state.current + 1;
      return {...state ,
        record:newCurrent >= state.record ? newCurrent : state.record ,
        current:state.record
      }

    },
    minus(state){
      return {...state,current:state.current - 1}
    }




  },



}
