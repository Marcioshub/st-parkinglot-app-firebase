import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

export default function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        About this app
      </Typography>

      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="body1" gutterBottom>
            This web app was created by Marcio Castillo to provide a easy way to
            log the employee parking lot at Southern Telecom.
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}
