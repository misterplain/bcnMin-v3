import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
  },
  card: {
    display: "inline-block",
    border: "1px solid #e0e0e0",
    margin: 20
  },
});

export default function Inform() {
  const classes = useStyles();
  const [blogPost, setBlogPost] = useState([]);

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

  useEffect(() => {
    fetchBlogPosts();
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
                  <Button size='small'>Share</Button>
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
}
