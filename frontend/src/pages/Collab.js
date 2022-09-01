import React, { useState } from "react";
import { COLLAB } from "../shared/collab";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Fade,
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  FormControl,
  Grid
} from "@material-ui/core";
import Link from "@mui/material/Link";
import Title from "../components/Title";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
//redux
import { connect } from "react-redux";

const collab = COLLAB;

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "70%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "90%",
  },
  collabList: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  collabCard: {
    textDecoration: "none",
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    margin: "3px",
    borderRadius: "10px",
  },
});

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

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Your name should have more than 3 characters")
    .required("Required"),
  phoneNum: Yup.string()
    .min(
      9,
      "Phone number should have more than 3 characters, please include country code"
    )
    .required("Required"),
  email: Yup.string().min(3, "Too short").required("Required"),
  message: Yup.string()
    .min(2, "You can do better than that")
    .required("Required"),
});

const Collab = (props) => {
  const styles = useStyles();
  const [contact, setContact] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNum: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setContact({
        name: values.name,
        phoneNum: values.phoneNum,
        email: values.email,
        message: values.message,
      });
      console.log(values);
      resetForm();
    },
  });

  //modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const triggerAlert = () => {
    props.setAlert("THIS IS AN ALERT TEST AND IT WORKED!", "success");
  };
  return (
    <>
      <Grid container className={styles.container} xs={12} sm={12} md={12}>
        <Grid item xs={12} sm={12} md={12} className={styles.formContainer}>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <FormGroup>
              <FormControlLabel
                control={
                  <TextField
                    name='name'
                    label='Name'
                    variant='outlined'
                    color='success'
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className=''
                  />
                }
              />

              {formik.errors.name && formik.touched.name ? (
                <div className='collab__errors'>{formik.errors.name}</div>
              ) : null}
              <FormGroup>
                <FormControlLabel
                  control={
                    <TextField
                      type='number'
                      name='phoneNum'
                      label='Phone Number (optional)'
                      variant='outlined'
                      color='success'
                      fullWidth
                      value={formik.values.phoneNum}
                      onChange={formik.handleChange}
                      className='form-control'
                    />
                  }
                />

                {/* {formik.errors.phoneNum && formik.touched.phoneNum ? (
                <div className="collab__errors">{formik.errors.phoneNum}</div>
              ) : null} */}
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={
                    <TextField
                      type='text'
                      name='email'
                      label='Email'
                      variant='outlined'
                      color='success'
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className='form-control'
                    />
                  }
                />

                {formik.errors.email && formik.touched.email ? (
                  <div className='collab__errors'>{formik.errors.email}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={
                    <TextField
                      type='text'
                      name='message'
                      label='Enter your message here'
                      rows='4'
                      Multiline={true}
                      variant='outlined'
                      color='success'
                      fullWidth
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      className='form-control'
                    />
                  }
                />

                {formik.errors.message && formik.touched.message ? (
                  <div className='collab__errors'>{formik.errors.message}</div>
                ) : null}
              </FormGroup>
            </FormGroup>

            <Button
              type='submit'
              onClick={handleOpen}
              className={styles.button}
            >
              Submit feedback
            </Button>
          </form>
        </Grid>
        <Grid container spacing={3} className={styles.collabList}>
          {collab.map((collab) => {
            return (
              <Grid
                item
                xs={11}
                sm={5}
                md={2}
                key={collab.id}
                className={styles.collabCard}
              >
                <Link
                  href={collab.src}
                  target='_blank'
                  rel='noreferrer'
                  underline='none'
                  color='inherit'
                >
                  <Typography>{collab.name}</Typography>
                </Link>
              </Grid>
            );
          })}
        </Grid>
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
                Your weekly water footprint is year
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </>
  );
};

export default connect(null)(Collab);
