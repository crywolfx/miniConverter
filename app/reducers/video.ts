import { AnyAction } from 'redux';
import { SET_READY_LIST } from '../actions/video';

export default function videoReadyList(state = [], action: AnyAction) {
  switch (action.type) {
    case SET_READY_LIST:
      return action.data;
    default:
      return state;
  }
}
