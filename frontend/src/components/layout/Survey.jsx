import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { Typography } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));
const Survey = () => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [survey, setSurvey] = useState();
  const [finishedsurvey, setFinishedSurvey] = useState();
  const [value, setValue] = useState();
  const { id } = useParams();
  const history = useHistory();
  const initialRender = useRef(true);

  const PrepareArray = (data) => {
    var erasedAns = data;
    erasedAns.Questions.map((el) => {
      el.Answers = [];
      return 0;
    });
    setFinishedSurvey(erasedAns);
  };
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      var clone = JSON.parse(JSON.stringify(survey));

      PrepareArray(clone);
    }
  }, [survey]);
  useEffect(() => {
    const Fetch = async () => {
      try {
        const FetchForm = await axios.post("/forms/getform", { FormID: id });
        setSurvey(FetchForm.data);
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };
    Fetch();
  }, []);
  useEffect(() => {}, [finishedsurvey]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/forms/submitform", { Survey: finishedsurvey });
      history.push("/completed");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  const handleChange = (e) => {
    var finished = finishedsurvey;
    finished.Questions[e.target.name].Answers = [e.target.value];
    setFinishedSurvey(finished);
  };
  return survey ? (
    <>
      <form style={{ height: "100%" }} onSubmit={handleSubmit}>
        <Typography
          style={{ textAlign: "center" }}
          variant="header"
          component="h2"
        >
          {survey.Title}
        </Typography>
        {survey.Questions.map((question, index) => {
          return (
            <div>
              <Typography variant="body2" component="h6">
                Question {index + 1}:
              </Typography>
              <Typography variant="body2" component="p">
                {question.QuestionText}
              </Typography>
              {question.QuestionType === "radio" ? (
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="answers"
                    name={index}
                    value={value}
                    onChange={handleChange}
                  >
                    {question.Answers.map((answer) => {
                      return (
                        <FormControlLabel
                          value={answer}
                          control={<Radio />}
                          label={answer}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit Survey
        </Button>
      </form>
    </>
  ) : (
    <>Loading...</>
  );
};

export default Survey;
