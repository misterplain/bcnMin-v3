import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  headerContainer: {
    padding: "10px",
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
    marginBottom: "0px",
    position: "sticky",
    height: "60px",
  },
  headerTitle: {
    fontSize: "35px",
  },
});

const Header = () => {
  const styles = useStyles();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTitle}>bcnMinimalista</div>

    </div>
  );
};

export default Header;
