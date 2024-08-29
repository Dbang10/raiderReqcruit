import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext'; 
import './styles/index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <UserProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  );
}