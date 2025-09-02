import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseProvider } from './firebase'; // 1. Importamos nuestro nuevo "proveedor" de Firebase.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Envolvemos toda la aplicación con el FirebaseProvider. */}
    {/* Esto asegura que la conexión a Firebase esté lista ANTES de que la app intente usarla. */}
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);

