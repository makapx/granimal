import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import Store from "./store";
import App from "./App.tsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/anime/:id",
    element: <h1>Anime</h1>,
  },
  {
    path: "/search/:query",
    element: <h1>Search</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <h1>Profile</h1>,
  },
  {
    path: "/settings",
    element: <h1>Settings</h1>,
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={Store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);

