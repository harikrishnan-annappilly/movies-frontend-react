import Joi from "joi";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useForms from "./common/hooks/useForm";
import { useNavigate } from "react-router-dom";

import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Input from "./common/Input";

function MovieForm(props) {
    const params = useParams();
    const movieId = params.id;

    const schema = {
        _id: Joi.string().required().label("_id"),
        title: Joi.string().required().min(3).label("Movie Name"),
        genreId: Joi.string().required().label("Genre ID"),
        dailyRentalRate: Joi.number().label("Rate"),
        numberInStock: Joi.number().integer().label("Stock"),
    };

    const navigate = useNavigate();
    const movie = populateMovie(movieId);

    const genres = getGenres().map((genre) => ({
        value: genre._id,
        label: genre.name,
    }));

    function populateMovie(movieId) {
        if (movieId === "new")
            return {
                _id: movieId,
                title: "",
                genreId: "",
                dailyRentalRate: "",
                numberInStock: "",
            };
        const movieInDb = getMovie(movieId);
        if (movieInDb) {
            return {
                _id: movieInDb._id,
                title: movieInDb.title,
                genreId: movieInDb.genre._id,
                dailyRentalRate: movieInDb.dailyRentalRate,
                numberInStock: movieInDb.numberInStock,
            };
        }
        return false;
    }

    useEffect(() => {
        if (!movie) navigate("/movies", { replace: true });
    }, [movie]);

    const [formData, handleChange, checkErrors, isFormValid] = useForms(
        movie,
        schema
    );

    function handleFormSubmit(form) {
        form.preventDefault();
        if (!checkErrors()) return;
        const movie = formData.inputs;
        saveMovie(movie);
        console.log("movie form submited");
    }

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
                                onChange={handleChange}
                                error={
                                    formData.errors.title
                                        ? formData.errors.title
                                        : null
                                }
                                value={formData.inputs.title}
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={formData.inputs.genreId}
                                onChange={handleChange}
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
                            {formData.errors.genreId && (
                                <div className="alert alert-danger">
                                    {formData.errors.genreId}
                                </div>
                            )}
                        </div>
                        <div className="row">
                            <div className="col mb-3">
                                <Input
                                    name={"dailyRentalRate"}
                                    label={"Rate"}
                                    type="text"
                                    onChange={handleChange}
                                    error={
                                        formData.errors.dailyRentalRate
                                            ? formData.errors.dailyRentalRate
                                            : null
                                    }
                                    value={formData.inputs.dailyRentalRate}
                                />
                            </div>
                            <div className="col mb-3">
                                <Input
                                    name={"numberInStock"}
                                    label={"Stock"}
                                    type="text"
                                    onChange={handleChange}
                                    error={
                                        formData.errors.numberInStock
                                            ? formData.errors.numberInStock
                                            : null
                                    }
                                    value={formData.inputs.numberInStock}
                                />
                            </div>
                        </div>
                        <button
                            className={
                                "btn btn-sm" +
                                (isFormValid() ? " btn-danger" : " btn-success")
                            }
                            disabled={isFormValid()}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MovieForm;
