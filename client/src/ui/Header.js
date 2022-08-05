import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-social/bootstrap-social.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
  headerContent: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerTitle: {
    fontSize: "35px",
  },
  iconGroup: {
    color: "inherit",
  },
  icon: {
    color: "black",
    marginTop: "17px",
    marginLeft: "10px",
    fontSize: "large",
  },
});

const Header = () => {
  const styles = useStyles();
  return (
    <div className={styles.headerContainer}>
      <span className={styles.headerContent}>
        <div className={styles.headerTitle}>bcnMinimalista - </div>{" "}
        <div className={styles.iconGroup}>
          <a href='http://instagram.com/' target='_blank' rel='noreferrer'>
            <InstagramIcon
              fontSize='large'
              sx={{ marginTop: "10px", marginLeft: "10px", color: "black" }}
            />
          </a>
          <a href='http://facebook.com/' target='_blank' rel='noreferrer'>
            <FacebookIcon
              fontSize='large'
              sx={{ marginTop: "10px", marginLeft: "10px", color: "black" }}
            />
          </a>
          <a href='http://twitter.com/' target='_blank' rel='noreferrer'>
            <TwitterIcon
              fontSize='large'
              sx={{ marginTop: "10px", marginLeft: "10px", color: "black" }}
            />
          </a>
          <a href='http://youtube.com/' target='_blank' rel='noreferrer'>

            <YouTubeIcon
              fontSize='large'
              sx={{ marginTop: "10px", marginLeft: "10px", color: "black" }}
            />
          </a>
        </div>
      </span>
    </div>
  );
};

export default Header;
