import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { REDUCEPRODUCTS } from "../shared/reduceproducts";
import { REDUCETIPS } from "../shared/reducetips";
import { REDUCEWASTE } from "../shared/reducewaste";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Marquee from "react-fast-marquee";
import { useHistory } from "react-router-dom";
import { CallMissedSharp } from "@material-ui/icons";

const reduceWaste = REDUCEWASTE;
const reduceTips = REDUCETIPS;
const reduceProducts = REDUCEPRODUCTS;

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

export default function Reduce() {
  const classes = useStyles();
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
                  <Typography gutterBottom variant='h5' component='div'>
                    {product.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.description}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
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
