import { createBrowserRouter, Navigate } from "react-router-dom";

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
import ReleasesDetails from "./pages/account/uploads/ReleasesDetails";
import Coupons from "./pages/account/coupon/Coupons";
import CouponDetails from "./pages/account/coupon/CouponDetails";
import Contacts from "./pages/account/contact/Contacts";
import ContactDetails from "./pages/account/contact/ContactDetails";
import Subscribers from "./pages/account/newsletters/Subscribers";
import SendNewsletter from "./pages/account/newsletters/SendNewsletter";
import NewsletterHistory from "./pages/account/newsletters/NewsletterHistory";
import NewsletterDetails from "./pages/account/newsletters/NewsletterDetails";
import Promotions from "./pages/account/promotions/Promotions";
import PromotionHistory from "./pages/account/promotions/PromotionHistory";
import Users from "./pages/account/users/Users";
import UserDetails from "./pages/account/users/UserDetails";
import Analytics from "./pages/account/analytics/Analytics";
import AnalyticsDetails from "./pages/account/analytics/AnalyticsDetails";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <ScrollToTop />,
      children: [
        {
          path: "",
          element: <Navigate replace to={"/auth/login"} />,
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
              path: "analytics",
              // element: <Dashboard />
              children: [
                {
                  path: "",
                  element: <Analytics />
                },
                {
                  path: "details",
                  // path: ":_id",
                  element: <AnalyticsDetails />
                },
              ]
            },
            {
              path: "users",
              // element: <Dashboard />
              children: [
                {
                  path: "",
                  element: <Users />
                },
                {
                  // path: "details",
                  path: ":_id",
                  element: <UserDetails />
                },
              ]
            },
            {
              path: "uploads",
              // element: <Dashboard />
              children: [
                {
                  path: "",
                  element: <Releases />
                },
                {
                  path: "details",
                  element: <ReleasesDetails />
                },
              ]
            },
            {
              path: "coupons",
              children: [
                {
                  path: "",
                  element: <Coupons />
                },
                {
                  path: "details",
                  element: <CouponDetails />
                },
              ]
            },
            {
              path: "promotions",
              children: [
                {
                  path: "",
                  element: <Promotions />
                },
                {
                  // path: "details",
                  path: "history",
                  element: <PromotionHistory />
                },
              ]
            },
            {
              path: "contacts",
              children: [
                {
                  path: "",
                  element: <Contacts />
                },
                {
                  // path: "details",
                  path: ":_id",
                  element: <ContactDetails />
                },
              ]
            },
            {
              path: "newsletter",
              children: [
                {
                  path: "",
                  element: <SendNewsletter />
                },
                {
                  path: "subscribers",
                  element: <Subscribers />
                },
                {
                  path: "history",
                  element: <NewsletterHistory />
                },
                {
                  path: ":_id",
                  element: <NewsletterDetails />
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