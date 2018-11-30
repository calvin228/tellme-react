import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Password = props => {
    return (
        <div className="field">
            <p className="control has-icons-left">
                <input
                    name="password"
                    className="input is-medium"
                    type="password"
                    placeholder="Password"
                    onChange={props.handleFieldChange}
                />
                <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="lock" />
                </span>
            </p>
        </div>
    );
};

export default Password;
