import React from "react";
import { Button, TextField, Typography, Grid } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import Title from "../components/Title";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { login } from "../actions/userActions";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    justifyContent: "center",
  },
  form: {
    width: "100%",
  },
  textField: {
    margin: "10px",
  },
  formButton: {
    marginTop: "1rem",
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
  },
  registerLine: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const validationSchema = Yup.object({
  email: Yup.string().required("Please provide an email"),
  password: Yup.string()
    .min(6)
    .required("Please provide a password of at least 6 characters"),
});

const Login = () => {
  const styles = useStyles();
const navigate = useNavigate();

const user = useSelector((state) => state.user);
const {loading, isAuthenticated} = user;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(formik.errors);
      login({ email: values.email, password: values.password });
    },
  });

  //redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item xs={12}>
        <Title title={"login"} />
      </Grid>
      <Grid item xs={12} md={8} className={styles.formContainer}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <TextField
            onChange={formik.handleChange}
            className={styles.textField}
            label='Email'
            id='email'
            name='email'
            variant='outlined'
            color='success'
            fullWidth
            required
            value={formik.values.email}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
          />
          <TextField
            onChange={formik.handleChange}
            className={styles.textField}
            label='Password'
            id='password'
            name='password'
            variant='outlined'
            color='success'
            fullWidth
            required
            value={formik.values.password}
            helperText={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null
            }
          />
          <Button
            type='submit'
            variant='contained'
            color='success'
            className={styles.formButton}
          >
            Login
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} className={styles.registerLine}>
        <Typography />
        Don't have an account?
        <Button onClick={() => navigate("/register")}>Register Now</Button>
        <Typography />{" "}
      </Grid>
    </Grid>
  );
};

export default Login
