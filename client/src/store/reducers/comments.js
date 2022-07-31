import * as actions from "../actions/types";

const initialState = {
  comments: [],
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_COMMENTS:
      return { ...state, comments: action.payload };
    case actions.ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
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
