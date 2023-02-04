import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        Home
                    </NavLink>
                    <div className="navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/movies"
                            >
                                Movies
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
