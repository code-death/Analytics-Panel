import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './routes/Router.jsx'
import {
  RouterProvider, redirect
} from  'react-router-dom'

import store from './store/index.jsx'
import { Provider } from 'react-redux'

redirect('/analytics')

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
