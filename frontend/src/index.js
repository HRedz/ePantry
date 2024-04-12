import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { OrgsContextProvider } from './context/OrgContext'
import { CompaniesContextProvider } from './context/CompanyContext'
import { GrantsContextProvider } from './context/GrantContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrgsContextProvider>
        <CompaniesContextProvider>
          <GrantsContextProvider>
            <App />
          </GrantsContextProvider>
        </CompaniesContextProvider>
      </OrgsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);