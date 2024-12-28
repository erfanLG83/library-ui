import { Grid, useMediaQuery, useTheme } from "@mui/material";
import DashboardLayout from "../../layout";
import LatestBooks from "../../components/homePage/latestBooks";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <DashboardLayout>
      <Grid container>
        <LatestBooks />
      </Grid>
    </DashboardLayout>
  );
};

export default Home;
