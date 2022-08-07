import React from "react";

import { Button, TextField, Typography, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Title from "../ui/Title";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { login } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

const Login = ({ login, isAuthenticated }) => {
  const styles = useStyles();
  const history = useHistory();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

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
    return <Redirect to='/' />;
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
        <Button onClick={() => history.push("/register")}>Register Now</Button>
        <Typography />{" "}
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { login })(Login);
