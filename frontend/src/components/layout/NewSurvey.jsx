import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import UserContext from "../../context/userContext";
import Button from "@material-ui/core/Button";
import Footer from "../layout/Footer";
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
const useStyles = makeStyles((theme) => ({
  box:{
    margin:theme.spacing(1),
  },
  button:{
    margin:theme.spacing(1),
  },

 
}));

function NewSurvey() {
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [ansnum, setAnsnum] = useState("");
  const [title,setTitle]=useState("");
  const [question, setQuestion] = useState("");
  const [questionlist, setQuestionlist] = useState([]);
  const [anslist, setAnslist] = useState([]);
  const history = useHistory();
  const [error, setError] = useState();

  useEffect(() => {
    if (!userData.user) {
      history.push("/");
    }
  });
  useEffect(() => {
    console.log(questionlist);
  }, [questionlist]);
  useEffect(() => {
    console.log(anslist);
  }, [anslist]);
  const handleChange = (event) => {
    console.log(event.target.value);
    setAnsnum(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const setAnswers = (answers) => {
    console.log(answers);
    let questions=[...questionlist];
    for(let i=0;i<questions.length;i++)
    {
      if(questions[i].questiontext==answers.questiontext)
      {
        console.log(answers.answers)
        questions[i].answers=answers.answers;
      }
    }
    setQuestionlist(questions);
  };
  const handleSumbit=async(e)=>{
    e.preventDefault();
    try{
      const QuestionsandAnswers={user:userData.user,title:title,questions:questionlist};
      console.log(QuestionsandAnswers);
      const CreateResponse=await axios.post("/forms/createform",QuestionsandAnswers);
      console.log(CreateResponse.data);
      history.push({pathname:"/finishsurvey",state:{props:CreateResponse.data}});
    }catch(err)
    {
      err.response.data.msg && setError(err.response.data.msg)
    }

  }
  const handleCloseCancel = () => {
    console.log("cancel");
    setOpen(false);
  };
  const handleCloseConfirm = () => {
    console.log(question);
    console.log(ansnum);
    setQuestionlist((questionlist) => [
      ...questionlist,
      { questiontext: question, answernumber: ansnum,answers:[]},
    ]);
    console.log(questionlist);
    setOpen(false);
    return <AnswerBoxes number={ansnum} />;
  };

  return (
    <>
    <div className={classes.box}>
    <TextField
            autoFocus
            margin="dense"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            label="Write your survey title here"
            type="text"
            fullWidth
          />
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add question
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Question information</DialogTitle>
        <DialogContent>
          <DialogContentText>Question text:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            label="Write your question here"
            type="text"
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Number of answers
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={ansnum}
              onChange={handleChange}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
            <FormHelperText>
              Sets number of answers for this question
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <form style={{height:"100%"}} onSubmit={handleSumbit}>
        {(questionlist.length!=0) ? (
          questionlist.map((question, index) => {
            return (
              <div className={classes.box}><Typography variant="body2" component="h6">
                Question {index+1}:
            </Typography>
                <Typography variant="body2" component="p">
                  {question.questiontext}
                </Typography>
                <Typography variant="body2" component="h6">
                Answers for question {index+1}:
            </Typography>
                <AnswerBoxes
                  number={question.answernumber}
                  setAnswers={setAnswers}
                  questiontext={question.questiontext}
                />
              </div>
            );
          }
          
        )) : (
          <div style={{height:"560px"}}>Add questions</div>
        )}
        {(questionlist.length!=0)?(
          <Button className={classes.button} type="submit"  variant="contained" color="primary">
           Submit Survey 
          </Button>):(<div></div>)}
      </form>
    
    </div>
    <Footer />
    </>
  );
}

export default NewSurvey;
