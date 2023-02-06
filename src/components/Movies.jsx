import React, { useEffect, useState } from "react";
import Like from "./common/Like";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginate from "./common/Paginate";
import _ from "lodash";
import ListGroup from "./common/ListGroup";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";
import { NavLink, Link } from "react-router-dom";

function Movies(props) {
    const defaultGenre = { _id: "", name: "All" };
    const defaultSortColumn = { path: "title", order: "asc" };
    const [movies, setMovies] = useState(getMovies());
    const [genres] = useState([defaultGenre, ...getGenres()]);
    const [selectedGenre, setSelectedGenre] = useState(defaultGenre);
    const [pageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSortColumn, setCurrentSortColumn] =
        useState(defaultSortColumn);
    const [searchQuery, setSearchQuery] = useState("");
    const [columns, setColumn] = useState([
        {
            path: "title",
            label: "Title",
            content: (movie) => {
                return (
                    <NavLink to={"/movies/" + movie._id}>{movie.title}</NavLink>
                );
            },
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            label: "Like",
            content: (movie) => (
                <Like liked={movie.liked} onLike={() => handleLike(movie)} />
            ),
        },
        {
            key: "delete",
            label: "Delete",
            content: (movie) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(movie)}
                >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            ),
        },
    ]);

    function handleLike(movie) {
        setMovies((movies) => {
            const newMovies = [...movies];
            const movieIndex = newMovies.indexOf(movie);
            newMovies[movieIndex] = { ...newMovies[movieIndex] };
            newMovies[movieIndex].liked = !newMovies[movieIndex].liked;
            return newMovies;
        });
    }

    function handleDelete(movie) {
        setMovies((movies) => {
            const newMovies = [...movies].filter((m) => m._id !== movie._id);
            return newMovies;
        });
    }

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    function handleGenreChange(genre) {
        setCurrentPage(1);
        setSearchQuery("");
        setSelectedGenre(genre);
    }

    function handleSortClick(column) {
        const newSortColumn = { ...currentSortColumn };
        if (newSortColumn.path === column.path) {
            newSortColumn.order =
                newSortColumn.order === "asc" ? "desc" : "asc";
        } else {
            newSortColumn.path = column.path;
            newSortColumn.order = "asc";
        }
        setCurrentSortColumn(newSortColumn);
    }

    function handleSearch(e) {
        setCurrentPage(1);
        setSelectedGenre(defaultGenre);
        setSearchQuery(e.currentTarget.value);
    }

    function getMoviesFromSelectedGenre(movies, genre) {
        if (searchQuery) {
            return movies.filter((m) =>
                m.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
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

    function getSortedMovies(movies, sortColumn) {
        return _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
    }

    const filteredMovies = getMoviesFromSelectedGenre(movies, selectedGenre);
    const sortedMovies = getSortedMovies(filteredMovies, currentSortColumn);
    const totalMoviesCount = filteredMovies.length;

    const moviesToRender = getMoviesToRender(sortedMovies);

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
                    <span className="badge bg-primary mb-3">
                        {totalMoviesCount}
                    </span>{" "}
                    movie(s) in the list
                </div>
                <div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    onChange={handleSearch}
                                    onFocus={handleSearch}
                                />
                            </div>
                            <div className="col-3">
                                <Link
                                    className="btn btn-primary btn-sm"
                                    to={"/movies/new"}
                                >
                                    Add Movie
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table table-hover">
                    <TableHeader
                        columns={columns}
                        currentSortColumn={currentSortColumn}
                        onSortClick={handleSortClick}
                    />
                    <TableBody
                        data={moviesToRender}
                        columns={columns}
                        onLike={handleLike}
                        onDelete={handleDelete}
                    />
                </table>
                <Paginate
                    totalItems={totalMoviesCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default Movies;
