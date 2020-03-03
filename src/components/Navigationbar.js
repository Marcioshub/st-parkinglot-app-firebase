import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavigationBar() {
  const classes = useStyles();
  const [person, setPerson] = useState(null);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage
      setPerson(user.email);
    } else {
      // No user is signed in.
    }
  });

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        setPerson(null);
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            ST Parking Lot
          </Typography>
          {person === null ? (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </Fragment>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              onClick={() => logout()}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

/**
 * 
 * add this when in smaller screen sizes with login and register
 * 
 * <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
 */
