import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button} from "@material-ui/core";


const Header = () => {
  return (
    <div className="header">
      <h1>Hello, world!</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <p>
        <Button bsStyle='primary'>Learn more</Button>
      </p>
    </div>
  );
};

export default Header;
