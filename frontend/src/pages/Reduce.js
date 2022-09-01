import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { REDUCEPRODUCTS } from "../shared/reduceproducts";
import { REDUCETIPS } from "../shared/reducetips";
import { REDUCEWASTE } from "../shared/reducewaste";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Marquee from "react-fast-marquee";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Reduce.css";

const reduceWaste = REDUCEWASTE;
const reduceTips = REDUCETIPS;
const reduceProducts = REDUCEPRODUCTS;

const useStyles = makeStyles({
  container: {
    border: "1px solid black",
    minWidth: "600px",
    display: "inline-block",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    width: '300px',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

export default function Reduce() {
  const styles = useStyles();
  const [index, setIndex] = useState(0);
  const product = REDUCEPRODUCTS;
  const { title, price, src, site, description } = product[index];

  const checkNumber = (number) => {
    if (number > product.length - 1) {
      return 0;
    }
    if (number < 0) {
      return product.length - 1;
    }
    return number;
  };
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <Container size='sm'>
      <Card className={styles.card} >
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image='/static/images/cards/contemplative-reptile.jpg'
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Lizard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
