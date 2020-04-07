import { FunctionComponent } from 'react';
import VideoConvert from '../pages/VideoConvert/index';

interface RouteInfo {
  key: string;
  name: string;
  component: FunctionComponent;
  path: string;
}

const routes: { [key: string]: RouteInfo } = {
  home: {
    key: 'home',
    name: 'home',
    path: '/',
    component: VideoConvert
  }
};

export default routes;
