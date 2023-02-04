import React from "react";
import { useParams } from "react-router-dom";

function MovieForm(props) {
    const params = useParams();
    return <div>Movie Form id={params.id}</div>;
}

export default MovieForm;
