import React,{Component} from 'react';
import {Spin} from 'antd';
import s from './Loading.module.less';

function Loading({retry, onRetry}) {
  return (
    <div className={s.root}>
      <div>
        {!retry ? <Spin /> : <span>加载失败，点击<a onClick={onRetry}>重试</a></span>}
      </div>
    </div>
  );
}

export default Loading;