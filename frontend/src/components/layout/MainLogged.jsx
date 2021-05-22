import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/userContext';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EnhancedTable from './Table';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
    root: {
      minWidth: 100,
      
    },
    surveybutton:{
        backgroundColor:"#3f51b5",
        color:"white",
        borderRadius:0,
        "&:hover":{
            color:"black",
        }
    },
    divroot:{
      overflow:"hidden",
    },
    media: {
        height: 500,
      },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
 const LoggedHome= (props)=>{
    const classes = useStyles();
    const history = useHistory();
    const {userData} = useContext(UserContext);
    const newsurvey=()=>{history.push("/newsurvey");}
return(
    <>
    <Card className={classes.root}>
    <CardContent>
      <Typography variant="h5" component="h2">
       Welcome {" "+userData.user.displayName}!
      </Typography>
      <Typography variant="body2" component="p">
        You can create new surveys or see the surveys you already completed.
      </Typography>
    </CardContent>
    <CardActions>
      <Button className={classes.surveybutton} variant="outlined" onClick={newsurvey} >
        + Add new survey
      </Button> 
    </CardActions>
  </Card>
  <EnhancedTable/>
  </>
)
}
export default LoggedHome;