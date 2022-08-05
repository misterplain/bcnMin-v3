import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Button, TextField, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
//redux
import { login } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
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
    <Container size='sm'>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
        <Button type='submit' variant='contained' color='secondary'>
          Login
        </Button>
      </form>
      <Typography />
      Don't have an account?
      <Typography />{" "}
      <Button onClick={() => history.push("/register")}>Register Now</Button>
    </Container>
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
