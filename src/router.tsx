import { createBrowserRouter } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop.tsx";
import NotFoundPage from '@/pages/NotFound.tsx';

import AuthLayout from "@/pages/auth/AuthLayout.tsx";
import Login from '@/pages/auth/Login.tsx';
import ForgotPassword from "@/pages/auth/ForgotPassword.tsx";
import VerifyEmail from "@/pages/auth/VerifyEmail.tsx";
import CreateNewPassword from "@/pages/auth/CreateNewPassword.tsx";
import AccountLayout from "./pages/account/AccountLayout";
import Dashboard from "./pages/account/Dashboard";
import Releases from "./pages/account/uploads/Releases";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <ScrollToTop />,
      children: [
        {
          path: "",
          element: <Login />,
        },

        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />
            },
            {
              path: "login",
              element: <Login />
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />
            },
            {
              path: "verify-email",
              element: <VerifyEmail />
            },
            {
              path: "create-new-password",
              element: <CreateNewPassword />
            },
          ]
        },

        {
          path: "admin",
          element: <AccountLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />
            },
            {
              path: "uploads",
              // element: <Dashboard />
              children: [
                {
                  path: "",
                  element: <Releases />
                },
              ]

            },
            
          ]
        }
      ]
    },

    {
      path: "*",
      element: <NotFoundPage />
    }
]);