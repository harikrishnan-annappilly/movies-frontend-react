import { useReducer } from "react";
import Joi from "joi";

// example usage
//const [formData, handleChange, isFormValid, submitDisabled] = useForms(user,schema);

// takes 2 arguments
// userForms(<data>, <validateSchema>)
// example
// const data = {name: "",age: "",};
// const schema = {name: Joi.string().required().min(3).label("Name")};

// returns
// 1) formData{inputs, errors}]
// 2) handleChange() - for checking the onChange on inputs - input name should match with formData
// 3) isFormValid() - check errors and enter into data.errors
// 4) submitDisabled() - helper function to disable a submitbutton if form is not valid

function setValues(state, action) {
    switch (action.type) {
        case "FORM":
            return {
                ...state,
                inputs: { ...state.inputs, ...action.inputs },
                errors: { ...state.errors, ...action.errors },
            };
        case "ERROR_FULL":
            return {
                ...state,
                errors: { ...action.data },
            };
        default:
            return state;
    }
}

function useForms(inputs = {}, schema = {}, errors = {}) {
    const initialValue = {
        inputs,
        schema,
        errors,
    };
    const [data, dispatch] = useReducer(setValues, initialValue);

    function handleChange(input) {
        const name = input.currentTarget.name;
        const value = input.currentTarget.value;
        const inputs = { [name]: value };
        const result = validateSingle(name, value);
        dispatch({
            type: "FORM",
            inputs: { ...inputs },
            errors: { [name]: result ? result[name] : null },
        });
    }

    function submitDisabled() {
        const formData = { ...data.inputs };
        const schema = data.schema;
        const options = {};

        const result = Joi.object(schema).validate(formData, options);

        return result.error ? true : false;
    }

    function isFormValid() {
        const formData = { ...data.inputs };
        const schema = data.schema;
        const options = { abortEarly: false };

        const result = Joi.object(schema).validate(formData, options);

        if (result.error) {
            const newErrors = {};
            result.error.details.map((err) => {
                const path = err.path[0];
                const message = err.message;
                newErrors[path] = message;
            });
            dispatch({ type: "ERROR_FULL", data: { ...newErrors } });
            return false;
        }
        dispatch({ type: "ERROR_FULL", data: {} });
        return true;
    }

    function validateSingle(name, value) {
        const singleSchema = { [name]: data.schema[name] };
        const formData = { [name]: value };
        const result = Joi.object(singleSchema).validate(formData);

        if (result.error) {
            const newErrors = {};
            result.error.details.map((err) => {
                const path = err.path[0];
                const message = err.message;
                newErrors[path] = message;
            });
            return newErrors;
        }
        return null;
    }

    return [
        { inputs: data.inputs, errors: data.errors },
        handleChange,
        isFormValid,
        submitDisabled,
    ];
}

export default useForms;
