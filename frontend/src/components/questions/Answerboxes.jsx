import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const Radio = (props) => {
  const [Noofans, setNoofans] = useState(props.number);
  const [Anslist, setAnslist] = useState();
  const [ans, setans] = useState();
  const [completedata, setCompletedata] = useState([]);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    getanswerboxes();
  }, [disabled]);
  useEffect(() => {
    props.setAnswers(completedata);
  }, [completedata]);
  const getanswerboxes = () => {
    if (ans === undefined) initanswers();
    else {
      let i = 0;
      let answerbox = [];
      while (i < Noofans) {
        i++;
        answerbox.push(
          <TextField
            variant="outlined"
            margin="normal"
            disabled={disabled}
            required
            fullWidth
            key={i}
            id={"answer" + i}
            label={"answer" + i}
            name={"answer" + i}
            onChange={(e) => setAnswers(e.target.id, e.target.value)}
          />
        );
      }
      setAnslist(answerbox);
    }
  };
  const initanswers = () => {
    let i = 0;
    let answer = [];
    while (i < Noofans) {
      i++;
      answer.push(i);
    }
    setans(answer);
  };
  const setAnswers = (id, value) => {
    let answerslist = ans;
    for (let i = 0; i < Noofans; i++) {
      if (id === "answer" + (i + 1)) {
        answerslist[i] = value;
      }
    }
    setans(answerslist);
  };
  const handleinput = () => {
    setCompletedata({ questiontext: props.questiontext, answers: ans });

    setDisabled(true);
  };
  return (
    <>
      {Anslist
        ? Anslist.map((answerlist) => {
            return <div>{answerlist}</div>;
          })
        : getanswerboxes()}
      <Button onClick={handleinput}>Confirm answers</Button>
    </>
  );
};

export default Radio;
