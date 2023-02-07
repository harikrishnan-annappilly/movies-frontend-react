import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("entered logout page");
        localStorage.removeItem("token");
        window.location = "/";
    });
    return <div>Logout Page</div>;
}

export default Logout;
