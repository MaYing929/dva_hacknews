import './index.html';
import './index.less';
import dva from 'dva';
import React from 'react';
import 'antd/dist/antd.css';
import { browserHistory } from 'dva/router';



let allModels = [
  require('./models')
];





// 1. Initialize
const app = dva({
  history: browserHistory,
});

// 2. Plugins
//app.use({});

// 3. Model

allModels.forEach( models => {
  models.forEach( theModel => {
    app.model(theModel);
  });
})


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');


