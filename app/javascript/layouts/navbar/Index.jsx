import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import StoreIcon from "@mui/icons-material/Store";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function Navbar() {
  const my_pages = ["Solutions", "Products", "Pricing"];
  const my_settings = ["Profile", "Account", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenSettingsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <StoreIcon></StoreIcon>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontWeight: 200,
            fontFamily: "roboto",
            color: "white",
            letterSpacing: ".2rem",
            textDecoration: "none",
          }}
        >
          Educative
        </Typography>
        {/* <Box sx={{ flexWrap: "wrap", flexGrow: 1, display: "flex" }}>
          {my_pages.map((page) => (
            <Button
              key={my_pages}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box> */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open my_settings">
            <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "55px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseSettingsMenu}
          >
            {my_settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseSettingsMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
