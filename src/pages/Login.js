import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  formRoot: {
    "& > *": {
      margin: 5,
      minWidth: "75%"
    }
  }
});

export default function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const snackbarHandleClick = () => {
    setSnackbarOpen(true);
  };

  const snackbarHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage
      //props.history.push("/");
      history.push("/");
    } else {
      // No user is signed in.
    }
  });

  function loginBtn() {
    if (email === "" || password === "") {
      setSnackbarMessage("Please fill in all fields");
      snackbarHandleClick();
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          //props.history.push("/");
          //console.log("valid login");
          history.push({
            pathname: "/",
            user: email
          });
        })
        .catch(function(error) {
          setSnackbarMessage(`${error.code}: ${error.message}`);
          snackbarHandleClick();
        });
    }
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <CssBaseline />
      <Container maxWidth="sm">
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography variant="h2" component="h2" gutterBottom>
              Login
            </Typography>
            <br />
            <form className={classes.formRoot} noValidate autoComplete="off">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                onChange={e => setEmail(e.target.value)}
              />
              <br />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
              <Typography
                color="secondary"
                variant="overline"
                display="block"
                gutterBottom
                component={Link}
                to="/passwordreset"
                style={{ textDecoration: "none" }}
              >
                Password Reset
              </Typography>
            </form>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Button size="large" onClick={() => loginBtn()}>
              Enter
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={snackbarHandleClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={snackbarHandleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
