import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const Radio = (props) => {
    const [Noofans,setNoofans]=useState(props.number);
    const[Anslist,setAnslist]=useState();
    const[ans,setans]=useState([]);
    useEffect(()=>{
    })
    
   const getanswerboxes=()=> {
        let i = 0;
        let answer = [];
        while (i < Noofans) {
          i++;
          //setans(...ans,'');
          answer.push(<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={"answer"+(i)}
            label={"answer"+(i)}
            name={"answer"+(i)}
            onChange={e => /*setans(...ans,e.target.value)*/console.log(e.target.value)}
          />
          );
        }
        setAnslist(answer);
      }
      
    return (
       <>{
        Anslist?(Anslist.map((answerlist)=>{
          
      return <div>{answerlist}</div>;
    })):(getanswerboxes())}</> );
}
 
export default Radio;