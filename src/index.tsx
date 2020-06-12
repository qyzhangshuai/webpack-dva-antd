/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-10 20:11:15
 * @LastEditTime: 2020-06-11 17:36:58
 * @LastEditors: zs
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

// function test() {
//   return new Promise((resolve) => {
//     resolve('你好')
//   })
// }

// const App = () => {
//   // test().then(resolve => {
//   //   console.log('resolve', resolve)
//   // })

//   return <div>hello world</div>
// }

// ReactDOM.render(<App />, document.getElementById('root'));

import dva from 'dva';
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');