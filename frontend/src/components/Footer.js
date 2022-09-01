import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({

});

const Footer = () => {
  const styles = useStyles();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTitle}>bcnMinimalista</div>

    </div>
  );
};

export default Footer;
