import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import {makeStyles } from '@material-ui/core/styles';
import axios from "axios";

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
    justifyContent: 'center'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end'
  }
});

const Inform = () => {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  function deleteFavorite(blogId) {
    console.log(blogId);
    axios
      .delete(`${process.env.REACT_APP_API}/v1/api/favorites/${blogId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((data) => setFavorites(data.data))
      .catch((e) => console.log(e));
  }
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/v1/api/favorites`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((data) => setFavorites(data.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container size='sm'>
      <h1>Favorites</h1>
      <div className={classes.cardContainer}>
      {favorites.map((favorite) => {
        return (
          <Card sx={{ maxWidth: 45 }} className={classes.card}>
            <CardMedia
              component='img'
              height='150'
              image={favorite.img}
              alt='green iguana'
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h5' component='div'>
                {favorite.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {favorite.caption}
              </Typography>{" "}
              <CardActions>
                <Button
                  size='small'
                  onClick={() => deleteFavorite(favorite._id)}
                >
                  Delete from Favorites
                </Button>
                <Button size='small' href={favorite.src} target='__blank'>
                  Learn More
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        );
      })}
      </div>
    </Container>
  );
};

export default Inform;
