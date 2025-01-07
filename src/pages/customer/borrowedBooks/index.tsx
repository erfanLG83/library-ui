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
import { BorrowedBookModel } from "../../../services/Models/BookModels";
import BaseApiService from "../../../services/base.service";

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

    if(response.success){
        setBorrowedBooks(response.data!.items);
        setTotalCount(response.data!.totalCount);
    }
    else{
        alert('خطا ! \n'+response.errors[0].message);
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
          <Typography variant="body2" style={{ marginBottom: "20px", color: "gray" }}>
            حداکثر مدت زمان نگه داشتن کتاب: 30 روز
          </Typography>
        </Grid>

        {loading ? (
          <Grid item xs={12}>
            <Typography variant="body1">در حال بارگذاری...</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>تصویر</TableCell>
                    <TableCell>عنوان کتاب</TableCell>
                    <TableCell>تاریخ شروع</TableCell>
                    <TableCell>تاریخ پایان</TableCell>
                    <TableCell>جزئیات کتاب</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {borrowedBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <img
                          src={book.bookImage ? `${BaseApiService.API_URL}/${book.bookImage}` : defaultBookImage}
                          alt={book.bookTitle}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell>{book.bookTitle}</TableCell>
                      <TableCell>
                        {new Date(book.startDate).toLocaleDateString("fa-IR")}
                      </TableCell>
                      <TableCell>
                        {book.endDate
                          ? new Date(book.endDate).toLocaleDateString("fa-IR")
                          : "نامشخص"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/customer/books/${book.bookId}`)}
                        >
                          مشاهده جزئیات
                        </Button>
                      </TableCell>
                      {book.deadlineReached && (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Alert severity="error" style={{ textAlign: "right" }}>
                              بیش از 30 روز از امانت گرفتن کتاب گذشته لطفا
                              آن را برگردانید. در صورت گذر زمان بدون تمدید کردن جریمه
                              می‌شوید.
                            </Alert>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableRow>
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
            style={{ direction: "ltr" }}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default BorrowedBooksHistory;