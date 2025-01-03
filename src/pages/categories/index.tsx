import React, { useEffect, useState } from "react";
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
  useTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import DashboardLayout from "../../layout";
import { CategoryModel } from "../../services/Models/CategoryModels";
import CategoriesService from "../../services/categories.service";

const Products = () => {
  const theme = useTheme();

  const headers = ["#", "عنوان", "عملیات ها"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [items, setItems] = useState<CategoryModel[] | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(()=>{
    CategoriesService.getCategories(page+1,rowsPerPage).then(response =>{
      if(response.success === false){
        alert('خطا ! \n' + response.errors[0].message)
        return;
      }

      setItems(response.data!.items);
      setTotalCount(response.data!.totalCount);
    });
  },[page,rowsPerPage]);

  return (
    <DashboardLayout>
      <TableContainer
        className="default_card"
        sx={{ background: theme.palette.background.paper }}
      >
        <Table aria-label="categories">
          <TableHead>
            <TableRow>
              {headers.map((headerItem: string) => (
                <TableCell align="center" key={headerItem}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
                  >
                    {headerItem}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!items &&
              <TableRow sx={{display:'flex'}}>
                <CircularProgress />
              </TableRow>
            }
            {items && items.map((category, i) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  <Typography
                    variant="body2"
                    component="h6"
                    sx={{ fontWeight: 700 }}
                  >
                    {page * rowsPerPage + i + 1}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    component="h6"
                    sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
                  >
                    {category.title}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button>ویرایش</Button>
                  <Button>حذف</Button>
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
    </DashboardLayout>
  );
};

export default Products;