import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="inherit" align="center">
      {"Copyright © "}
      SurveyCollector
      {" " + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  flexspace: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: theme.spacing(3),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.flexspace}>{Copyright()}</Toolbar>
      </AppBar>
    </div>
  );
}
