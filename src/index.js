import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { AppProvider } from '@shopify/polaris';

import * as serviceWorker from './Config/ServiceWorker';
import configureStore from './Config/Store';

import App from './App';

import './index.css';
import '@shopify/polaris/styles.scss';

const { persistor, store } = configureStore();

const render = (target, language) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor} >
        <AppProvider>
          <App />
        </AppProvider>
      </PersistGate>
    </Provider>
    , target
  );
}

render(document.getElementById('root'), 'pt-br');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

//TODO: Na hora do build criar pegar um arquivo da raiz pro projeto e colocar na build.