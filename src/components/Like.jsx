import React from "react";

function Like(props) {
    const { liked, onLike } = props;
    const classes = liked
        ? "clickable fa fa-heart text-danger"
        : "clickable fa fa-heart-o";
    return <i className={classes} onClick={onLike} aria-hidden="true"></i>;
}

export default Like;
