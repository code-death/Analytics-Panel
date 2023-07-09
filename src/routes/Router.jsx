import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
import App from '../App'

const redirectTo = (url) => {
    redirect(url)
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }, {
        path: '/analytics',
        element: <App />
    }
])

export default router