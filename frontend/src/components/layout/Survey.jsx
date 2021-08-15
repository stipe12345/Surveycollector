import axios from 'axios';
import React, { useState, useEffect,useRef } from 'react';
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
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button:{
      
      margin:theme.spacing(2),
    },
  
  }));
const Survey = () => {
    const classes = useStyles();
    const [error, setError] = useState();
    const [survey,setSurvey]=useState();
    const [finishedsurvey,setFinishedSurvey]=useState();
    const [value,setValue]=useState();
    const { id } = useParams();
    const history = useHistory();
    const initialRender = useRef(true);
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
    const PrepareArray= (data)=>{
    var erasedAns=data;
        erasedAns.Questions.map((el)=>{
            el.Answers=[]
        })
        setFinishedSurvey(erasedAns);
    }
    useEffect(()=>{
        console.log("survey before if")
        if(initialRender.current)
        {console.log("true")
        initialRender.current=false;
        }
        else
        {console.log("false");
        var clone=JSON.parse(JSON.stringify(survey))
        console.log(clone)
        PrepareArray(clone);
    }          
    },[survey])
    useEffect(() => {
        Fetch();
    }, []);
    useEffect(()=>{
        console.log("finished")
        console.log(finishedsurvey);
    },[finishedsurvey]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            
            const SubmitForm=await axios.post("/forms/submitform",{Survey:finishedsurvey});
            history.push("/completed");
            
        }catch(err)
        {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }
    const handleChange= (e)=>{
        console.log("finished survey")
        console.log(finishedsurvey);
        console.log(e.target.name);
        console.log(e.target.value);
        var finished=finishedsurvey;
        console.log(finished);
        console.log(finished.Questions[e.target.name]);
        finished.Questions[e.target.name].Answers=[e.target.value]
        setFinishedSurvey(finished);

    }
    return survey?(
    <>
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
    <RadioGroup aria-label="answers" name={index}  value={value} onChange={handleChange}>
        {question.Answers.map((answer)=>{
            return <FormControlLabel value={answer} control={<Radio />} label={answer} />
        })}
  </RadioGroup>
</FormControl>):(<></>)}
        </div>
    )
})}
<Button className={classes.button} type="submit"  variant="contained" color="primary">
           Submit Survey 
          </Button>
    </form>
    </>):(<>Loading...</>)
}
 
export default Survey;