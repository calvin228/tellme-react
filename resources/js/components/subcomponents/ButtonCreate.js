import React from "react";

const ButtonCreate = props => {
    return (
        <div className="field is-grouped is-grouped-right">
            <p className="control">
                <button
                    type="submit"
                    disabled={props.isLoading}
                    className={`button ${props.color} ${
                        props.isLoading ? "is-loading" : ""
                    }`}
                >
                    {props.name}
                </button>
            </p>
        </div>
    );
};

export default ButtonCreate;