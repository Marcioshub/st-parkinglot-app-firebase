import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function AddEmployeeBtn() {
  const classes = useStyles();

  return (
    <div className={classes.fab}>
      <Tooltip title="Add Employee" placement="top">
        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/addemployee"
        >
          <PersonAddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
