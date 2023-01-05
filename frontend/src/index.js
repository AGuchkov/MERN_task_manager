import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer bodyStyle={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif' }} />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
