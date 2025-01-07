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
  useTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import DashboardLayout from "../../../layout";
import { AuthorModel } from "../../../services/Models/AuthorModels";
import AuthorsService from "../../../services/authors.service";
import CreateModal from "./createModal";
import DeleteModal from "./deleteModal";
import UpdateModal from "./updateModal";

const Authors = () => {
  const theme = useTheme();

  const headers = ["#", "نام",'نام خانوادگی', "عملیات ها"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [items, setItems] = useState<AuthorModel[] | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorModel | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchAuthors = useCallback(() => {
    AuthorsService.adminGetAll(page+1, rowsPerPage).then((response) => {
      if (response.success === false) {
        alert("خطا ! \n" + response.errors[0].message);
        return;
      }

      setItems(response.data!.items);
      setTotalCount(response.data!.totalCount);
    });
  },[page, rowsPerPage]);
  
  useEffect(() => {
    fetchAuthors();
  }, [page, rowsPerPage,fetchAuthors]);

  return (
    <DashboardLayout>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateModalOpen(true)}
        >
          ایجاد نویسنده جدید
        </Button>
      </Box>

      <TableContainer
        className="default_card"
        sx={{ background: theme.palette.background.paper }}
      >
        <Table aria-label="authors">
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
            {!items && (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {items &&
              items.map((author, i) => (
                <TableRow
                  key={author.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="center">{author.firstName}</TableCell>
                  <TableCell align="center">{author.lastName}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSelectedAuthor(author);
                        setUpdateModalOpen(true);
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
                        setSelectedAuthor(author);
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
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAuthorCreated={fetchAuthors}
      />
      <UpdateModal
        open={updateModalOpen}
        author={selectedAuthor}
        onClose={() => setUpdateModalOpen(false)}
        onAuthorUpdated={fetchAuthors}
      />
      <DeleteModal
        open={deleteModalOpen}
        author={selectedAuthor}
        onClose={() => setDeleteModalOpen(false)}
        onAuthorDeleted={fetchAuthors}
      />
    </DashboardLayout>
  );
};

export default Authors;