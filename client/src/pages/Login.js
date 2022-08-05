import React, { useState } from "react";

import { Button, TextField, Typography, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Title from "../ui/Title";
import { makeStyles } from "@material-ui/core/styles";
//redux
import { login } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "2rem",
  },
  formButton: {
    marginTop: "1rem",
  },
});

const Login = ({ login, isAuthenticated }) => {
  const styles = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    login(email, password);
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item xs={12}>
        <Title title={"login"} />
      </Grid>
      <Grid item xs={12} md={8} justifyContent='center'>
        <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className=''
            label='Email'
            variant='outlined'
            color='secondary'
            fullWidth
            required
            value={email}
            error={emailError}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className=''
            label='Password'
            variant='outlined'
            color='secondary'
            fullWidth
            required
            value={password}
            error={passwordError}
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
      <Grid item xs={12}>
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
