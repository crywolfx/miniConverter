import React from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import style from './index.scss';

export default function Converting() {
  function addFile() {}
  return (
    <div className={`${style.Converting} relative`}>
      <div
        className={`${style.input} absolute pointer flex f-fd-c f-ai-c f-jc-c`}
        onClick={addFile}
      >
        <FileAddOutlined className={style.icon} />
        <span className={style.text}>添加文件或拖拽文件到此处</span>
      </div>
    </div>
  );
}
