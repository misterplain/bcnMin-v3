import React, { useState } from "react";
import {
  Typography,
  FormControlLabel,
  Button,
  TextField,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import './Tech.css';
import {TOOLS } from '../shared/tools';


const tools = TOOLS

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
          color='secondary'
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
          color='secondary'
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
          color='secondary'
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
          color='secondary'
          fullWidth
          value={formik.values.meat}
          onChange={formik.handleChange}
        />
        {formik.errors.meat && formik.touched.meat ? (
          <div className=''>{formik.errors.meat}</div>
        ) : null}
        <Button type='submit'>Check Footprint</Button>
      </form>
      <Typography>
        Your weekly water footprint is {answer} which is {answerMonth} over the
        course of a month and {answerYear} over the course of a year
      </Typography>
      <div className="tech__tools-container">
          {tools.map((tools) => {
            return (
              <div key={tools.id} className="tech__tools-card">
                <a href={tools.src} target="_blank" rel="noreferrer">
                  <p className="tech__tools-text">{tools.name}</p>
                </a>
              </div>
            );
          })}
        </div>
    </Container>
  );
};

export default Tech;
