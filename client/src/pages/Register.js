import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
//redux
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
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
    <Container size='sm'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          className=''
          label='Username'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          value={username}
          error={usernameError}
        />
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
          Register
        </Button>
      </form>
    </Container>
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

export default connect(mapStateToProps, { setAlert, register })(Register);
