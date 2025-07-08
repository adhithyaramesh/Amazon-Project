import { lazy } from "react";

export const Landing = lazy(() => import("../components/Pages/Product/Landing"));
export const Category = lazy(() => import("../components/Pages/Category/Category"));
export const SubCategory = lazy(() => import("../components/Pages/Category/SubCategory"));
export const Product = lazy(() => import("../components/Pages/Product/Product"));
export const ViewProductDetail = lazy(() => import("../components/Pages/Product/ViewProductDetail"));
export const Register = lazy(() => import("../components/Pages/Login/Register"));
export const Login = lazy(() => import("../components/Pages/Login/Login"));