import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';
import videoReadyList from './video';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    videoReadyList,
    counter
  });
}
