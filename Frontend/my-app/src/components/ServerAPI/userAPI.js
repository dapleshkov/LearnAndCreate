import {ACCESS_TOKEN, API_BASE_URL} from "./utils";
import {request} from "./request.js"

export function login(user) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export function singUp(user) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}


export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function editPassword(Password) {
    debugger;
    return request({
        url: API_BASE_URL + "/user/me/edit/password",
        method: 'PUT',
        body: JSON.stringify(Password)
    });
}

export function editUsername(username) {
    return request({
        url: API_BASE_URL + "/user/me/edit/username?username=" + username,
        method: 'PUT',
        username: JSON.stringify(username)
    });
}

export function editName(name) {
    return request({
        url: API_BASE_URL + "/user/me/edit/name?name=" + name,
        method: 'PUT',
        name: JSON.stringify(name)
    });
}

export function subscribe(courseId) {
    return request({
        url: API_BASE_URL + "/course/" + courseId,
        method: 'POST'
    });
}