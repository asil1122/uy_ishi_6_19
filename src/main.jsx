import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClientProvider } from '@tanstack/react-query'
import { client } from './config/query-client.js'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ConfigProvider theme={{ token: { colorPrimary: "#bc8e5b" } }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
