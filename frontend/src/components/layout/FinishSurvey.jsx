import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
const FinishSurvey = (props) => {
  const history = useHistory();
  const [link, setLink] = useState();
  useEffect(() => {
    setLink("192.168.10.100:3000/survey/" + props.location.state.props);
  }, []);
  useEffect(() => {}, [link]);
  return (
    <>
      <Typography variant="h5">Your link:{link}</Typography>

      <Button
        style={{ margin: "5px" }}
        variant="contained"
        color="primary"
        onClick={() => navigator.clipboard.writeText(link)}
      >
        Copy
      </Button>
      <Button
        style={{ margin: "5px" }}
        variant="contained"
        color="primary"
        onClick={() =>
          history.push({
            pathname: `/survey/${props.location.state.props}`,
            state: { props: props.location.state.props },
          })
        }
      >
        Open it!
      </Button>
    </>
  );
};

export default FinishSurvey;
