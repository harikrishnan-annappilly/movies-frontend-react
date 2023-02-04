import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import Movies from "./components/Movies";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";

function App() {
    return (
        <div>
            <NavBar />
            <div className="container mt-3">
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<MovieForm />} />
                    <Route
                        path="/"
                        element={<Navigate replace={true} to="/movies" />}
                    />
                    <Route path="*" element={<NotFound to={"/"} />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
