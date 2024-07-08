import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/Error/Error.jsx';
import App from './components/App/App.jsx';
import PostForm from './components/Form/PostForm.jsx';
import PostDisplay from './components/PostDisplay/PostDisplay.jsx';
import Login from './components/Form/Login.jsx';
import Register from './components/Form/Register.jsx';
import Home from './components/Home/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'create',
        element: <PostForm />,
      },
      {
        path: 'posts/:id/update',
        element: <PostForm />,
      },
      {
        path: 'posts/:id',
        element: <PostDisplay />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
