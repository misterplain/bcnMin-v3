import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import "./Rescue.css";

export default function Rescue() {
  return (
    <Container size='sm'>
      <h1>Rescue</h1>
      <div className='rescue__container'>
        <div className='rescue__title'>
          <p className='rescue__title-text'>adopt, don't shop</p>
          <p className='rescue__title-caption'>
            Reduce your carbon pawprint by sharing your love and resources with
            animals in need
          </p>
        </div>

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
    </Container>
  );
}
