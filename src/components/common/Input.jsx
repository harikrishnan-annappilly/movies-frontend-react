import React from "react";

function Input(props) {
    const { name, label, type = "text", onChange, error, value = "" } = props;

    return (
        <div>
            <label className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                name={name}
                onChange={onChange}
                onBlur={onChange}
                value={value}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;
