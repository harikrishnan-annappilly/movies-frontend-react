import React, { useState } from "react";
import Joi from "joi";

function LoginForm(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

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
                            onBlur={handleInputEnter}
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
                            onBlur={handleInputEnter}
                        />
                        {errors.password ? (
                            <div className="alert alert-danger">
                                {errors.password}
                            </div>
                        ) : null}
                    </div>
                    <button
                        className={
                            "btn btn-sm" +
                            (validateEntireForm()
                                ? " btn-danger"
                                : " btn-primary")
                        }
                        disabled={validateEntireForm()}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
