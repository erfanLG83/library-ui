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
  Pagination,
  Alert,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layout";
import defaultBookImage from "../../../assets/images/logo.png";
import BooksService from "../../../services/books.service";
import { BorrowedBookModel, LibraryBranch } from "../../../services/Models/BookModels";
import BaseApiService from "../../../services/base.service";
import { CgDanger } from "react-icons/cg";

const BorrowedBooksHistory = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBookModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchBorrowedBooks = async (pageIndex: number, pageSize: number) => {
    setLoading(true);
    const response = await BooksService.getBorrowedBooks(pageIndex, pageSize);

    if (response.success) {
      setBorrowedBooks(response.data!.items);
      setTotalCount(response.data!.totalCount);
    } else {
      alert("خطا ! \n" + response.errors[0].message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBorrowedBooks(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  return (
    <DashboardLayout>
      <Grid container spacing={2} style={{ direction: "rtl", textAlign: "right" }}>
        <Grid item xs={12}>

          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            سابقه امانت کتاب‌های شما
          </Typography>

          <Alert> شما میتوانید با حضور به شعبه انتخاب شده کتاب خود را تحویل بگیرید </Alert>
          <br/>
          <Alert severity="warning"> حداکثر مدت زمان نگه داشتن کتاب 30 روز می باشد</Alert>
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
                    <TableCell style={{ textAlign: "center" }}>تصویر</TableCell>
                    <TableCell style={{ textAlign: "center" }}>عنوان کتاب</TableCell>
                    <TableCell style={{ textAlign: "center" }}>دریافت شده از</TableCell>
                    <TableCell style={{ textAlign: "center" }}>تاریخ شروع</TableCell>
                    <TableCell style={{ textAlign: "center" }}>تاریخ پایان</TableCell>
                    <TableCell style={{ textAlign: "center" }}>جزئیات کتاب</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {borrowedBooks.map((book) => (
                    <>
                      <TableRow key={book.id}>
                        <TableCell style={{ textAlign: "center" }}>
                          <img
                            src={
                              book.bookImage
                                ? `${BaseApiService.API_URL}/${book.bookImage}`
                                : defaultBookImage
                            }
                            alt={book.bookTitle}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {book.bookTitle}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {book.branch === LibraryBranch.Branch1 ? 'شعبه 1' : 'شعبه 2'}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {new Date(book.startDate).toLocaleDateString("fa-IR")}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {book.endDate
                            ? new Date(book.endDate).toLocaleDateString("fa-IR")
                            : "نامشخص"}
                           {book.deadlineReached && <CgDanger fontSize={24} color="red"/>}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => navigate(`/customer/books/${book.bookId}`)}
                          >
                            مشاهده جزئیات
                          </Button>
                        </TableCell>
                      </TableRow>
                      {book.deadlineReached && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Alert severity="error" style={{ textAlign: "right" }}>
                              بیش از 30 روز از امانت گرفتن کتاب گذشته لطفا
                              آن را برگردانید. در صورت گذر زمان بدون تمدید کردن جریمه
                              می‌شوید.
                            </Alert>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Pagination
            count={Math.ceil(totalCount / pageSize)}
            page={pageIndex}
            onChange={handlePageChange}
            color="primary"
            style={{ direction: "ltr", justifyContent: "center", display: "flex" }}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default BorrowedBooksHistory;