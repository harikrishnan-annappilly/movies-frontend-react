import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    getMovieFromApi,
    saveMovieFromApi,
    getMoviesFromApi,
} from "../services/movieService";
import { getGenresFromApi } from "../services/genreService";
import Input from "./common/Input";

function MovieForm(props) {
    const params = useParams();
    const movieId = params.id;
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [errors, setErrors] = useState({});
    const [genres, setGenres] = useState([]);
    const [saving, setSaving] = useState(false);
    const [stillErors, setStillErors] = useState(false);

    const schema = {
        _id: Joi.string().required().label("_id"),
        title: Joi.string().required().min(3).label("Movie Name"),
        genreId: Joi.number().required().label("Genre ID"),
        dailyRentalRate: Joi.number().label("Rate"),
        numberInStock: Joi.number().integer().label("Stock"),
        liked: Joi.boolean().required(),
    };

    useEffect(() => {
        populateGenres();
        populateMovie(movieId);
    }, []);

    useEffect(() => {
        if (!movie) navigate("/movies", { replace: true });
    }, [movie]);

    async function populateMovie(movieId) {
        if (movieId === "new")
            return setMovie({
                _id: movieId,
                title: "",
                genreId: "",
                dailyRentalRate: "",
                numberInStock: "",
                liked: false,
            });
        try {
            const { data: movieInDb } = await getMovieFromApi(movieId);
            if (movieInDb) {
                return setMovie({
                    _id: movieInDb._id.toString(),
                    title: movieInDb.title,
                    genreId: movieInDb.genre._id,
                    dailyRentalRate: movieInDb.dailyRentalRate,
                    numberInStock: movieInDb.numberInStock,
                    liked: movieInDb.liked,
                });
            }
        } catch (error) {
            console.log("movie not found");
            return setMovie(false);
        }
    }

    async function populateGenres() {
        const { data: genres } = await getGenresFromApi();
        const mappedGenres = genres.map((genre) => ({
            value: genre._id,
            label: genre.name,
        }));
        setGenres(mappedGenres);
    }

    async function handleFormSubmit(form) {
        form.preventDefault();
        const errors = getErrors();
        if (errors) return setErrors(errors);
        setSaving(true);
        await saveMovieFromApi(movie);
        navigate("/movies", { replace: true });
    }

    function handleChangeInForm(input) {
        const name = input.currentTarget.name;
        const value = input.currentTarget.value;
        const newObject = { [name]: value };
        const newMovie = { ...movie, ...newObject };
        const newSchema = { [name]: schema[name] };
        const result = Joi.object(newSchema).validate(newObject);
        const cloneErrors = { ...errors };
        if (result.error) {
            const { details } = result.error;
            details.map((error) => {
                const path = error.path[0];
                const message = error.message;
                cloneErrors[path] = message;
            });
        } else {
            delete cloneErrors[name];
        }
        setMovie(newMovie);
        setErrors(cloneErrors);
        checkOnDb(value, name);
    }

    async function checkOnDb(value, name) {
        const { data: moviesFromApi } = await getMoviesFromApi();

        const checkedMovies = moviesFromApi.filter(
            (m) => m.title.toLowerCase() === value.toLowerCase()
        );
        const movieFound = checkedMovies.length;

        if (movieFound) {
            const movieNotSame =
                checkedMovies[0]._id.toString() !== movie._id.toString();

            if (movieNotSame) {
                const message = "movie name " + value + " already taken";
                const path = name;
                setStillErors(true);
                setErrors({ [path]: message });
                return;
            }
        }
        setStillErors(false);
    }

    function getErrors() {
        const option = { abortEarly: false };
        const result = Joi.object(schema).validate(movie, option);
        if (result.error) {
            const { details } = result.error;
            const cloneErrors = {};
            details.map((error) => {
                const path = error.path[0];
                const message = error.message;
                cloneErrors[path] = message;
            });
            return cloneErrors;
        }
        return null;
    }

    console.log(stillErors);

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h2>Movie Form</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <form autoComplete="off" onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <Input
                                name={"title"}
                                label={"Movie Name"}
                                type="text"
                                onChange={handleChangeInForm}
                                error={errors?.title}
                                value={movie.title}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Genre</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={movie.genreId}
                                onChange={handleChangeInForm}
                                name="genreId"
                            >
                                <option value={""}>
                                    Open this select menu
                                </option>
                                {genres.map((genre) => (
                                    <option
                                        key={genre.value}
                                        value={genre.value}
                                    >
                                        {genre.label}
                                    </option>
                                ))}
                            </select>
                            {errors.genreId && (
                                <div className="alert alert-danger">
                                    {errors?.genreId}
                                </div>
                            )}
                        </div>
                        <div className="row">
                            <div className="col mb-3">
                                <Input
                                    name={"dailyRentalRate"}
                                    label={"Rate"}
                                    type="text"
                                    onChange={handleChangeInForm}
                                    error={errors?.dailyRentalRate}
                                    value={movie.dailyRentalRate}
                                />
                            </div>
                            <div className="col mb-3">
                                <Input
                                    name={"numberInStock"}
                                    label={"Stock"}
                                    type="text"
                                    onChange={handleChangeInForm}
                                    error={errors?.numberInStock}
                                    value={movie.numberInStock}
                                />
                            </div>
                        </div>
                        <button
                            className={
                                "btn btn-sm" +
                                (getErrors()
                                    ? " btn-danger"
                                    : saving
                                    ? " btn-warning"
                                    : " btn-success")
                            }
                            disabled={getErrors() || stillErors || saving}
                        >
                            Register{" "}
                            {saving ? (
                                <div
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                >
                                    <span className="sr-only">S...</span>
                                </div>
                            ) : null}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MovieForm;
