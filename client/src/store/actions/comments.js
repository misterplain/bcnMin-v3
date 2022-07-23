import axios from "axios";
import * as actions from './types';

export default function (payload) {
    return {
        type: actions.DELETE_COMMENT,
        payload,
    }
}