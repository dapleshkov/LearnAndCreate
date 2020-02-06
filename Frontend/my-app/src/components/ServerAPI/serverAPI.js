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

export function getCurrentUser() {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem("accessToken")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("accessToken"))
    }

    const defaults = {headers: headers};

    return axios.default.get('http://localhost:8080/api/user/me', defaults).then(response => {
        console.log(response.data);
    })
}