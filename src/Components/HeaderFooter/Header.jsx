import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Badge, createTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../images/logo.png";
import { useGlobalCartContext } from "../../Contexts/CartContext";
import Login from "../Authentication/Login";
import { useGlobalUserContext } from "../../Contexts/UserContext";

const changeTheme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const LoginButton = styled(NavLink)`
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 5px;
  background: #fff;
  margin: 0 16px;
  color: #102030;
  transition: all 0.3s;
  text-transform: uppercase;
  font-size: 15px;

  &:hover {
    background: #d4adfc;
  }
`;

const Navbar = styled(AppBar)`
  padding: 2px 20px;
`;

const MobileButtons = styled(ListItemText)`
  text-transform: capitalize;
  color: #102030;
`;

const NavbarLinks = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  margin: 0 5px;
  position: relative;

  &::before {
    content: "";
    width: 0;
    position: absolute;
    margin: auto;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8px;
    transition: all 0.4s;
    height: 2px;
    background: #fff;
  }

  &:hover {
    color: #fff;
  }

  &:hover::before {
    width: 100%;
  }
`;

const drawerWidth = 240;
const navItems = ["home", "about", "contact", "products"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { cart } = useGlobalCartContext();
  const { user } = useGlobalUserContext();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={logo} alt="logo" width="40" style={{ borderRadius: "2px" }} />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <NavLink to={item} style={{ textDecoration: "none" }}>
                <MobileButtons primary={item} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <CssBaseline />
      <ThemeProvider theme={changeTheme}>
        <Navbar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img
                src={logo}
                alt="logo"
                width="40"
                style={{ borderRadius: "2px" }}
              />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  <NavbarLinks to={item !== "home" ? item : "/"}>
                    {item}
                  </NavbarLinks>
                </Button>
              ))}
            </Box>
            {!user ? (
              <LoginButton to="login" variant="contained">
                Login
              </LoginButton>
            ) : (
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-info"
                  style={{
                    background: "#9376E0",
                    border: 0,
                    color: "#3B3486",
                    fontWeight: "bold",
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.image}
                    className="me-2"
                    style={{
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  {user.name}
                </button>
                <button
                  type="button"
                  className="btn btn-danger dropdown-toggle dropdown-toggle-split me-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "#9376E0", border: 0, color: "#191919" }}
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item fw-bold" to="updateProfile">
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <Typography
                      className="dropdown-item fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        localStorage.removeItem("e-comm-user");
                        navigate("login");
                      }}
                    >
                      Logout
                    </Typography>
                  </li>
                </ul>
              </div>
            )}
            <Badge badgeContent={cart.length} color="success">
              <Link to="cart" style={{ color: "#fff" }}>
                <ShoppingCartIcon />
              </Link>
            </Badge>
          </Toolbar>
        </Navbar>
      </ThemeProvider>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
