import React from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { Music } from '../Icon/index';

import style from './index.scss';

export default function footer() {
  return (
    <div className={`${style.footer} flex f-fd-r f-fs-0 f-ai-c f-jc-sb`}>
      <div className="flex f-fd-r f-fs-0 f-ai-c">
        <div className={`${style.music} pointer flex f-ai-c f-jc-c`}>
          <Music
            style={{
              fontSize: 24
            }}
          />
        </div>
        <div className={style.split} />
        <div className={`${style.output} flex f-fd-r f-ai-c`}>
          <span>输出:</span>
          <div className={`${style.outputText} flex f-jc-sb pointer f-ai-c`}>
            <span>与源文件夹相同</span>
            <CaretDownOutlined style={{ fontSize: 12 }} />
          </div>
        </div>
      </div>
      <div className={`${style.start} flex f-fd-r f-fs-0 f-ai-c`}>
        <span>合并所有视频:</span>
        <Switch className={`${style.switch}`} size="small" />
        <Button
          type="primary"
          className={`${style.all} flex f-ai-c f-jc-c pointer`}
        >
          全部转换
        </Button>
      </div>
    </div>
  );
}
