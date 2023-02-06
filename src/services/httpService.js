import axios from "axios";

axios.interceptors.response.use(null, (error) => {
    if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    ) {
        console.log(
            "client error happaned, status code  " + error.response.status
        );
        return Promise.reject(error);
    }
    console.log("server error happaned - must be logged");
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
