import { Grid } from "@mui/material";
import DashboardLayout from "../../../layout";
import LatestBooks from "../../../components/homePage/latestBooks";

const AdminHome = () => {

  return (
    <DashboardLayout>
      <Grid container>
        <LatestBooks />
      </Grid>
    </DashboardLayout>
  );
};

export default AdminHome;
