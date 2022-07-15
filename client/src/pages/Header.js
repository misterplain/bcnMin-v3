import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "@material-ui/core";

const Header = () => {
  return (
    <div className='header'>
      <h1>bcnMinimalista</h1>
      <p>bcnMinimalista</p>
      <p>
        <Button bsStyle='primary'>Learn more</Button>
      </p>
    </div>
  );
};

export default Header;
