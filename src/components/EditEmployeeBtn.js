import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2)
  }
}));

export default function EditEmployeeBtn() {
  const classes = useStyles();

  return (
    <div className={classes.fab}>
      <Tooltip title="Edit Employee" placement="top">
        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/editemployee"
        >
          <EditIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
