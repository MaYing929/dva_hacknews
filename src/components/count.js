import styles from '../index.less';
import  { connect } from 'dva';
import React from 'react';


const CountApp = ({count, dispatch}) => {

    console.log('count',count)



  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
      </div>
    </div>
  );

  // count/add 用model层的add方法
};

// function mapStateToProps({count}) {
//   return { count };
// }
 // ===

function mapStateToProps(state) {
   return { count: state.count };
 }

export default connect(mapStateToProps)(CountApp);

