import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from 'Components/Header';
import Menu from 'Components/Menu';

import './PrivatePages.scss';

function PrivatePages({
  component: Component, logged, menu, ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => (logged ? (
        <div className="private-pages">
          <container-fluid>
            <Header />
            <div className="private-pages-content">
              <div className="private-pages-content-menu">
                <Menu items={menu} />
              </div>
              <div className="private-pages-content-components">
                <Component {...props} />
              </div>
            </div>
          </container-fluid>
        </div>
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      ))}
    />
  );
}

export default PrivatePages;
