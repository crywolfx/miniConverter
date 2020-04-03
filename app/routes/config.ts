import { FunctionComponent } from 'react';
import HomePage from '../pages/HomePage';
import CounterPage from '../pages/CounterPage';

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
    component: HomePage
  },
  counterPage: {
    key: 'CounterPage',
    name: 'CounterPage',
    path: '/counter',
    component: CounterPage
  }
};

export default routes;
