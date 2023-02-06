import http from "./httpService";

const url = "http://localhost:5000";
const genresUrl = url + "/genres";

export function getGenresFromApi() {
    const response = http.get(genresUrl);
    return response;
}
