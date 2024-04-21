import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { OrgsContextProvider } from './context/OrgContext'
import { CompaniesContextProvider } from './context/CompanyContext'
import { GrantsContextProvider } from './context/GrantContext'
import { DonationsContextProvider } from './context/DonationsContext';
import { DonorHistReqsContextProvider } from './context/DonorHistReqContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrgsContextProvider>
        <CompaniesContextProvider>
          <GrantsContextProvider>
            <DonationsContextProvider>
              <DonorHistReqsContextProvider>
                <App />
              </DonorHistReqsContextProvider>
            </DonationsContextProvider>
          </GrantsContextProvider>
        </CompaniesContextProvider>
      </OrgsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);