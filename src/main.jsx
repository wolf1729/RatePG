import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import Router from './Routes/router';
import { Provider } from "react-redux";
import { store, persistor } from "../Store/store"; 
import { PersistGate } from 'redux-persist/integration/react';
import '../src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
