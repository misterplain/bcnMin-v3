import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  box: {
    height: "40px",
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "black",
    margin: "10px",
  },
}));

export default function Title(props) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography className={classes.title}>{props.title}</Typography>
    </Box>
  );
}
