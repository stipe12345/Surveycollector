import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import React from "react";
const Completed = () => {
  const history = useHistory();

  return (
    <>
      <Typography variant="h5">Thank you! Survey Completed</Typography>
      <Button
        style={{ margin: "5px" }}
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Return to home page
      </Button>
    </>
  );
};

export default Completed;
