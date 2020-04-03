import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './config';

export default function Routes() {
  return (
    <Switch>
      {Object.keys(routes).map((key: string) => {
        const routeItem = routes[key];
        return (
          <Route
            exact
            key={routeItem.key || routeItem.path}
            path={routeItem.path}
            component={routeItem.component}
          />
        );
      })}
    </Switch>
  );
}
