import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { SupabaseDataProvider } from './context/SupabaseDataContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SupabaseDataProvider>
          <AppProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  borderRadius: '16px',
                  padding: '12px 14px',
                  background: '#0f172a',
                  color: '#fff',
                },
              }}
            />
          </AppProvider>
        </SupabaseDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
