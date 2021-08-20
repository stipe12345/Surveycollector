import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { NativeSelect } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    minWidth: 100,
    minHeight: 593,
  },
  card: {
    minWidth: 100,
  },
  box: {
    minWidth: 250,
  },
  surveybutton: {
    backgroundColor: "#3f51b5",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      color: "black",
    },
  },
  divroot: {
    overflow: "hidden",
  },
  media: {
    height: 500,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textbox: {
    whiteSpace: "pre-wrap",
  },
});
const LoggedHome = () => {
  const classes = useStyles();
  const history = useHistory();
  const [surveytitles, setSurveyTitles] = useState();
  const { userData } = useContext(UserContext);
  const [Answers, SetAnswers] = useState();

  useEffect(() => {
    const fetchTitles = async () => {
      const Titles = await axios.post("/forms/fetchtitles", {
        UserID: userData.user,
      });
      setSurveyTitles(Titles.data);
    };
    fetchTitles();
  }, []);
  useEffect(() => {}, [surveytitles]);
  const newsurvey = () => {
    history.push("/newsurvey");
  };
  const countanswers = (index, noofcounts) => {
    let array;
    array = Answers.Survey[index].ChosenAnswers;
    array.sort();
    let counter = [];
    for (let i = 0; i < noofcounts; i++) {
      let temp = array.filter((item) =>
        item.includes(Answers.Questions[index].Answers[i])
      );
      var obj = {};
      if (temp.length === 0) {
        obj[Answers.Questions[index].Answers[i]] = 0;
        counter.push(obj);
      } else {
        obj[temp[0]] = temp.length;
        counter.push(obj);
      }
    }
    return counter;
  };
  const displayanswers = (counters, index) => {
    let buffer = "";
    counters.map((key) => {
      buffer +=
        Object.entries(key)[0][0] +
        ":" +
        (
          (Object.entries(key)[0][1] /
            Answers.Survey[index].ChosenAnswers.length) *
          100
        ).toFixed(2) +
        "%\n";
      return 0;
    });
    return buffer;
  };
  const handlechange = async (e) => {
    const Survey = await axios.post("/forms/fetchsurvey", {
      FormID: e.target.value,
    });
    SetAnswers(Survey.data);
  };
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Welcome {" " + userData.user.displayName}!
          </Typography>
          <Typography variant="body2" component="p">
            You can create new surveys or see the surveys you already completed.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.surveybutton}
            variant="outlined"
            onClick={newsurvey}
          >
            + Add new survey
          </Button>
          <FormControl className={classes.box}>
            <InputLabel>Choose existing survey</InputLabel>
            <NativeSelect onChange={handlechange}>
              <option aria-label="None" value="" />
              {surveytitles ? (
                surveytitles.map((title) => {
                  return <option value={title._id}>{title.FormTitle}</option>;
                })
              ) : (
                <></>
              )}
            </NativeSelect>
            <FormHelperText>See answers on existing surveys</FormHelperText>
          </FormControl>
        </CardActions>
      </Card>
      {Answers ? (
        Answers.Survey ? (
          <List component="nav" className={classes.list} aria-label="questions">
            {Answers.Questions.map((Question, index) => {
              if (Answers.Survey.length === 0)
                return (
                  <ListItem button divider>
                    <ListItemText
                      className={classes.textbox}
                      primary={Question.QuestionText}
                      secondary={"No answers yet"}
                    />
                  </ListItem>
                );
              let counters = countanswers(index, Question.NumberofAnswers);
              return (
                <ListItem button divider>
                  <ListItemText
                    className={classes.textbox}
                    secondaryTypographyProps={{ color: "black" }}
                    primary={
                      <Typography variant="h6">
                        {" "}
                        {Question.QuestionText}
                      </Typography>
                    }
                    secondary={displayanswers(counters, index)}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography>No answers yet.</Typography>
        )
      ) : (
        <Typography>No answers yet.</Typography>
      )}
    </div>
  );
};
export default LoggedHome;
