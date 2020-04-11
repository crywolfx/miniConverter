import React, { useState } from 'react';
import { FileAddOutlined } from '@ant-design/icons';

import openFile from '../../../common/openFile';
import style from './index.scss';
import { FfprobeData } from '../../../common/ffmpeg/core';

export default function Converting() {
  const defaultVideoList: FfprobeData[] = [];
  const [videoList, setVideoList] = useState(defaultVideoList);

  function addFile() {
    openFile.openVideo().then(res => {
      console.log(res);
      setVideoList(res);
    });
  }
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
