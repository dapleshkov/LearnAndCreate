import {request} from "./request.js"
import {ACCESS_TOKEN, API_BASE_URL} from "./utils";

export function getCoursesOfUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/courses/me",
        method: 'GET'
    });
}

export function getRandomCourses() {

    return request({
        url: API_BASE_URL + "/courses",
        method: 'GET'
    });
}
export function getCourseById(courseId) {
    return request({
        url: API_BASE_URL + "/course" +courseId,
        method: 'GET',
    });
}