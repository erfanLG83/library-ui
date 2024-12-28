import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import DashboardLayout from "../../layout";

const Products = () => {
  const theme = useTheme();

  const headers = [
    "#",
    "عنوان",
    "عملیات ها"
  ];

  const items = [
    {
      id: '1',
      title: "تست 1",
    },
    {
      id: '2',
      title: " ماسک خاک رس ",
    },
  ];

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
            {items.map((category , i) => (
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
                    {i+1}
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
                  <Button>
                    ویرایش
                  </Button>
                  <Button>
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
};

export default Products;
