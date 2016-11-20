import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import UserApp from './routes/UserApp';
import CountApp from './components/count';
import NotFound from './routes/NotFound';
import MainLayout from  './components/MainLayout/MainLayout';
export default function({ history }) {
  return (
    // <Router history={history} >
    //   <IndexRoute component={IndexPage}/>
    //
    //   {/*<Route path="count" component={CountApp} />*/}
    //
    //   <Route path="user" component={MainLayout}>
    //     <Route path="user" component={UserApp} />
    //     <Route path="*" component={NotFound} />
    //   </Route>
    //
    // </Router>


    <Router history={history}>

    <Route path="/" component={MainLayout}>
        <IndexRoute component={IndexPage}/>
        <Route path="count" component={CountApp} />
        <Route path="user" component={UserApp}/>
        <Route path="*" component={NotFound} />
    </Route>

    </Router>

  )
};
