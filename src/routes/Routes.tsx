import Home from "../pages/home";
import Categories from "../pages/categories";
import LoginPage from "../pages/login";
import Authors from "../pages/authors";
import Books from "../pages/books";

export const mainRoutes = [
  { pathName: "/", element: <Home /> },
  { pathName: "/login", element: <LoginPage /> },
  { pathName: "/categories", element: <Categories /> },
  { pathName: "/authors", element: <Authors /> },
  { pathName: "/books", element: <Books /> },
];
