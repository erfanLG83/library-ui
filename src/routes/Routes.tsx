import AdminHome from "../pages/admin/home";
import Categories from "../pages/admin/categories";
import AdminLoginPage from "../pages/admin/login";
import Authors from "../pages/admin/authors";
import Books from "../pages/admin/books";
import CustomerLoginPage from "../pages/customer/login";
import CustomerHome from "../pages/customer/home";
import BookDetails from "../pages/customer/bookDetails";
import BorrowedBooksHistory from "../pages/customer/borrowedBooks";
import AdminBorrowedBooks from "../pages/admin/borrowedBooks";

export const mainRoutes = [
  { pathName: "/admin/home", element: <AdminHome /> },
  { pathName: "/admin/login", element: <AdminLoginPage /> },
  { pathName: "/admin/categories", element: <Categories /> },
  { pathName: "/admin/authors", element: <Authors /> },
  { pathName: "/admin/books", element: <Books /> },
  { pathName: "/admin/borrowedBooks", element: <AdminBorrowedBooks /> },
  
  { pathName: "/customer/home", element: <CustomerHome /> },
  { pathName: "/customer/login", element: <CustomerLoginPage /> },
  { pathName: "/customer/books/:id", element: <BookDetails /> },
  { pathName: "/customer/borrowedBooks", element: <BorrowedBooksHistory /> },
];
