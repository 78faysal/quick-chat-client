import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import HomeLayout from "./layout/HomeLayout.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./Components/Profile/Profile.jsx";
import ChatBox from "./Components/ChatBox/ChatBox.jsx";
import AllRequests from "./Components/AllRequests/AllRequests.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <PrivateRoute><HomeLayout /></PrivateRoute>,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          // <Profile />
          <PrivateRoute>
            <HomeLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "chats/:id",
            loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`),
            element: <ChatBox />,
          },
          {
            path: 'all-requests',
            element: <AllRequests />
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
