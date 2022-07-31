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
import axios from "axios";
//redux and responsive buttons if logged in
import PropTypes from "prop-types";
import Title from "../../ui/Title";
import { makeStyles } from "@material-ui/core/styles";
//redux
import { loadUser } from "../../store/actions/auth.js";
import { connect, useSelector, useDispatch } from "react-redux";
import deleteCommentAction from "../../store/actions/comments";
import { StylesContext } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  container: {
    border: "1px solid black",
  },
});

const Connect = ({ auth: { isAuthenticated, loading } }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const { user = {} } = useSelector((state) => state.auth);
  const commentsList = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/v1/api/comments`
      );
      console.log(response.data);
      dispatch({ type: "FETCH_COMMENTS", payload: response.data });
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteComment = async (id) => {
    console.log(id);
    await axios
      .delete(`${process.env.REACT_APP_API}/v1/api/comments/${id}`)
      .then((res) => console.log("comment deleted" + res.data))
      .catch((err) => console.log(err));
    dispatch({ type: "DELETE_COMMENT", payload: id });
  };

  const postComment = async (e) => {
    e.preventDefault();
    setComment("");
    const newComment = {
      comment: comment,
      username: user.username,
    };
    await axios
      .post(`${process.env.REACT_APP_API}/v1/api/comments`, newComment)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    fetchComments();
  };

  return (
    <div className={classes.root}>
      <Grid container maxWidth='md' className={classes.container}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
          <Title title={"chat with your community"} />{" "}
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
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
              <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
                <div>Login to post something</div>
              </Grid>
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
          <h1>comments section</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
          {commentsList?.comments.map((comment) => {
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
          })}
        </Grid>
      </Grid>
    </div>
  );
};

// Connect.propTypes = {
//   auth: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Connect);
