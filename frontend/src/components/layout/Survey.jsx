import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AnswerBoxes from "../questions/Answerboxes";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
const useStyles = makeStyles((theme) => ({
    box:{
      margin:theme.spacing(1),
    },
    button:{
        alignSelf:"center",
        alignItems:"center",
        textAlign:"center",
      margin:theme.spacing(1),
    },
  
   
  }));
const Survey = () => {
    const [error, setError] = useState();
    const [survey,setSurvey]=useState();
    const [value,setValue]=useState();
    const { id } = useParams();
    const Fetch=async ()=>{
        try{
            
            const FetchForm=await axios.post("/forms/getform",{FormID:id});
            console.log(FetchForm.data);
            setSurvey(FetchForm.data);
        }catch(err)
        {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }
    useEffect(() => {
        Fetch();
    }, []);
    const handleSubmit=async(e)=>{
        e.preventDefault();
    }
    return survey?(<>
    <form style={{height:"100%"}} onSubmit={handleSubmit}>
<Typography style={{textAlign:"center"}}variant="header" component="h2">
    {survey.Title}
</Typography>
{survey.Questions.map((question,index)=>{
    return (
        <div>
            <Typography variant="body2" component="h6">
                Question {index+1}:
            </Typography>
            <Typography variant="body2" component="p">
                  {question.QuestionText}
            </Typography>
            {question.QuestionType=="radio"?(
            <FormControl component="fieldset">
    <RadioGroup aria-label="answers" name={"answers"+(index+1)} value={value} onChange={(e)=>{setValue(e.target.value)}}>
        {question.Answers.map((answer)=>{
            return <FormControlLabel value={answer} control={<Radio />} label={answer} />
        })}
  </RadioGroup>
</FormControl>):(<></>)}
        </div>
    )
})}
<Button  type="submit" textAlign="center" variant="contained" color="primary">
           Submit Survey 
          </Button>
    </form>
    </>):(<>Loading...</>)
}
 
export default Survey;