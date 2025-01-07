import { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Skeleton,
  Checkbox,
} from "@mui/material";
import DashboardLayout from "../../../layout";
import AuthService from "../../../services/auth.service";
import AuthorsService from "../../../services/authors.service";
import BooksService from "../../../services/books.service";
import PublishersService from "../../../services/publishers.service";
import CategoriesService from "../../../services/categories.service";
import defaultBookImage from "../../../assets/images/logo.png";
import { AuthorModel } from "../../../services/Models/AuthorModels";
import { PublisherModel } from "../../../services/Models/PublisherModels";
import { CategoryModel } from "../../../services/Models/CategoryModels";
import { LibraryBranch, SearchBookModel } from "../../../services/Models/BookModels";
import BaseApiService from "../../../services/base.service";

const CustomerHome = () => {
  const userInfo = AuthService.getUserInfoCache();
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    authorId: "",
    publisherId: "",
    categoryId: "",
    branch : ""
  });

  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [publishers, setPublishers] = useState<PublisherModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [books, setBooks] = useState<SearchBookModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    
    const response = await BooksService.search(
      pageIndex,
      pageSize,
      searchParams.searchTerm,
      searchParams.categoryId,
      searchParams.publisherId,
      searchParams.authorId,
      searchParams.branch
    );

    if (response.success === false) {
      alert("خطا ! \n" + response.errors[0].message);
    } else {
      setBooks(response.data!.items);
      setTotalPages(Math.ceil(response.data!.totalCount / response.data!.pageSize));
    }

    setLoading(false);
  }, [pageIndex, pageSize,searchParams]);

  useEffect(()=>{
    const fetchInitialData = async () => {
      const [authorRes, publisherRes, categoryRes] = await Promise.all([
        AuthorsService.getAll(1, 1000),
        PublishersService.getAll(1, 1000),
        CategoriesService.getAll(1, 1000),
      ]); 

      setAuthors(authorRes.data?.items ?? []);
      setPublishers(publisherRes.data?.items ?? []);
      setCategories(categoryRes.data?.items ?? []);
    };

    fetchInitialData();
  },[]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleChange = (e : any) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handlePageChange = (newPageIndex : number) => {
    setPageIndex(newPageIndex);
  };

  return (
    <DashboardLayout>
      <Grid container spacing={2} style={{ direction: "rtl", textAlign: "right" }}>
        <Typography variant="h5" style={{ marginBottom: "20px", width: "100%" }}>
          خوش آمدی {userInfo.firstName} {userInfo.lastName} عزیز
        </Typography>

        <Grid item xs={12} md={12}>
          <TextField
            label="جستجو"
            name="searchTerm"
            value={searchParams.searchTerm}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Select
            name="branch"
            value={searchParams.branch}
            onChange={handleChange}
            displayEmpty
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">انتخاب شعبه</MenuItem>
            <MenuItem key={LibraryBranch.Branch1} value={LibraryBranch.Branch1}>
              شعبه 1
            </MenuItem>
            <MenuItem key={LibraryBranch.Branch2} value={LibraryBranch.Branch2}>
              شعبه 2
            </MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={3}>
          <Select
            name="authorId"
            value={searchParams.authorId}
            onChange={handleChange}
            displayEmpty
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">انتخاب نویسنده</MenuItem>
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.firstName} {author.lastName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <Select
            name="publisherId"
            value={searchParams.publisherId}
            onChange={handleChange}
            displayEmpty
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">انتخاب ناشر</MenuItem>
            {publishers.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <Select
            name="categoryId"
            value={searchParams.categoryId}
            onChange={handleChange}
            displayEmpty
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">انتخاب دسته‌بندی</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px", direction: "rtl" }}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          : books.map((book) => (
              <Grid item xs={12} md={4} key={book.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.image ? `${BaseApiService.API_URL}/${book.image}` : defaultBookImage}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="body2">
                      نویسنده: {book.author.firstName} {book.author.lastName}
                    </Typography>
                    <Typography variant="body2">دسته‌بندی: {book.category.title}</Typography>
                    <Typography variant="body2">
                      موجود در شعبه 1 : <Checkbox checked={book.bookInBranches[0].quantity > 0} disabled readOnly/>
                    </Typography>
                    <Typography variant="body2">
                      موجود در شعبه 2 : <Checkbox checked={book.bookInBranches[1].quantity > 0} disabled readOnly/>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href={`/customer/books/${book.id}`}>
                      مشاهده جزئیات
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 1}
          style={{ margin: "0 10px" }}
        >
          صفحه قبل
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === totalPages}
          style={{ margin: "0 10px" }}
        >
          صفحه بعد
        </Button>
      </Grid>
    </DashboardLayout>
  );
};

export default CustomerHome;