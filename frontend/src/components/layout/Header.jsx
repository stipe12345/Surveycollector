import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import transitions from "@material-ui/core/styles/transitions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 flexspace:{
     justifyContent:"space-between",
 },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize:theme.spacing(3),
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
          <Button color="inherit" className={classes.title}  onClick={home}>
           SurveyCollector
          </Button>
          <div>
            {userData.user ? (
              <Button color="inherit"   onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={register}>
                  Sign Up
                </Button>
                <Button color="inherit" onClick={login}>
                  Login
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
