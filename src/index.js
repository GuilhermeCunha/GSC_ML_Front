import React from 'react';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';

ReactDOM.render(< App />, document.querySelector('#root'));

//ReactDOM.render(< rotas />);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
