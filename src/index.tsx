import React from 'react';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { App } from './components';
import { AuthProvider } from './context/AuthProvider';
import { PATH } from './constants/path';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './styles.scss';

const DOMElement = document.getElementById('root')!;

const root = createRoot(DOMElement);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path={PATH.GLOBAL} element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
