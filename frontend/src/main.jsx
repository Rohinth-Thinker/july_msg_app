import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { MediaContextProvider } from './context/MediaContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <SocketContextProvider>
          <MediaContextProvider>
            <App />
          </MediaContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
)
