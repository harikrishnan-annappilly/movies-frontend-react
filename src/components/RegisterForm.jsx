import React from "react";
import useForms from "./common/hooks/useForm";
import Joi from "joi";
import Input from "./common/Input";

function RegisterForm(props) {
    const user = {
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

    const [formData, handleChange, validateForm, isFormValid] = useForms(
        user,
        schema
    );

    function handleFormSubmit(form) {
        form.preventDefault();
        if (!validateForm()) return false;
        console.log(formData);
        console.log("form submitted");
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
                                error={
                                    formData.errors.username
                                        ? formData.errors.username
                                        : null
                                }
                                value={formData.inputs.username}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                name={"password"}
                                label={"Password"}
                                type="password"
                                onChange={handleChange}
                                error={
                                    formData.errors.password
                                        ? formData.errors.password
                                        : null
                                }
                                value={formData.inputs.password}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                name={"contact"}
                                label={"Contact"}
                                type="contact"
                                onChange={handleChange}
                                error={
                                    formData.errors.contact
                                        ? formData.errors.contact
                                        : null
                                }
                                value={formData.inputs.contact}
                            />
                        </div>
                        <button
                            className={
                                "btn btn-sm" +
                                (isFormValid() ? " btn-danger" : " btn-success")
                            }
                            disabled={isFormValid()}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
