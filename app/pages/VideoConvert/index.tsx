import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ToolBar from '../../components/ToolBar/index';
import Footer from '../../components/Footer/index';
import Converting from './components/converting/index';
import style from './index.scss';

import { setVideoReadyList } from '../../actions/video';

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
