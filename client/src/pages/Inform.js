import React, { useState, useEffect } from "react";
import InformFavButton from "./InformFavButton";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, updateUser } from "../actions/auth.js";
import Title from "./Title";

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    border: "1px solid black",
    justifyContent: "center",
  },
  card: {
    display: "inline-block",
    border: "1px solid #e0e0e0",
    margin: 20,
    flexBasis: "40%",
    justifyContent: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
});

const Inform = ({ auth: { isAuthenticated, loading } }) => {
  const classes = useStyles();
  const [blogPost, setBlogPost] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [change, setChange] = useState();

  const { user = {} } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log({ user });

  const fetchBlogPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/v1/api/blog`)
      .then((response) => {
        console.log(response.data);
        setBlogPost(response.data);
      })
      .catch((error) => {
        alert("Error in fetching Blog Post Info", error);
      });
  };

  const addFavorite = (blogId) => {
    axios
      .post(
        `${process.env.REACT_APP_API}/v1/api/favorites`,
        {
          blog: blogId, // req.body.blog
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        // setChange((previousChange) => !previousChange);
        dispatch(updateUser({ blogId, isAddToFavorite: true }));
      })
      .catch((e) => console.log(e));
    // setFavorite(true);
  };

  function deleteFavorite(blogId) {
    console.log(blogId);
    axios
      .delete(`${process.env.REACT_APP_API}/v1/api/favorites/${blogId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        // setChange((previousChange) => !previousChange);
        dispatch(updateUser({ blogId, isAddToFavorite: false }));
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    dispatch(loadUser());
  }, [change]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <Container size='sm'>
      <Title title={'news concerning local efforts to minimize'}/>
      <div className={classes.cardContainer}>
        {blogPost.map((blogPost) => {
          return (
            <>
              <Card sx={{ maxWidth: 45 }} className={classes.card}>
                <CardMedia
                  component='img'
                  height='150'
                  image={blogPost.img}
                  alt='green iguana'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='div'>
                    {blogPost.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {blogPost.caption}
                  </Typography>{" "}
                  <CardActions>
                    {isAuthenticated && !loading && (
                      <div>
                        <InformFavButton
                          onAddFavorite={() => addFavorite(blogPost._id)}
                          onDeleteFavorite={() => deleteFavorite(blogPost._id)}
                          blogPost={blogPost}
                        />
                      </div>
                    )}

                    <Button size='small' href={blogPost.src} target='__blank'>
                      Learn More
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </>
          );
        })}
      </div>
    </Container>
  );
};

Inform.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps)(Inform);
