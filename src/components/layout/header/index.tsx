import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CgMenuLeft } from "react-icons/cg";
import Logo from "../../../assets/images/logo.png";
import AvatarMenu from "./avatarMenu";
import styles from "./header.module.scss";

interface HeaderPropsType {
  sidebarItems: any;
  location: { pathname: string };
  expanded: boolean;
  isExpanded: any;
}

const Header: React.FC<HeaderPropsType> = ({
  sidebarItems,
  location,
  expanded,
  isExpanded,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className={styles.header_wrapper}>
      {isMobile && (
        <IconButton
          onClick={() => isExpanded(!expanded)}
          style={{
            background: theme.palette.common.white,
            color: theme.palette.common.black,
          }}
        >
          <CgMenuLeft size={19} />
        </IconButton>
      )}
      <Box>
        {!isMobile && (
          <Link to="/">
            <img src={Logo} alt="Logo" height={23} />
          </Link>
        )}
        <Typography variant="caption" component="h6">
          |{" "}
          {
            sidebarItems.find((item: any) => item.link === location.pathname)
              .title
          }
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" component="h6">
          خوش آمدی Admin
        </Typography>
        <AvatarMenu />
      </Box>
    </Box>
  );
};

export default Header;
