import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import axios from "axios";

const InformFavButton = ({ blogPost, onAddFavorite, onDeleteFavorite }) => {
  const { user = {} } = useSelector((state) => state.auth);
  const { favorites = [] } = user;
  let isFavourite = false;

  if (favorites?.includes(blogPost._id)) {
    isFavourite = true;
  }

  return (
    <div>
      {isFavourite && (
        <Button size='small' onClick={onDeleteFavorite}>
          Delete
        </Button>
      )}
      {!isFavourite && (
        <Button size='small' onClick={onAddFavorite}>
          Add to Favorites
        </Button>
      )}
    </div>
  );
};

export default InformFavButton;
