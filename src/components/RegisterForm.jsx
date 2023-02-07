import React, { useState } from "react";
import useForms from "./common/hooks/useForm";
import Joi from "joi";
import Input from "./common/Input";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

function RegisterForm(props) {
    const initialUser = {
        username: "",
        password: "",
        contact: "",
    };

    const schema = {
        username: Joi.string().required().min(3).label("Username"),
        password: Joi.string().required().min(3).label("Password"),
        contact: Joi.number()
            .integer()
            .greater(100)
            .less(9999)
            .label("Contact"),
    };

    const [user, setUser] = useState(initialUser);
    const [errors, setErrors] = useState({});
    const [isSubmitValid, setIsSubmitValid] = useState(true);
    const [submitValue, setSubmitValue] = useState("Register");
    const navigate = useNavigate();

    async function handleFormSubmit(form) {
        form.preventDefault();
        console.log(user);
        const result = validateForm();
        if (result) {
            setErrors(result);
            return;
        } else {
            setIsSubmitValid(false);
            setSubmitValue("Saving...");
        }
        setErrors({});
        console.log("form is valid");
        await registerUser(user);
        setIsSubmitValid(true);
        setSubmitValue("Register");
        setUser(initialUser);
        navigate("/login", { replace: true });
    }

    function handleChange(input) {
        const name = input.currentTarget.name;
        const value = input.currentTarget.value;
        setUser({ ...user, [name]: value });
    }

    function validateForm() {
        const option = { abortEarly: false };
        const result = Joi.object(schema).validate(user, option);
        if (result.error) {
            const { details } = result.error;
            const cloneErrors = {};
            details.map((error) => {
                const path = error.path[0];
                const message = error.message;
                cloneErrors[path] = message;
            });
            return cloneErrors;
        }
        return null;
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h2>Register Form</h2>
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
                                onChange={handleChange}
                                error={errors.username ? errors.username : null}
                                value={user.username}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                name={"password"}
                                label={"Password"}
                                type="password"
                                onChange={handleChange}
                                error={errors.password ? errors.password : null}
                                value={user.password}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                name={"contact"}
                                label={"Contact"}
                                type="contact"
                                onChange={handleChange}
                                error={errors.contact ? errors.contact : null}
                                value={user.contact}
                            />
                        </div>
                        <button
                            className={
                                "btn btn-sm" +
                                (isSubmitValid ? " btn-danger" : " btn-success")
                            }
                            disabled={!isSubmitValid}
                        >
                            {submitValue}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
