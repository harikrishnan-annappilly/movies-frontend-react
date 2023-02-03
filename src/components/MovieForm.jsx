import React from "react";

function MovieForm(props) {
    function handleSubmit(form) {
        form.preventDefault();
    }

    return (
        <div className="row">
            <div class="mb-3 col-6">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label htmlFor="movie_name" class="col-form-label">
                        Movie Name
                    </label>
                    <div class="">
                        <input
                            type="text"
                            class="form-control"
                            id="movie_name"
                        />
                    </div>
                    <div className="row">
                        <div class="mb-3 col-6">
                            <label htmlFor="movie_name" class="col-form-label">
                                Rent
                            </label>
                            <div class="">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="movie_name"
                                />
                            </div>
                        </div>
                        <div class="mb-3 col-6">
                            <label htmlFor="movie_name" class="col-form-label">
                                Stock
                            </label>
                            <div class="">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="movie_name"
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm mb-3">
                        Add Movie
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MovieForm;
