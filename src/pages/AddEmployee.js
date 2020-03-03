import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300
    },
    textAlign: "center",
    marginTop: "20px"
  },
  button: {
    width: 200
  }
}));

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [car, setCar] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [license, setLicense] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState("");

  let history = useHistory();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      } else {
        // No user is signed in.
        history.push("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  function addEmployeeBtn() {
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      department === "" ||
      car === "" ||
      model === "" ||
      color === "" ||
      license === ""
    ) {
      //console.log("please fill in all fields...");

      setSnackbarMessage("Please fill in all fields...");
      snackbarHandleClick();
    } else {
      // Check if employee already on the database
      var docRef = firebase
        .firestore()
        .collection(firebase.auth().currentUser.email)
        .doc(email);

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            //console.log("Employee already exists", doc.data());

            setSnackbarMessage("Employee already exists");
            snackbarHandleClick();
          } else {
            // doc.data() will be undefined in this case
            //console.log("New Employee!");

            // Add a new document in collection "cities"
            firebase
              .firestore()
              .collection(firebase.auth().currentUser.email)
              .doc(email)
              .set({
                name: name,
                email: email,
                phone: phone,
                department: department,
                car: car,
                model: model,
                color: color,
                license: license
              })
              .then(function() {
                //console.log("Document successfully written!");

                clear();

                setSnackbarMessage("Employee successfully added");
                snackbarHandleClick();
              })
              .catch(function(error) {
                //console.error("Error writing document: ", error);

                setSnackbarMessage(`${error.code}: ${error.message}`);
                snackbarHandleClick();
              });
          }
        })
        .catch(function(error) {
          //console.log("Error getting document:", error);

          setSnackbarMessage(`${error.code}: ${error.message}`);
          snackbarHandleClick();
        });
    }
  }

  const classes = useStyles();

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

  const clear = () => {
    //console.log("clear fields");
    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setCar("");
    setModel("");
    setColor("");
    setLicense("");
  };

  return (
    <Fragment>
      <Typography
        variant="h2"
        gutterBottom
        style={{ textAlign: "center", marginTop: "15px" }}
      >
        Add Employee
      </Typography>
      <CssBaseline />
      <Container maxWidth="lg">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            id="department"
            label="Department"
            variant="outlined"
            value={department}
            onChange={e => setDepartment(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <TextField
            id="car"
            label="Car"
            variant="outlined"
            value={car}
            onChange={e => setCar(e.target.value)}
          />
          <TextField
            id="license"
            label="License"
            variant="outlined"
            value={license}
            onChange={e => setLicense(e.target.value)}
          />
          <TextField
            id="model"
            label="Model"
            variant="outlined"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
          <TextField
            id="color"
            label="Color"
            variant="outlined"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={addEmployeeBtn}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={clear}
          >
            Clear
          </Button>
        </form>
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
