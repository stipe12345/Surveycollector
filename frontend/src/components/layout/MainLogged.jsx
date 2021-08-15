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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { NativeSelect } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import EnhancedTable from './Table';
import { useHistory } from "react-router-dom";
import axios from 'axios';
const useStyles = makeStyles({
    root: {
      minWidth: 100,
      minHeight:593,
    },
    box:
    {
      minWidth:250,
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
    const [surveytitles,setSurveyTitles]=useState();
    const {userData} = useContext(UserContext);
    const fetchTitles=async()=>{
      const Titles=await axios.post("/forms/fetchtitles",{UserID:userData.user});
      console.log(Titles.data);
      setSurveyTitles(Titles.data);
    }
    useEffect(()=>{
      fetchTitles();
    },[])
    useEffect(()=>{
    },[surveytitles]);
    const newsurvey=()=>{history.push("/newsurvey");}
    const handlechange= async (e)=>{
      console.log(e.target.selectedOptions[0].text);
      console.log(e.target.value)
      const Survey=await axios.post("/forms/fetchsurvey",{FormID:e.target.value});
      console.log(Survey)
    }
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
      <FormControl className={classes.box}>
        <InputLabel >Choose existing survey</InputLabel>
        <NativeSelect
          onChange={handlechange}
        >
          <option aria-label="None" value="" />
          {surveytitles?(surveytitles.map((title,index)=>{
            return (
              <option value={title._id}>{title.FormTitle}</option>
            )
          })):(
          <></>)}
          
        </NativeSelect>
        <FormHelperText>See answers on existing survey</FormHelperText>
      </FormControl>
    </CardActions>
  </Card>
  
  </>
)
}
export default LoggedHome;