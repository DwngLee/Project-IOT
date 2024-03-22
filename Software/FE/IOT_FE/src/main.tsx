import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./page/DashBoardPage";
import Profile from "./page/ProfilePage";
import DataSensorPage from "./page/DataSensorPage";
import ActionHistoryPage from "./page/ActionHistoryPage";
import Chat from "./components/page";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
  { path: "/testsocket", element: <Chat></Chat> },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
