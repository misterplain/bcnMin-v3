import * as actions from "../actions/commentsActions";

export const  commentsReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_COMMENTS:
      return { ...state, comments: action.payload };
    case actions.ADD_COMMENT:
      return { ...state, comments: [action.payload, ...state.comments, ] };
    case actions.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    default:
      return state;
  }
}
