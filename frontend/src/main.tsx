import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './redux/store'

const router = createBrowserRouter([{
  path: '/',
  element: <App/>
}])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>,
  </React.StrictMode>,
)
