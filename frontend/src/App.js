import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import AppRoutes from './routes';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
