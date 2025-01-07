import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Card,
  Pagination,
} from "@mui/material";
import DashboardLayout from "../../../layout";
import BooksService from "../../../services/books.service";
import { AdminBorrowedBookModel, LibraryBranch } from "../../../services/Models/BookModels";

const AdminBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<AdminBorrowedBookModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBorrowedBooks = async (pageIndex: number, pageSize: number) => {
    setLoading(true);
    const response = await BooksService.adminGetBorrowedBooks(pageIndex, pageSize);
    if (response.success) {
      setBorrowedBooks(response.data!.items);
      setTotalCount(response.data!.totalCount);
    } else {
      alert("خطا ! \n" + response.errors[0].message);
    }
    setLoading(false);
  };

  const handleAction = async (bookId: string, action: "received" | "returned") => {
    setLoading(true);
    let response;
    if (action === "received") {
      response = await BooksService.setBookReceived(bookId);
    } else {
      response = await BooksService.setBookReturned(bookId);
    }

    if (response.success) {
      alert("عملیات با موفقیت انجام شد.");
      fetchBorrowedBooks(pageIndex, pageSize);
    } else {
      alert("خطا ! \n" + response.errors[0].message);
    }
    setLoading(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  useEffect(() => {
    fetchBorrowedBooks(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <DashboardLayout>
      <Grid container spacing={2} style={{ direction: "rtl", textAlign: "right" }}>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            مدیریت امانت کتاب‌ها
          </Typography>
        </Grid>

        {loading ? (
          <Grid item xs={12}>
            <Typography variant="body1">در حال بارگذاری...</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TableContainer component={Card}>
              <Table style={{ direction: "rtl" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">عنوان کتاب</TableCell>
                    <TableCell align="center">نام امانت‌گیرنده</TableCell>
                    <TableCell align="center">شعبه</TableCell>
                    <TableCell align="center">تاریخ شروع</TableCell>
                    <TableCell align="center">تاریخ پایان</TableCell>
                    <TableCell align="center">وضعیت</TableCell>
                    <TableCell align="center">عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {borrowedBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell align="center">{book.bookTitle}</TableCell>
                      <TableCell align="center">{book.user.firstName} {book.user.lastName}</TableCell>
                      <TableCell align="center">
                        {book.branch === LibraryBranch.Branch1 ? "شعبه 1" : "شعبه 2"}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(book.startDate).toLocaleDateString("fa-IR")}
                      </TableCell>
                      <TableCell align="center">
                        {book.endDate
                          ? new Date(book.endDate).toLocaleDateString("fa-IR")
                          : "نامشخص"}
                      </TableCell>
                      <TableCell align="center">
                        {book.status === 0
                          ? "دریافت نشده"
                          : book.status === 1
                          ? "دریافت شده"
                          : "برگشت داده شده"}
                      </TableCell>
                      <TableCell align="center">
                        {book.status === 0 && (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleAction(book.id, "received")}
                          >
                            ثبت دریافت
                          </Button>
                        )}
                        {book.status === 1 && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={() => handleAction(book.id, "returned")}
                          >
                            ثبت بازگشت
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        <Grid item xs={12} style={{ marginTop: "20px", direction: "rtl", textAlign: "center" }}>
          <Pagination
            count={Math.ceil(totalCount / pageSize)}
            page={pageIndex}
            onChange={handlePageChange}
            color="primary"
            style={{ justifyContent: "center" }}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminBorrowedBooks;
