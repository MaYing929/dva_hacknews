/**
 * Created by maying on 16/11/19.
 */

import React from 'react';
import { Link } from 'dva/router';
import Indexpagestyles from './IndexPage.less';
const Indexpage = ({}) => {

  return (
    <div  className={Indexpagestyles.normal2}>
      <Link to="count">Count</Link>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <Link to="user">User</Link>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
    </div>
  );
};

export default Indexpage;

