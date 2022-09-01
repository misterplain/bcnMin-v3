import axios from "axios";
import * as actions from '../constants/commentsConstants';

export const deleteComment = (payload) => {
    return {
        type: actions.DELETE_COMMENT,
        payload,
    }
}