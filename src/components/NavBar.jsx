import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        Home
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav">
                            <NavLink
                                className="nav-link active"
                                aria-current="page"
                                to="/movies"
                            >
                                Movies
                            </NavLink>
                            <NavLink className="nav-link" to="/movies/new">
                                New
                            </NavLink>
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
