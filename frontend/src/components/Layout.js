import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Header from './Header'
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@material-ui/core";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
//redux and responsive buttons if logged in
import {useDispatch, useSelector} from 'react-redux'
import { logout } from "../actions/userActions";
import PropTypes from "prop-types";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
    test: {
      color: "white",
      width: "100%",
    },
    testAppBar: {
      backgroundColor: "green",
    },
  };
});

function Layout2({ children }, props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const {loading, isAuthenticated} = user;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link) => {
    setAnchorEl(null);
    navigate(`/${link}`);
  };

  const logoutAndRedirect = () => {
    setAnchorEl(null);
    logout();
    navigate("/");
  }

  const menuItems = [
    {
      text: "Inform",
      icon: <AddCircleOutlineOutlined color='success' />,
      path: "/",
    },
    {
      text: "Connect",
      icon: <AddCircleOutlineOutlined color='success' />,
      path: "/connect",
    },
    // {
    //   text: "Reduce",
    //   icon: <AddCircleOutlineOutlined color='ssuccess' />,
    //   path: "/reduce",
    // },
    {
      text: "Tech",
      icon: <AddCircleOutlineOutlined color='success' />,
      path: "/tech",
    },
    {
      text: "Rescue",
      icon: <AddCircleOutlineOutlined color='success' />,
      path: "/rescue",
    },
    {
      text: "Collab",
      icon: <AddCircleOutlineOutlined color='success' />,
      path: "/collab",
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        bcnMinimalista
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {!loading && isAuthenticated ? (
          <>
            <ListItem onClick={() => navigate("/favorites")}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary='Favorites' />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={() => logoutAndRedirect()}>
              {" "}
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onClick={() => navigate("/login")}>
              {" "}
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary='Login' />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate("/register")}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary='Register' />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav' style={{marginBottom:250}}>
        <Header/>
        <Toolbar className={classes.testAppBar}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ display: { xs: "none", sm: "flex" } }}
            className={classes.test}
          >
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                onClick={() => navigate(item.path)}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}

            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!loading && isAuthenticated ? (
                <>
                  <MenuItem onClick={() => handleClose("favorites")}>
                    Favorites
                  </MenuItem>
                  <MenuItem onClick={() => logoutAndRedirect()}>
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => handleClose("login")}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => handleClose("register")}>
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
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
      <Box component='main' sx={{ p: 3, mt: '140px', width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}

Layout2.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default Layout2
