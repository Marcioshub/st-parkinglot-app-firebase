import React, { useState } from "react";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

import { useHistory } from "react-router";

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

import { Link } from "react-router-dom";

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

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const classes = useStyles();

  let history = useHistory();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage
      //props.history.push("/");
      history.push("/");
    } else {
      // No user is signed in.
    }
  });

  function registerBtn() {
    if (email === "" || password === "" || confirmPassword === "") {
      setSnackbarMessage("Please fill in all fields");
      snackbarHandleClick();
      return;
    }

    if (password !== confirmPassword) {
      //console.log("Passwords do not match");
      setSnackbarMessage("Passwords do not match");
      snackbarHandleClick();
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          props.history.push("/");
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
              Register
            </Typography>

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
              <TextField
                id="confirmpassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
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
            <Button size="large" onClick={() => registerBtn()}>
              Submit
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
