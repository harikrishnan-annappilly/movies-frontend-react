import http from "./httpService";
import jwtDecode from "jwt-decode";

const baseUrl = "http://localhost:5000";
const loginUrl = baseUrl + "/login";

export function loginUserFromApi(username, password) {
    const userObject = { username, password };
    return http.post(loginUrl, userObject);
}

export function isLoggedIn() {
    return localStorage.getItem("token") !== null ? true : false;
}

export function getLoggedUserData() {
    const jwt = localStorage.getItem("token");
    const decode = jwtDecode(jwt);
    return decode;
}
