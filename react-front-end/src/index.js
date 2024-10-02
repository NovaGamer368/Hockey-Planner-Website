import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.css'
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Update from './components/Update';
import Create from './components/Create';
import Nav from './components/Nav';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';


const router = createBrowserRouter([
  {
    path:'/',
    element: <><Nav/><Home/></>
  },
  {
    path: '/:teamId',
    element: <><Nav/><Home/></>
  },
  {
    path:'/update/:teamId',
    element: <><Nav/><Update /></>
  },
  {
    path: '/newTeam',
    element: <><Nav/><Create/></>
  },
  {
    path: '/login',
    element:<><Login/></>
  },
  {
    path: '/user',
    element: <><User/></>
  },
  {
    path: '/register',
    element: <><Register /></>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
