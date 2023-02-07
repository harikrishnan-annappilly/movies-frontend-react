import React, { useState } from "react";
import Joi from "joi";
import Input from "./common/Input";
import { loginUserFromApi } from "../services/authService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function LoginForm(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const location = useLocation();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState({ enabled: true, value: "Login" });

    const schema = {
        username: Joi.string().required().min(3).label("Username"),
        password: Joi.string().required().min(3).label("Password"),
    };

    function validateEntireForm() {
        const options = { abortEarly: false };
        const results = Joi.object(schema).validate(user, options);
        return results.error ? results : null;
    }

    function validateSingleInput(input) {
        const inputName = input.currentTarget.name;
        const inputValue = input.currentTarget.value;
        const singleSchema = { [inputName]: schema[inputName] };
        const userObject = { [inputName]: inputValue };
        const results = Joi.object(singleSchema).validate(userObject);
        return results.error ? results : null;
    }

    function handleFormSubmit(form) {
        form.preventDefault();
        const results = validateEntireForm();
        const cloneErrors = {};
        let hasErrors = false;
        if (results) {
            hasErrors = true;
            results.error.details.map((error) => {
                const message = error.message;
                const path = error.path[0];
                cloneErrors[path] = message;
            });
        }
        setErrors(cloneErrors);
        if (hasErrors) return;

        console.log("no error - submit() form");
        console.log("user{} = ", user);
        tryLogin();
    }

    async function tryLogin() {
        console.log("Login in...");
        setSubmit({ ...submit, enabled: false, value: "Loading..." });
        try {
            const { data: response } = await loginUserFromApi(
                user.username,
                user.password
            );
            localStorage.setItem("token", response.access_toke);
            console.log("Login Success");
            setSubmit({ ...submit, enabled: true, value: "Success" });
            window.location = location.state?.setLocation || "/movies";
        } catch (ex) {
            localStorage.removeItem("token");
            console.log("Login Failed");
            setSubmit({ ...submit, enabled: true, value: "Login" });
        }
    }

    function handleInputEnter(input) {
        const cloneUser = { ...user };
        cloneUser[input.currentTarget.name] = input.currentTarget.value;

        const results = validateSingleInput(input);
        const cloneErrors = { ...errors };
        let hasErrors = false;
        if (results) {
            hasErrors = true;
            results.error.details.map((error) => {
                const message = error.message;
                const path = error.path[0];
                cloneErrors[path] = message;
            });
        } else {
            delete cloneErrors[input.currentTarget.name];
        }
        setErrors(cloneErrors);

        setUser(cloneUser);
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h2>Login Form</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <form autoComplete="off" onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <Input
                                name={"username"}
                                label={"Username"}
                                type="text"
                                onChange={handleInputEnter}
                                error={errors.username ? errors.username : null}
                                value={user.username}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                name={"password"}
                                label={"Password"}
                                type="password"
                                onChange={handleInputEnter}
                                error={errors.password ? errors.password : null}
                                value={user.password}
                            />
                        </div>
                        <button
                            className={
                                "btn btn-sm" +
                                (validateEntireForm()
                                    ? " btn-danger"
                                    : " btn-primary")
                            }
                            disabled={validateEntireForm() || !submit.enabled}
                        >
                            {submit.value}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
