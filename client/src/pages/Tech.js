import React, { useState } from "react";
import {
  Typography,
  FormControlLabel,
  Button,
  TextField,
  FormLabel,
  FormControl,
  Box,
  Card,
  Grid,
} from "@material-ui/core";
import Link from "@mui/material/Link";

import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Tech.css";
import { TOOLS } from "../shared/tools";
import PropTypes from "prop-types";
import Modal from "./Modal";

const tools = TOOLS;

//modal style
const style = {
  position: "rela",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useSyles = makeStyles({
  toolsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  techCard: {
    textDecoration: "none",
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    margin: "3px",
    borderRadius: "10px",
  },
});

const validationSchema = Yup.object({
  kilometers: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
  fastFashion: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
  flightHours: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
  meat: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
});

const Tech = () => {
  const classes = useSyles();
  const [answer, setAnswer] = useState(0);

  const formik = useFormik({
    initialValues: {
      kilometers: "",
      fastFashion: "",
      flightHours: "",
      meat: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setAnswer(
        values.kilometers * 1.2 +
          values.fastFashion * 100.96 +
          values.flightHours * 24 +
          values.meat * 125
      );
      console.log(answer);
      resetForm();
    },
  });

  let answerMonth = answer * 4;
  let answerYear = answer * 52;

  //modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container size='sm'>
      <h1>Tech</h1>
      <Typography>
        {" "}
        Megacorporations must be held accountable for their contribution to
        global warming through policy and taxation, don’t lose sight of that!
        However, on an individual basis, it’s helpful to check in on your part
        too. Check in below with your water footprint, measured in gallons of
        water.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          className=''
          label='kilometers'
          id='kilometers'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.kilometers}
          onChange={formik.handleChange}
        />
        {formik.errors.kilometers && formik.touched.kilometers ? (
          <div className=''>{formik.errors.kilometers}</div>
        ) : null}
        <TextField
          className=''
          label='fastFashion'
          id='fastFashion'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.fastFashion}
          onChange={formik.handleChange}
        />
        {formik.errors.fastFashion && formik.touched.fastFashion ? (
          <div className=''>{formik.errors.fastFashion}</div>
        ) : null}
        <TextField
          className=''
          label='flightHours'
          id='flightHours'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.flightHours}
          onChange={formik.handleChange}
        />
        {formik.errors.flightHours && formik.touched.flightHours ? (
          <div className=''>{formik.errors.flightHours}</div>
        ) : null}
        <TextField
          className=''
          label='meat'
          id='meat'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.meat}
          onChange={formik.handleChange}
        />
        {formik.errors.meat && formik.touched.meat ? (
          <div className=''>{formik.errors.meat}</div>
        ) : null}
        <Button type='submit' onClick={handleOpen}>
          Check Footprint
        </Button>
        <Modal open={open} setOpen={setOpen} onClose={() => setOpen(false)}>
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'
              >
                Your water footprint
              </Typography>
              <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                Your weekly water footprint is {answer} which is {answerMonth}{" "}
                over the course of a month and {answerYear} over the course of a
                year
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </form>
      <Grid container spacing={3} className={classes.toolsContainer}>
        {tools.map((tools) => {
          return (
            <Grid
              item
              xs={11}
              sm={5}
              md={2}
              key={tools.id}
              className={classes.techCard}
            >
              <Link
                href={tools.src}
                target='_blank'
                rel='noreferrer'
                underline='none'
                color='inherit'
              >
                <Typography>{tools.name}</Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {tools.map((tools) => (
            <Grid item xs={2} sm={4} md={4} key={tools.id}>
              <Typography>{tools.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Container>
  );
};

export default Tech;
