import React from 'react';
import { VideoConvert } from '../../common/icon';

import style from './index.scss';

export default function Header() {
  return (
    <div className={`${style.header} flex f-fd-c`}>
      <div className="flex f-fd-r f-jc-c">
        <div className={`${style.format} flex f-fd-c f-ai-c pointer`}>
          <VideoConvert
            style={{
              fontSize: '34px'
            }}
          />
          <span className={style.iconText}>转换</span>
        </div>
      </div>
      <div className={style.line} />
    </div>
  );
}
