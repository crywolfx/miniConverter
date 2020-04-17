import { GetState, Dispatch } from '../reducers/types';
import { FfprobeData } from '../common/ffmpeg/core';

export const SET_READY_LIST = 'SET_READY_LIST';

export const setVideoReadyList = (list: FfprobeData[]) => {
  return {
    type: SET_READY_LIST,
    data: list
  };
};
