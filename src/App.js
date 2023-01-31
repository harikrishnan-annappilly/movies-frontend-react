import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import Movies from "./components/Movies";

function App() {
    return (
        <div className="container mt-2">
            <Movies />
        </div>
    );
}

export default App;
