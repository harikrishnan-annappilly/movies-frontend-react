import React, { useState } from "react";
import Like from "./Like";
import { getMovies } from "../services/fakeMovieService";

function Movies(props) {
    const [movies, setMovies] = useState(getMovies());

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

    return (
        <div>
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
                    {movies.map((movie) => (
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
        </div>
    );
}

export default Movies;
