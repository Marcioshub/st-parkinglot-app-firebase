import React, { useEffect } from "react";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useHistory } from "react-router";

import SearchBox from "../components/SearchBox";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function Home() {
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    //console.log("useEffect called...");

    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // if User is signed in stay
      } else {
        // No user is signed in redirect to login
        history.push("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ justifyContent: "center", textAlign: "center" }}>
      <br />
      <br />
      <br />
      <CssBaseline />
      <Container maxWidth="lg">
        <SearchBox />
      </Container>
      <div className={classes.fab}>
        <Fab
          color="primary"
          aria-label="info"
          onClick={() => history.push("/about")}
        >
          <InfoIcon />
        </Fab>
      </div>
    </div>
  );
}
