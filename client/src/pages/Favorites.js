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
import axios from "axios";

const Inform = () => {
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
      {favorites.map((favorite) => {
        return (
          <Card sx={{ maxWidth: 45 }}>
            <CardMedia
              component='img'
              height='150'
              image={favorite.img}
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {favorite.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {favorite.caption}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' onClick={() => deleteFavorite(favorite._id)}>
                Delete from Favorites
              </Button>
              <Button size='small' href={favorite.src} target='__blank'>
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Container>
  );
};

export default Inform;
