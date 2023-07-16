'use client';
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, createTheme } from "@mui/material";
import { useRef, useState } from "react";
import Image from "next/image";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import ConnectWallet from "./web3/ConnectWallet";
import { useRouter } from "next/navigation";

const GNB = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null);

  const goHome = () => {
    router.push('/')
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };  
  
  return (
    <Box>
        <AppBar sx={{ backgroundColor: '#000' }}>
          <Toolbar>
            <Box display='flex' alignItems='center' flexGrow={1} onClick={() => goHome()} sx={{ cursor: 'pointer' }}>
              <Box mr='5px'><Image src="/logo.png" alt="logo" width={100} height={70} /></Box>
              <h4>Exchange App</h4>
            </Box>

            <Box display='flex'>
              <ConnectWallet />

              <IconButton onClick={handleMenu} color="inherit" ref={anchorRef}>
                <AccountCircle />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: 'left top',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          </Toolbar>
        </AppBar>
    </Box>
  )

}

export default GNB;