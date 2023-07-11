'use client';
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { useState } from "react";

const GNB = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Box flexGrow={1}><h4>Exchange App</h4></Box>

          <Box>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )

}

export default GNB;