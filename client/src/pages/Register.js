import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import {useHistory} from 'react-router-dom';
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

})

const Register = ({ setAlert, register, isAuthenticated }) => {
  const styles = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e) => {
    console.log(username, email, password);
    e.preventDefault();
    if (username === "") {
      setUsernameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    register({ username, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/inform' />;
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item xs={12}>
        <Title title='register' />
      </Grid>
      <Grid item xs={12} md={8} className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            className={styles.textField}
            label='Username'
            variant='outlined'
            color='success'
            fullWidth
            required
            value={username}
            error={usernameError}
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className={styles.textField}
            label='Email'
            variant='outlined'
            color='success'
            fullWidth
            required
            value={email}
            error={emailError}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className={styles.textField}
            label='Password'
            variant='outlined'
            color='success'
            fullWidth
            required
            value={password}
            error={passwordError}
          />
          <Button type='submit' variant='contained' color='success' className={styles.formButton}>
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
