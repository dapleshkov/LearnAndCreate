import * as axios from "axios";
import user from "../States/Auth_Reducer";

export function login() {
    return axios.default.post('http://localhost:8080/api/auth/signin', user).then(response => {
        return response;
    }).catch(function (error) {
        console.error(error);
        return error.response;
    });
}


export function getCurrentUser() {
    return axios.default.get('http://localhost:8080/api/user/me', ).then(response => {
        return response;
    }).catch(function (error) {
        console.error(error);
        return error.response;
    });
}