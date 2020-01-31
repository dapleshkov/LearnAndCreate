import * as axios from "axios";

export function login(user) {
    axios.default.post('http://localhost:8080/api/auth/signin', user).then(response => {
        if (response.status === 200) {
            return 'cool';
        } else {
            if (response.status === 401) {
                return '401'
            } else {
                return 'other'
            }
        }
    });

}