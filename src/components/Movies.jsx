import React, { useState } from "react";
import Like from "./common/Like";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginate from "./common/Paginate";
import _ from "lodash";
import ListGroup from "./common/ListGroup";

function Movies(props) {
    const defaultGenre = { _id: "", name: "All" };
    const [movies, setMovies] = useState(getMovies());
    const [genres] = useState([defaultGenre, ...getGenres()]);
    const [selectedGenre, setSelectedGenre] = useState(defaultGenre);
    const [pageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    function handleLike(movie) {
        const newMovies = [...movies];
        const movieIndex = newMovies.indexOf(movie);
        newMovies[movieIndex] = { ...newMovies[movieIndex] };
        newMovies[movieIndex].liked = !newMovies[movieIndex].liked;
        setMovies(newMovies);
    }

    function handleDelete(movie) {
        const newMovies = [...movies].filter((m) => m._id !== movie._id);
        setMovies(newMovies);
    }

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    function handleGenreChange(genre) {
        setSelectedGenre(genre);
    }

    function getMoviesFromSelectedGenre(movies, genre) {
        if (genre._id === defaultGenre._id) return movies;
        const moviesWithSelectedGenre = movies.filter(
            (movie) => movie.genre._id === genre._id
        );
        return moviesWithSelectedGenre;
    }

    function getMoviesToRender(movies) {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize;
        const moviesToRender = _.slice(movies, startIndex, endIndex);
        if (moviesToRender.length === 0 && currentPage > 0)
            setCurrentPage(currentPage - 1);
        return moviesToRender;
    }

    const filteredMovies = getMoviesFromSelectedGenre(movies, selectedGenre);

    const moviesToRender = getMoviesToRender(filteredMovies);

    return (
        <div className="row">
            <div className="col-3">
                <ListGroup
                    items={genres}
                    selectedItem={selectedGenre}
                    onChange={handleGenreChange}
                />
            </div>
            <div className="col">
                <div>
                    There are total{" "}
                    <span className="badge bg-primary">
                        {filteredMovies.length}
                    </span>{" "}
                    movie(s) in the list
                </div>
                <table className="table table-hover">
                    <thead className=" user-select-none">
                        <tr>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rent per Day</th>
                            <th>Like</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesToRender.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onLike={() => handleLike(movie)}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(movie)}
                                    >
                                        <i
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginate
                    totalItems={filteredMovies.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default Movies;
