import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [
];

export default function (state = initialState, action) {
    //desctructure the action.type and action.payload
  const { type, payload } = action;
  switch (type) {
    case "SET_ALERT":
      //add a new alert to the initialState
      return [...state, payload];
    case "REMOVE_ALERT":
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
