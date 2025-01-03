import { Grid, Typography } from "@mui/material";
import DashboardLayout from "../../../layout";
import AuthService from "../../../services/auth.service";

const CustomerHome = () => {
  const userInfo = AuthService.getUserInfoCache();
  return (
    <DashboardLayout>
      <Grid container>
        <Typography> خوش اومدی {userInfo.firstName} {userInfo.lastName} عزیز</Typography>
      </Grid>
    </DashboardLayout>
  );
};

export default CustomerHome;
