import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./page/DashBoardPage";
import Profile from "./page/ProfilePage";
import DataSensorPage from "./page/DataSensorPage";
import ActionHistoryPage from "./page/ActionHistoryPage";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/datasensor",
    element: <DataSensorPage />,
  },
  {
    path: "/actionhistory",
    element: <ActionHistoryPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
