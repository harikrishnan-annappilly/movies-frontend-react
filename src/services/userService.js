import http from "./httpService";

const baseUrl = "http://localhost:5000";
const userUrl = baseUrl + "/users";

export function registerUser(user) {
    const userObject = { username: user.username, password: user.password };
    return http.post(userUrl, userObject);
}
