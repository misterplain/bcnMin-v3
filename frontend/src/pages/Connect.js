import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Grid
} from "@material-ui/core";
import axios from "axios";
//redux and responsive buttons if logged in
import Title from "../components/Title";
import { makeStyles } from "@material-ui/core/styles";
//redux
import { loadUser } from "../actions/userActions.js";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  commentForm: {
    width: "90%",
    marginTop: "10px",
    textAlign: "center",
  },
  commentButton: {
    marginRight: "10px",
  },
  commentList: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    flexBasis: "auto",
  },
  comment: {
    borderRadius: "20px",
    margin: "10px",
  },
  username: {
    color: "purple",
  },
  commentText: {
    marginBottom: "0px",
    fontSize: "1.7rem",
  },
});

const Connect = () => {
  const styles = useStyles();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const commentsList = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const {loading, isAuthenticated} = user;

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
    <div className={styles.root}>
      <Grid
        container
        xs={12}
        sm={11}
        md={10}
        maxWidth='md'
        className={styles.container}
      >
        <Grid item xs={12}>
          <Title title={"chat with your community"} />
        </Grid>
        <Grid item className={styles.commentForm}>
          {isAuthenticated ? (
            <>
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

                <Button
                  type='submit'
                  variant='contained'
                  color='success'
                  className={styles.commentButton}
                >
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
        <Grid item className={styles.commentList}>
          {commentsList?.comments.map((comment) => {
            return (
              <>
                <Card
                  sx={{ minWidth: 275, transform: "scale(0.1)", mx: "15px" }}
                  key={comment?._id}
                  className={styles.comment}
                >
                  <CardContent>
                    {" "}
                    <Typography className={styles.username}>
                      {comment?.user.username} says...
                    </Typography>
                    <Typography className={styles.commentText}>
                      {comment?.comment}
                    </Typography>
                    <Button
                        type='submit'
                        value={comment?._id}
                        // onClick={() => deleteComment(comment?._id)}
                      >
                        Reply
                      </Button>
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
                      <Button
                        type='submit'
                        value={comment?._id}
                        // onClick={() => deleteComment(comment?._id)}
                      >
                        Edit
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

export default Connect
