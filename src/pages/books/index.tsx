import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  CircularProgress,
  Box,
} from "@mui/material";
import DashboardLayout from "../../layout";
import { BookModel } from "../../services/Models/BookModels";
import BooksService from "../../services/books.service";
import CreateModal from "./createModal";
import DeleteModal from "./deleteModal";
import { BooksListOrderBy } from "../../services/Models/ApiResult";
import moment from "jalali-moment";

const Books = () => {
  const headers = ["#", "عنوان", "توضیحات", "تاریخ انتشار", "زبان", "موجودی", "تاریخ ایجاد" , "عملیات ها"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [items, setItems] = useState<BookModel[] | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchBooks = useCallback(() => {
    BooksService.getAll(page + 1, rowsPerPage,true,BooksListOrderBy.createdDate).then(response => {
      if (!response.success) {
        alert("خطا ! \n" + response.errors[0].message);
        return;
      }

      setItems(response.data!.items);
      setTotalCount(response.data!.totalCount);
    });
  },[page, rowsPerPage]);

  useEffect(() => {
    fetchBooks();
  }, [page, rowsPerPage,fetchBooks]);

  return (
    <DashboardLayout>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={() => setCreateModalOpen(true)}>
          افزودن کتاب
        </Button>
      </Box>

      <TableContainer className="default_card">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell align="center" key={header}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!items && (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {items &&
              items.map((book, i) => (
                <TableRow key={book.id}>
                  <TableCell align="center">{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell align="center">{book.title}</TableCell>
                  <TableCell align="center">{book.description}</TableCell>
                  <TableCell align="center">{book.publicationDate}</TableCell>
                  <TableCell align="center">
                    {["فارسی", "انگلیسی", "دیگر"][book.language]}
                  </TableCell>
                  <TableCell align="center">{book.quantity}</TableCell>
                  <TableCell align="center">{moment(book.createdAt).locale('fa').format('YYYY/MM/DD')}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSelectedBook(book);
                        setCreateModalOpen(true);
                      }}
                    >
                      ویرایش
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => {
                        setSelectedBook(book);
                        setDeleteModalOpen(true);
                      }}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد سطرها در هر صفحه:"
          labelDisplayedRows={({ page }) =>
            `صفحه ${page+1}`
          }
          sx={{ direction: "ltr" }}
        />
      </TableContainer>

      <CreateModal
        bookData={selectedBook}
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setSelectedBook(null);
        }}
        onBookSaved={fetchBooks}
      />
      
      <DeleteModal
        open={deleteModalOpen}
        book={selectedBook}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedBook(null);
        }}
        onBookDeleted={fetchBooks}
      />
    </DashboardLayout>
  );
};

export default Books;