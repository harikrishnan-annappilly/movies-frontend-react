import http from "./httpService";

const url = "http://localhost:5000";
const moviesUrl = url + "/movies";
const movieUrl = url + "/movie/";

export function getMoviesFromApi() {
    const response = http.get(moviesUrl);
    return response;
}

export function getMovieFromApi(movieId) {
    const response = http.get(movieUrl + movieId);
    return response;
}

export function deleteMovieFromApi(id) {
    const response = http.delete(movieUrl + id);
    return response;
}

export function saveMovieFromApi(movie) {
    const movieToSave = {
        title: movie.title,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
        liked: movie.liked,
        genreId: movie.genreId,
    };
    if (movie._id && movie._id !== "new") {
        const response = http.put(movieUrl + movie._id, movieToSave);
        return response;
    }
    const response = http.post(moviesUrl, movieToSave);
    return response;
}
