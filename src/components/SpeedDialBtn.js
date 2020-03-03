import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import InfoIcon from "@material-ui/icons/Info";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    transform: "translateZ(0px)"
  },
  exampleWrapper: {
    position: "relative",
    marginTop: theme.spacing(3)
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: 0,
      right: 0
    },
    margin: theme.spacing(3)
  }
}));

const actions = [
  { icon: <InfoIcon />, name: "About", operation: "about" },
  { icon: <PersonAddIcon />, name: "Add Employee", operation: "add" }
];

export default function SpeedDialBtn() {
  let history = useHistory();
  const classes = useStyles();
  //const [direction, setDirection] = React.useState("left");
  const [open, setOpen] = React.useState(false);
  //const [hidden, setHidden] = React.useState(false);

  const handleClose = (e, operation) => {
    setOpen(false);
    console.log(operation);
    switch (operation) {
      case "add":
        history.push("/addemployee");
        break;
      case "about":
        history.push("/about");
        break;
      default:
        break;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        hidden={false}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="left"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={e => handleClose(e, action.operation)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
