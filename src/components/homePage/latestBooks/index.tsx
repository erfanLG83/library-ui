import { Grid, Box, useTheme, Typography, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import Title from "../../title";
const LatestBooks = () => {
  const theme = useTheme();

  const headers = [
    { id: "row", title: "#" },
    { id: "date", title: "تاریــخ" },
    { id: "title", title: "عنوان" },
    { id: "author", title: "نویسنده"},
  ];

  const items = [
    {
      date: "1398/03/15",
      title: 'تست کتاب',
      author: 'نویسنده نام'
    },
  ];

  return (
    <Grid item xs={12}>
      <Box
        className="default_card"
        sx={{ background: theme.palette.background.paper }}
      >
        <Title title="اخرین کتاب های اضافه شده" />

        <Table>
          <TableHead>
            <TableRow>
              { headers.map(header => {
                return (
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                    <Typography key={header.id} variant="body2" sx={{ fontWeight: "bold" }}>
                      {header.title}
                    </Typography>
                  </TableCell>
                )
              }) }
            </TableRow>
          </TableHead>
          <TableBody>
            { items.map((item,i) => {
              return (
                <TableRow>
                  <TableCell align={'center'}>{i+1}</TableCell>
                  <TableCell align={'center'}>{item.date}</TableCell>
                  <TableCell align={'center'}>{item.title}</TableCell>
                  <TableCell align={'center'}>{item.author}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Grid>
  );
};

export default LatestBooks;
