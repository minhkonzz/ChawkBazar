import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import "./common/styles/index.css"
import "./common/styles/grid.css"
import reportWebVitals from './reportWebVitals';
import store from "./services/redux/store";
import { Provider as ReduxStoreProvider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ReduxStoreProvider store={store}>
      <Router />
   </ReduxStoreProvider>
);

reportWebVitals();
