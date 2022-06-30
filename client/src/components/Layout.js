import React from "react";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
//redux and responsive buttons if logged in
import { connect } from "react-redux";
import { logout } from "../actions/auth";
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
  };
});

const Layout = ({ children, auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  //auth links if logged in or not

  const logoutAndRedirect = () => {
    logout();
    history.push("/login");
  }

  const authLinks = (
    <>
      <Button variant='outlined' path='/favorites'>
        Favorites
      </Button>
      <Button variant='outlined' onClick={logoutAndRedirect}>
        Logout
      </Button>
    </>
  );

  const guestLinks = (
    <Button variant='outlined' onClick={() => history.push('/login')}>
      Login
    </Button>
  );

  const menuItems = [
    {
      text: "Inform",
      icon: <AddCircleOutlineOutlined color='ssuccess' />,
      path: "/inform",
    },
    {
      text: "Connect",
      icon: <AddCircleOutlineOutlined color='ssuccess' />,
      path: "/connect",
    },
    {
      text: "Reduce",
      icon: <AddCircleOutlineOutlined color='ssuccess' />,
      path: "/reduce",
    },
    {
      text: "Tech",
      icon: <AddCircleOutlineOutlined color='ssuccess' />,
      path: "/tech",
    },
    {
      text: "Rescue",
      icon: <AddCircleOutlineOutlined color='success' />,
      path: "/rescue",
    },
    {
      text: "Collab",
      icon: <AddCircleOutlineOutlined color='ssuccess' />,
      path: "/collab",
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position='fixed'
        className={classes.appBar}
        elevation={0}
        color='primary'
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
          <Avatar className={classes.avatar} src='' />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{ paper: classes.drawerPaper }}
        anchor='left'
      >
        <div>
          <Typography variant='h5' className={classes.title}>
            bcnMinimalista
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { logout })(Layout);
