import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup.tsx";
import AnimePage from "./pages/AnimePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/category/:id",
    element: <Category />,
  },
  {
    path: "/anime/:id",
    element: <AnimePage />
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
      <RouterProvider router={router} />
  </React.StrictMode>
);
