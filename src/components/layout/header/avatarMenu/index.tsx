import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import AuthService from "../../../../services/auth.service";
import { UserRole } from "../../../../services/Models/UserModels";

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    AuthService.logout();
    window.location.href = AuthService.getUserInfoCache().role === UserRole.customer ? '/customer/login' : '/admin/login';
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="avatar-button"
        aria-controls={open ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: 0, marginRight: "10px" }}
      >
        <HiAdjustmentsHorizontal />
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "avatar-button",
        }}
      >
        <MenuItem onClick={handleLogout}>
          <Typography variant="body2" pl={4} align="right">
            خــروج
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
