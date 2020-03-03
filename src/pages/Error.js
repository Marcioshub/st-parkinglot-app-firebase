import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center"
  },
  title: {
    fontSize: "10rem"
  }
});

export default function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <br />
      <Typography
        variant="h1"
        component="h2"
        gutterBottom
        className={classes.title}
      >
        404
      </Typography>
      <Typography variant="h2" gutterBottom>
        Sorry, this url doesn't exist
      </Typography>
      <Button variant="outlined" color="primary" component={Link} to="/">
        Go Back Home
      </Button>
    </div>
  );
}
