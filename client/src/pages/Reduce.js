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
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    display: "inline-block",
    maxWidth: "80px",
    border: "1px solid #e0e0e0",
    margin: 5,
  },
});

export default function Reduce() {
  const classes = useStyles();
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
      <h1>Reduce</h1>
      <div className={classes.cardContainer}>
        {reduceProducts.map((product) => {
          return (
            <Card
              sx={{ maxWidth: 345 }}
              key={product.id}
              className={classes.card}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  image={product.src}
                  alt='nada'
                />
                <CardContent>
                  <Typography gutterBottom className={classes.title}>
                    {product.title}
                  </Typography>
                  {/* <Typography sx={{display: 'none'}}variant='body2' color='text.secondary'>
                    {product.description}
                  </Typography> */}
                  <Typography className={classes.price}>
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
      <div className='card-container'>
        {reduceProducts.map((product) => {
          return (
            <div className='card'>
              <div className='card-image'>
                <img src={product.src} alt='nada' />
              </div>
              <div className='card-content'>
                <h3 className='card-title'>{product.title}</h3>
                <p className='card-price'>{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <hr></hr>

      <hr></hr>
      <div className='reduce__products-container'>
        <div className='reduce__products-title'>
          <h3>Goods the encourage longevity</h3>
        </div>
        <div className='reduce__products-list-container'>
          <a href={site} target='_blank' rel='noreferrer'>
            <div className='reduce__card-img'>
              <img src={src} alt='nada' />
            </div>
            <div className='reduce__products-body'>
              <div className='reduce__body-title'>{title}</div>
              <div className='reduce__body-description'>{description}</div>
              <div className='reduce__body-price'>{price}</div>
            </div>
          </a>
        </div>
        <div className='reduce__btn-container'>
          <button className='reduce__prev-btn' onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className='reduce__next-btn' onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <Marquee>
        {reduceWaste.map((waste) => {
          return (
            <div className='reduce__waste-card' key={waste.id}>
              <a href={waste.site} target='_blank' rel='noreferrer'>
                <div className='reduce-waste-card-body'>
                  <div className='reduce__waste-card-header'>{waste.title}</div>
                  <div className='reduce__waste-card-body'>
                    {waste.subtitle}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </Marquee>
      <Marquee>
        {reduceTips.map((tip) => {
          return (
            <div className='reduce__tips-card' key={tip.id}>
              <div className='reduce__tips-cardtext'>{tip.title}</div>
            </div>
          );
        })}
      </Marquee>
    </Container>
  );
}
