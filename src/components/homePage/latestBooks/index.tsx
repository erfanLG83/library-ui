import { Grid, Box, useTheme, Typography, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import Title from "../../title";
import { useEffect, useState } from "react";
import moment from 'jalali-moment'
import { BookModel } from "../../../services/Models/BookModels";
import BooksService from "../../../services/books.service";

const LatestBooks = () => {
  const theme = useTheme();

  const headers = [
    { id: "row", title: "#" },
    { id: "date", title: "تاریــخ" },
    { id: "title", title: "عنوان" },
    { id: "category", title: "دسته بندی"},
    { id: "author", title: "نویسنده"},
  ];

  const [items,setItems] = useState<BookModel[]>([]);

  useEffect(()=>{
    BooksService.getLatestBooks().then(response => {
      if(response.success === false){
        alert('خطا ! \n'+ response.errors[0].message);
        return;
      }

      setItems(response.data!.items);
    });
  },[]);

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
                  <TableCell align={'center'}>{moment(item.createdAt,'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</TableCell>
                  <TableCell align={'center'}>{item.title}</TableCell>
                  <TableCell align={'center'}>{item.author.firstName} {item.author.lastName}</TableCell>
                  <TableCell align={'center'}>{item.category.title}</TableCell>
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
