import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Email = props => {
    return (
        <div className="field">
            <div className="control has-icons-left has-icons-right">
                <input
                    name="email"
                    className="input is-medium"
                    type="email"
                    placeholder="E-mail"
                    onChange={props.handleFieldChange}
                />
                <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="envelope" />
                </span>
                {/* <span className="icon is-small is-right">
    <i className="fas fa-exclamation-triangle" />
</span> */}
            </div>
        </div>
    );
};

export default Email;