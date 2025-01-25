import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Routes/router';
import { Provider } from "react-redux";
import { store, persistor } from "../Store/store"; 
import { PersistGate } from 'redux-persist/integration/react';
import '../src/index.css';
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        <Analytics />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
