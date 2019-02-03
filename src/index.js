import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { AppProvider } from '@shopify/polaris';

import translate from 'Config/Translate';

import * as serviceWorker from 'Config/ServiceWorker';
import configureStore from 'Config/Store';

import App from 'App';

import './index.css';
import '@shopify/polaris/styles.scss';

const { persistor, store } = configureStore();

const main = (target, language) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <AppProvider i18n={translate[language]}>
          <App />
        </AppProvider>
      </PersistGate>
    </Provider>,
    target,
  );
};

main(document.getElementById('root'), 'ptBr');

serviceWorker.unregister();
