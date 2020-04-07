import React, { useState } from 'react';
import { FileAddOutlined, CaretDownOutlined } from '@ant-design/icons';
import style from './index.scss';

export default function Header() {
  const [status, setStatus] = useState('converting');

  return (
    <div className={`${style.container} relative flex f-ai-c f-jc-sb f-fs-0`}>
      <div className={`${style.addFile} flex f-fs-0 f-ai-c pointer`}>
        <FileAddOutlined style={{ fontSize: 14 }} />
        <span className={style.addText}>添加文件</span>
        <CaretDownOutlined style={{ fontSize: 12 }} />
      </div>
      <div className={`${style.status} absolute flex f-ai-c pointer`}>
        <div
          className={`${style.statusItem} ${(status === 'converting' &&
            style.statusCurrent) ||
            ''}`}
          onClick={() => setStatus('converting')}
        >
          正在转换
        </div>
        <div
          className={`${style.statusItem} ${(status === 'converted' &&
            style.statusCurrent) ||
            ''}`}
          onClick={() => setStatus('converted')}
        >
          已转换
        </div>
      </div>
      <div className={`${style.transFileToContainer} flex f-fs-0 f-ai-c`}>
        <span>转换所有任务到:</span>
        <div className={`${style.transFileToText} flex f-jc-sb pointer f-ai-c`}>
          <span>MP4</span>
          <CaretDownOutlined style={{ fontSize: 12 }} />
        </div>
      </div>
    </div>
  );
}
