import React, { useState } from "react";
import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../../ui/Title";
import "./Rescue.css";

const useStyles = makeStyles({
  container: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  }
});

export default function Rescue() {
  const styles = useStyles();
  return (
    <Grid container xs={12} sm={11} md={10} className={styles.container}>
      <Grid item className={styles.title}>
        <Title title={"adopt, don't shop."} />
        <Typography variant="h6" component="div" gutterBottom>Reduce your carbon pawprint by sharing your love and resources with
            animals in need </Typography>
      </Grid>

      <div className='rescue__container'>
        <div className='card-container-rescue'>
          <div className='card-rescue'>
            <a
              href={"https://ajuntament.barcelona.cat/benestaranimal/"}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/d/d6/Cat_plotting_something_evil%21.jpg'
                alt='cat'
              />
              <div className='card__head'>CAA Compañía de Barcelona</div>
            </a>
          </div>
          <div className='card-rescue'>
            <a
              href={"http://www.gatsdegracia.cat/"}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/False_alarm_-a.jpg/1280px-False_alarm_-a.jpg'
                alt='cat'
              />
              <div className='card__head'>Gats De Gràcia</div>
            </a>
          </div>
          <div className='card-rescue'>
            <a
              href={"https://www.eljardinetdelsgats.org/es/"}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Neugierige-Katze.JPG/1280px-Neugierige-Katze.JPG'
                alt='cat'
              />
              <div className='card__head'>El Jardinet dels Gats</div>
            </a>
          </div>
          <div className='card-rescue'>
            <a
              href={"https://www.altarriba.org/"}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Al_acecho_%289272124788%29.jpg/1280px-Al_acecho_%289272124788%29.jpg'
                alt='cat'
              />
              <div className='card__head'>Amigos de Los Animales</div>
            </a>
          </div>
          <div className='card-rescue'>
            <a
              href={"https://www.catshopbyadira.com/"}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mimi%26Tigsi.jpg/1280px-Mimi%26Tigsi.jpg'
                alt='cat'
              />
              <div className='card__head'>Sede ADiRA BCN</div>
            </a>
          </div>
        </div>
      </div>
    </Grid>
  );
}
