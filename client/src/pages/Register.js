import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Title from "../ui/Title";
import { makeStyles } from "@material-ui/core/styles";
//redux
import { connect } from "react-redux";
import { register } from "../actions/auth";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    justifyContent: "center",
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
  error: {
    color: "red",
    marginTop: "0px",
    marginLeft: "30px",
  },
});

const validationSchema = Yup.object({
  username: Yup.string().required("Please provide a username"),
  email: Yup.string().required("Please provide an email"),
  password: Yup.string()
    .min(6)
    .required("Please provide a password of at least 6 characters"),
  password2: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Register = ({ setAlert, register, isAuthenticated }) => {
  const styles = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
    },
  });

  if (isAuthenticated) {
    return <Redirect to='/inform' />;
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item xs={12}>
        <Title title='register' />
      </Grid>
      <Grid item xs={12} md={8} className={styles.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            onChange={formik.handleChange}
            id='username'
            name='username'
            className={styles.textField}
            label='Username'
            variant='outlined'
            color='success'
            fullWidth
            required
            value={formik.values.username}
            helperText={
              formik.errors.username && formik.touched.username
                ? formik.errors.username
                : null
            }
          />
          <TextField
            onChange={formik.handleChange}
            id='email'
            name='email'
            className={styles.textField}
            label='Email'
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
            id='password'
            name='password'
            className={styles.textField}
            label='Password'
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
          <TextField
            onChange={formik.handleChange}
            id='password2'
            name='password2'
            className={styles.textField}
            label='Confirm Password'
            variant='outlined'
            color='success'
            fullWidth
            required
            value={formik.values.password2}
            helperText={
              formik.errors.password2 && formik.touched.password2
                ? formik.errors.password2
                : null
            }
          />
          <Button
            type='submit'
            variant='contained'
            color='success'
            className={styles.formButton}
          >
            Register
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} className={styles.registerLine}>
        <Typography />
        Already have an account?
        <Button onClick={() => history.push("/login")}>Login</Button>
        <Typography />{" "}
      </Grid>
    </Grid>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(Register);
