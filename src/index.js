import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react';

const publishableKey=process.env.REACT_APP_PUBLISHABLE_KEY
// const publishableKey1=process.env.REACT_APP_FILE_SECRET_PASSWORD
// console.log(publishableKey1)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
