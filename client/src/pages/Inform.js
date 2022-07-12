import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
  },
  card: {
    display: "inline-block",
    border: "1px solid #e0e0e0",
    margin: 20,
  },
});

const Inform = ({ auth: { isAuthenticated, loading } }) => {
  const classes = useStyles();
  const [blogPost, setBlogPost] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const { user = {} } = useSelector((state) => state.auth);

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
      .then((data) => console.log({ data }))
      .catch((e) => console.log(e));
    setFavorite(true);
  };

  function deleteFavorite(blogId) {
    console.log(blogId);
    axios
      .delete(`${process.env.REACT_APP_API}/v1/api/favorites/${blogId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((data) => console.log({ data }))
      .catch((e) => console.log(e));
    setFavorite(false);
  }

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API}/v1/api/blog`)
    .then((response) => {
      console.log(response.data);
      setBlogPost(response.data);
    })
    .catch((error) => {
      alert("Error in fetching Blog Post Info", error);
    });
  }, []);

  return (
    <Container size='sm'>
      <h1>Inform</h1>
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
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {blogPost.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {blogPost.caption}
                  </Typography>
                </CardContent>
                <CardActions>
                  {isAuthenticated && !loading && (
                    <div>
                      {user?.favorites &&
                      user?.favorites?.includes(blogPost._id) ? (
                        <Button
                          size='small'
                          onClick={() => deleteFavorite(blogPost._id)}
                        >
                          Delete
                        </Button>
                      ) : (
                        <Button
                          size='small'
                          onClick={() => addFavorite(blogPost._id)}
                        >
                          Add to Favorites
                        </Button>
                      )}
                    </div>
                  )}

                  <Button size='small' href={blogPost.src} target='__blank'>
                    Learn More
                  </Button>
                </CardActions>
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
