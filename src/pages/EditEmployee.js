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

export default function EditEmployee(props) {
  //const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [car, setCar] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [license, setLicense] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const classes = useStyles();

  let history = useHistory();

  useEffect(() => {
    if (
      props.location.user === undefined ||
      props.location.employee === undefined
    ) {
      //props.history.push("/");
      history.push("/");
    }

    if (props.location.employee !== undefined) {
      // Current user
      //setUser(props.location.employee.user); // props.location.user.email

      // Employee info
      setName(props.location.employee.name);
      setPhone(props.location.employee.phone);
      setEmail(props.location.employee.email);
      setDepartment(props.location.employee.department);
      setCar(props.location.employee.car);
      setModel(props.location.employee.model);
      setColor(props.location.employee.color);
      setLicense(props.location.employee.license);

      //console.log("user: ", props.location.user);
      //console.log("employee: ", props.location.employee.name);
    }

    // eslint-disable-next-line
  }, []);

  function submitBtn() {
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
      return;
    }

    var dbRef = firebase
      .firestore()
      .collection(props.location.user)
      .doc(props.location.employee.email);

    // update info
    return dbRef
      .update({
        name: name,
        phone: phone,
        department: department,
        car: car,
        model: model,
        color: color,
        license: license
      })
      .then(function() {
        //console.log("Document successfully updated!");
        setSnackbarMessage("Employee information upated");
        snackbarHandleClick();
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        //console.error("Error updating document: ", error);
        setSnackbarMessage(`${error.code}: ${error.message}`);
        snackbarHandleClick();
      });
  }

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
        Edit Employee
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
            onClick={submitBtn}
          >
            Save
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
