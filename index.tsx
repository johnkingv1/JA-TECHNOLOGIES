
import React from 'react';
import ReactDOM from 'react-dom/client';
import Aplicacion from './Aplicacion';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("No se pudo encontrar el elemento raíz para el montaje");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Aplicacion />
  </React.StrictMode>
);
