import axios from "axios";

//add global header using axios
const setAuthToken = (token) => {
    if (token) {
        //apply to every request
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        //delete auth header
        delete axios.defaults.headers.common["x-auth-token"];
    }
}


export default setAuthToken