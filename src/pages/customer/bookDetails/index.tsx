import { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Skeleton,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../../layout";
import BooksService from "../../../services/books.service";
import defaultBookImage from "../../../assets/images/logo.png";
import { BookDetailsModel, BookLanguage, LibraryBranch } from "../../../services/Models/BookModels";
import BaseApiService from "../../../services/base.service";

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<BookDetailsModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowLoading, setBorrowLoading] = useState(false);
  const [branch,setBranch] = useState("");

  const fetchBookDetails = useCallback(async () => {
        setLoading(true);
        const response = await BooksService.getDetails(id!);

        if(response.success === false){
            alert('خطا !\n'+ response.errors[0].message)
        }
        else{
            setBookDetails(response.data!);
        }
        setLoading(false);
    },[id])

  useEffect(() => {

    fetchBookDetails();
  },[fetchBookDetails, id]);

  const handleBorrow = async () => {
    setBorrowLoading(true);
    const response = await BooksService.borrow(id!,branch);
    if (response.success) {
      alert("کتاب با موفقیت امانت گرفته شد.");
      await fetchBookDetails();
    } else {
      alert("خطایی رخ داده است: \n" + response.errors[0].message);
    }
    setBorrowLoading(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Grid container spacing={2} style={{ direction: "rtl", textAlign: "right" }}>
          {Array.from({ length: 1 }).map((_, idx) => (
            <Grid item xs={12} key={idx}>
              <Skeleton variant="rectangular" height={300} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </Grid>
          ))}
        </Grid>
      </DashboardLayout>
    );
  }

  if (!bookDetails) {
    return (
      <DashboardLayout>
        <Typography variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
          کتابی یافت نشد.
        </Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Grid container spacing={2} style={{ direction: "rtl", textAlign: "right" }}>
        
      <Grid item xs={12} md={7}>
          <Typography variant="h5">{bookDetails.title}</Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            توضیحات: {bookDetails.description || "اطلاعاتی موجود نیست."}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            زبان: {bookDetails.language === BookLanguage.Persian ? 'فارسی' : 'انگلیسی'}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            مترجمین: {bookDetails.interpreters}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            نویسنده: {bookDetails.author.firstName} {bookDetails.author.lastName}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            ناشر: {bookDetails.publisher.name}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            دسته‌بندی: {bookDetails.category.title}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            تاریخ انتشار: {bookDetails.publicationDate}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            موجود در شعبه 1 : <Checkbox readOnly disabled checked={bookDetails.bookInBranches[0].quantity > 0}/>
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            موجود در شعبه 2 : <Checkbox readOnly disabled checked={bookDetails.bookInBranches[1].quantity > 0}/>
          </Typography>
          <Grid>
            <Grid item xs={3}>
                <Select 
                    value={branch} 
                    onChange={(e) => setBranch(e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="" > شعبه را انتخاب کنید </MenuItem>
                    <MenuItem disabled={bookDetails.bookInBranches[0].quantity <= 0} key={LibraryBranch.Branch1} value={LibraryBranch.Branch1}> شعبه 1 </MenuItem>
                    <MenuItem disabled={bookDetails.bookInBranches[1].quantity <= 0} key={LibraryBranch.Branch1} value={LibraryBranch.Branch2}> شعبه 2 </MenuItem>
                </Select>
            </Grid>
            
            <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                    onClick={handleBorrow}
                    disabled={bookDetails.userBorrowedBook || borrowLoading || branch === ''}
                >
                    {borrowLoading
                    ? "در حال امانت گرفتن..."
                    : bookDetails.userBorrowedBook
                    ? "کتاب قبلاً امانت گرفته شده"
                    : "امانت گرفتن کتاب"}
                </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              src={bookDetails.image ? `${BaseApiService.API_URL}/${bookDetails.image}` : defaultBookImage}
              alt={bookDetails.title}
            />
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default BookDetails;