import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerbuttons: {
    display: "flex",
    flexDirection: "row",
  },
  flexspace: {
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: theme.spacing(3),
  },
}));

export default function Header() {
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const home = () => history.push("/");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.flexspace}>
          <Button color="inherit" className={classes.title} onClick={home}>
            SurveyCollector
          </Button>
          <div>
            {userData.user ? (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            ) : (
              <div className={classes.headerbuttons}>
                <Button color="inherit" onClick={register}>
                  Sign Up
                </Button>
                <Button color="inherit" onClick={login}>
                  Login
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
