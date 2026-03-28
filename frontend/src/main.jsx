import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'  // ← Corregido: "import" y ruta correcta
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)