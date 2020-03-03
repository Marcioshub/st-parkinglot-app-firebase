import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// router
import { Link } from "react-router-dom";
//import { useHistory } from "react-router";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    "& .MuiCardActions-root": {
      display: "block"
    }
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
    marginBottom: 12,
    marginLeft: 5
  }
});

export default function EmployeeCard(props) {
  const classes = useStyles();

  //let history = useHistory();

  const {
    name,
    email,
    phone,
    department,
    car,
    model,
    color,
    license
  } = props.employee;

  function deleteEmployee() {
    firebase
      .firestore()
      .collection(props.user)
      .doc(email)
      .delete()
      .then(function() {
        //console.log("Document successfully deleted!");
        setSnackbarMessage("Employee deleted");
        snackbarHandleClick();
        //syncToDatabase(currentUser);
        props.update(props.user);
        props.collapse(null);
      })
      .catch(function(error) {
        //console.error("Error removing document: ", error);
        setSnackbarMessage(`${error.code}: ${error.message}`);
        snackbarHandleClick();
      });
  }

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

  return (
    <Fragment>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h2" component="h2" gutterBottom>
            {name}
          </Typography>

          <div style={{ display: "inline-flex" }}>
            <EmailIcon />
            <Typography className={classes.pos} color="textSecondary">
              {email}
            </Typography>
          </div>
          <br />

          <div style={{ display: "inline-flex" }}>
            <PhoneIcon />
            <Typography className={classes.pos} color="textSecondary">
              {phone}
            </Typography>
          </div>
          <br />

          <div style={{ display: "inline-flex" }}>
            <BusinessIcon />
            <Typography className={classes.pos} color="textSecondary">
              {department}
            </Typography>
          </div>
          <br />

          <div style={{ display: "inline-flex" }}>
            <DriveEtaIcon />
            <Typography className={classes.pos} color="textSecondary">
              {car}
            </Typography>
          </div>
          <br />

          <Typography variant="body2" component="p">
            {model}
          </Typography>
          <Typography variant="body2" component="p">
            {color}
          </Typography>
          <Typography variant="body2" component="p">
            {license}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            component={Link}
            to={{
              pathname: "/editemployee",
              user: props.user,
              employee: props.employee
            }}
          >
            Edit
          </Button>
          <Button size="large" onClick={deleteEmployee}>
            Delete
          </Button>
        </CardActions>
      </Card>
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
