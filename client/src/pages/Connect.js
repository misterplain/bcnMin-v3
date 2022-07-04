import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";

const Connect = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    axios
      .get(`${process.env.REACT_APP_API}/v1/api/comments`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        alert("Error in fetching Comments Info", error);
      });
  };

  const deleteComment = async (id) => {
    console.log(id);
    await axios
      .delete(`${process.env.REACT_APP_API}/v1/api/comments/${id}`)
      .then((res) => setComments(...comments, res.data))
      .catch((err) => console.log(err));
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
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Container>
      <h1>Connect</h1>
      <h1>Add Comment</h1>
      <form onSubmit={(e) => postComment(e)}>
        <TextField
          onChange={(e) => setComment(e.target.value)}
          className=''
          label='Comment'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          value={comment}
        />

        <Button type='submit' variant='contained' color='secondary'>
          Post Comment
        </Button>
      </form>
      <h1>comments section</h1>
      {comments.map((comment) => {
        return (
          <>
            <div key={comment._id}>
              <h3>{comment.comment}</h3>{" "}
              <Button
                type='submit'
                value={comment._id}
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </Button>
            </div>
          </>
        );
      })}
    </Container>
  );
};

export default Connect;
