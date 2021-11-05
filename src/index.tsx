import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./router";
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.css';

moment.locale('zh-cn');
console.log(process.env);

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router />
  </ConfigProvider>,
  document.getElementById('root')
);
// <React.StrictMode> </React.StrictMode >

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
