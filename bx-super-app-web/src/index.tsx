import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import QueryClientProviderRoot from './query-client';

import './styles/base.css';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-nice-dates/build/style.css';
import 'components/ui-bx/styles/ui-bx.scss';

import 'utils/i18n';

import AppProvider from './contexts/app-provider';
import App from './App';
import MDXProviderComponents from 'mdx/components';
import reportWebVitals from './reportWebVitals';
import { ddInit } from 'utils/dd';

ddInit();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProviderRoot>
      <BrowserRouter>
        <AppProvider>
          <MDXProviderComponents>
            <App />
          </MDXProviderComponents>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProviderRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
