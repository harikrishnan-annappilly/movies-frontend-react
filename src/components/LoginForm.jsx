import React, { useState } from "react";
import Joi from "joi";

function LoginForm(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    });

    function validateEntireForm() {
        const options = { abortEarly: false };
        const results = schema.validate(user, options);
        return results;
    }

    function handleFormSubmit(form) {
        form.preventDefault();
        const results = validateEntireForm();
        if (results.error) {
            const cloneErrors = {};
            results.error.details.map((error) => {
                const message = error.message;
                const path = error.path[0];
                cloneErrors[path] = message;
            });
            setErrors(cloneErrors);
            return;
        }
        setErrors({});

        console.log("no error - submit() form");
    }

    function handleInputEnter(input) {
        const cloneUser = { ...user };
        cloneUser[input.currentTarget.name] = input.currentTarget.value;
        setUser(cloneUser);
    }

    return (
        <div className="row">
            <h2>Login Form</h2>
            <div className="col-6">
                <form autoComplete="off" onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={handleInputEnter}
                        />
                        {errors.username ? (
                            <div className="alert alert-danger">
                                {errors.username}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            name="password"
                            onChange={handleInputEnter}
                        />
                        {errors.password ? (
                            <div className="alert alert-danger">
                                {errors.password}
                            </div>
                        ) : null}
                    </div>
                    <button className="btn btn-primary btn-sm">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
