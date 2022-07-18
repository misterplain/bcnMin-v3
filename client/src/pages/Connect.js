import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
//redux and responsive buttons if logged in

import PropTypes from "prop-types";
import Title from "./Title";
import { makeStyles } from "@material-ui/core/styles";
//redux
import { loadUser } from "../actions/auth.js";
import { updateComments, getMessages } from "../actions/comments";
import { connect, useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  container: {
    border: "1px solid black",
  },
});

const Connect = ({ auth: { isAuthenticated, loading } }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user = {} } = useSelector((state) => state.auth);
  const { commentsList = [] } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  console.log({ user });
  console.log( commentsList );

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const fetchComments = () => {
    dispatch(getMessages());
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const deleteComment = async (id) => {
    console.log(id);
    await axios
      .delete(`${process.env.REACT_APP_API}/v1/api/comments/${id}`)
      .then((res) => console.log("comment deleted"))
      .catch((err) => console.log(err));
    dispatch(updateComments({ comment: { id }, isAddComment: false }));
  };

  const postComment = async (e) => {
    e.preventDefault();
    setComment("");
    const newComment = {
      comment: comment,
    };
    await axios
      .post(`${process.env.REACT_APP_API}/v1/api/comments`, newComment)
      .then((res) => console.log(res.data));

    console.log(comment);
    dispatch(updateComments({ comment: { comment }, isAddComment: true }));
  };

  console.log(comment);

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justifyContent='center'
      className={classes.container}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Title title={"chat with your community"} />{" "}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        direction='column'
        alignItems='center'
        justifyContent='center'
        flex
      >
        {isAuthenticated ? (
          <>
            <h1>Add Comment</h1>
            <form onSubmit={(e) => postComment(e)}>
              <TextField
                onChange={(e) => setComment(e.target.value)}
                className=''
                label='Comment'
                variant='outlined'
                color='success'
                fullWidth
                required
                value={comment}
              />

              <Button type='submit' variant='contained' color='success'>
                Post Comment
              </Button>
            </form>
          </>
        ) : (
          <>
            <Grid item sx={{ justifyContent: "center" }}>
              <div>Login to post something</div>
            </Grid>
          </>
        )}
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h1>comments section</h1>
      </Grid>
      <Grid item>
        {" "}
        {comments?.map((comment) => {
          return (
            <>
              <Card sx={{ minWidth: 275 }} key={comment?._id}>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    {comment?.comment}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    {comment?.user.username}
                  </Typography>
                </CardContent>{" "}
                {isAuthenticated && user?._id === comment?.user._id ? (
                  <CardActions>
                    <Button
                      type='submit'
                      value={comment?._id}
                      onClick={() => deleteComment(comment?._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                ) : null}
              </Card>
            </>
          );
        })}{" "}
      </Grid>
    </Grid>
  );
};

Connect.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Connect);
