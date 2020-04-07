import React from 'react';
import ToolBar from '../../components/ToolBar/index';
import Footer from '../../components/Footer/index';
import Converting from './converting/index';
import style from './index.scss';

export default function VideoConvert() {
  return (
    <div className={`${style.videoConvert} flex f-fd-c`}>
      <ToolBar />
      <div className={style.content}>
        <Converting />
      </div>
      <Footer />
    </div>
  );
}
