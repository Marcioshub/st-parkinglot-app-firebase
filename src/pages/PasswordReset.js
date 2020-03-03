import React, { useState, useEffect, Fragment } from "react";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

import { useHistory } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

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

export default function PasswordReset(props) {
  const [email, setEmail] = useState("");
  const classes = useStyles();
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

  useEffect(() => {
    if (firebase.auth().currentUser !== null) {
      //props.history.push("/");
      history.push("/");
    }

    // eslint-disable-next-line
  }, []);

  function resetPasswd() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        //console.log("Reset email has been sent");
        setSnackbarMessage("Reset link has been sent");
        snackbarHandleClick();
      })
      .catch(function(error) {
        // An error happened.
        //console.log("Error in resetting email...");
        setSnackbarMessage(`${error.code}: ${error.message}`);
        snackbarHandleClick();
      });
  }

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <CssBaseline />
      <Container maxWidth="sm">
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Enter email to reset password
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
            </form>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Button size="large" onClick={resetPasswd}>
              Reset
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
    </Fragment>
  );
}
