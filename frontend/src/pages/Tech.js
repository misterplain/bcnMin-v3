import React, { useState } from "react";
import { Typography, Button, TextField, Box, Grid } from "@material-ui/core";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Title from "../components/Title";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TOOLS } from "../shared/tools";
import Modal from "../components/Modal";

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
  container: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  intro: {
    width: "100%",
    margin: "15px",
    fontSize: "2.5rem",
  },
  textField: {
    margin: "10px",
  },
  formButton:{
    marginTop: "1rem",
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
  },
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
  const styles = useSyles();
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
      handleOpen();
    },
  });

  let answerMonth = answer * 4;
  let answerYear = answer * 52;

  //modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      container
      xs={12}
      sm={11}
      md={10}
      maxWidth='md'
      className={styles.container}
    >
      <Grid item xs={12}>
        <Title title={"water footprint calculator"} />
      </Grid>
      <Grid item className={styles.intro}>
        <Typography>
          Megacorporations must be held accountable for their contribution to
          global warming through policy and taxation, don’t lose sight of that!
          However, on an individual basis, it’s helpful to check in on your part
          too. Check in below with your water footprint, measured in gallons of
          water.
        </Typography>
      </Grid>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          className={styles.textField}
          label='kilometers driver per week on average'
          id='kilometers'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.kilometers}
          onChange={formik.handleChange}
          helperText={
            formik.errors.kilometers && formik.touched.kilometers ? (
              <div className=''>{formik.errors.kilometers}</div>
            ) : null
          }
        />

        <TextField
          className={styles.textField}
          label='Fast Fashion items purchased per year'
          id='fastFashion'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.fastFashion}
          onChange={formik.handleChange}
          helperText={
            formik.errors.fastFashion && formik.touched.fastFashion ? (
              <div className=''>{formik.errors.fastFashion}</div>
            ) : null
          }
        />

        <TextField
          className={styles.textField}
          label='Flight Hours over the course of a year'
          id='flightHours'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.flightHours}
          onChange={formik.handleChange}
          helperText={
            formik.errors.flightHours && formik.touched.flightHours ? (
              <div className=''>{formik.errors.flightHours}</div>
            ) : null
          }
        />

        <TextField
          className={styles.textField}
          label='Servings of meat consumed per week'
          id='meat'
          variant='outlined'
          color='success'
          fullWidth
          value={formik.values.meat}
          onChange={formik.handleChange}
          helperText={
            formik.errors.meat && formik.touched.meat ? (
              <div className=''>{formik.errors.meat}</div>
            ) : null
          }
        />

        <Button type='submit' className={styles.formButton}>Check Footprint</Button>
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
      <Grid container spacing={3} className={styles.toolsContainer}>
        <Grid item xs={12}>
          <Title title={"tools to help you minimize"} />
        </Grid>
        {tools.map((tools) => {
          return (
            <Grid
              item
              xs={11}
              sm={5}
              md={2}
              key={tools.id}
              className={styles.techCard}
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
    </Grid>
  );
};

export default Tech;
