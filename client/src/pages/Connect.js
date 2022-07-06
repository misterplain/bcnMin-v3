import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
//redux and responsive buttons if logged in
import { connect } from "react-redux";
import PropTypes from "prop-types";




const Connect = ({auth:{isAuthenticated, user}}) => {
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
      .then((res) => console.log("comment deleted"))
      .catch((err) => console.log(err));
    fetchComments();
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
    fetchComments();
  };

  return (
    <Container>
      <h1>Connect</h1>
      {isAuthenticated ? (     <> <h1>Add Comment</h1>
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
      </form></>) : <h1>Login to post something</h1>}

      <h1>comments section</h1>
      {comments.map((comment) => {
        return (
          <>
            <div key={comment._id}>
              <h3>{comment.comment}</h3>{" "}

              <h3>{comment.username}</h3>
            
              <h3>{isAuthenticated.username}</h3>
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

Connect.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Connect);
