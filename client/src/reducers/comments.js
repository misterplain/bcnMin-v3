import {
  GET_MESSAGES_LOADING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  UPDATE_COMMENTS,
} from "../actions/types";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: payload.messages,
      };

    case GET_MESSAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };

    case UPDATE_COMMENTS:
      let commentState = { ...state };
      if (action.payload?.isAddComment) {
        commentState.messages = [
          ...commentState.messages,
          action.payload.comment,
        ];
        console.log("reducer accesed");
      } else {
        commentState.messages = commentState.messages?.filter(
          (comment) => comment.id !== action.payload.comment.id
        );
      }
      return commentState;

    default:
      return state;
  }
}
