import Home from "../pages/home";
import Categories from "../pages/categories";
import LoginPage from "../pages/login";

export const mainRoutes = [
  { pathName: "/", element: <Home /> },
  { pathName: "/login", element: <LoginPage /> },
  { pathName: "/categories", element: <Categories /> },
];
