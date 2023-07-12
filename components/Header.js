import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/assets/brand/cex-logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import WalletConnect from "./WalletConnect";

const pages = ["Tokenize Claim", "View Metadata", "View Evidence", "Request Loan", "Earn Yield"];

const Header = (props) => {
  const { background, className, children } = props;
  const [isDropdown, setIsDropdown] = useState(false);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDropdownMenu = () => {
    setIsDropdown((preValue) => !preValue);
  };

  return (
    <AppBar position="fixed" sx={{zIndex: 50}} className={`${background} ${className} h-auto`}>
      <Container>
        <Toolbar disableGutters>
          <Box className="w-1/2 lg:w-1/6" >
            <Link className="relative block h-[40px] aspect-[2.63] cursor-pointer" href={"/"}>
              <Image src={Logo} alt="CEX.Claims" />
            </Link>
          </Box>

          <Box className="justify-start grow w-2/3 xl:w-1/2 hidden lg:flex gap-4">
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <WalletConnect />
              </Button>
          </Box>
          <Box className="w-1/2 lg:w-1/6 flex items-center justify-end">
          {/*
            <Box className="w-[36px] h-[36px] relative cursor-pointer">
              <NotificationsIcon fontSize="large"/>
            </Box>
          */}
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                className="ml-2 p-0"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
          </Box>
        </Toolbar>
        {children}
      </Container>
    </AppBar>
  );
};

export default Header;
