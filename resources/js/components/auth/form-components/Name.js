import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Name = props => {
    return (
        <div className="field">
            <div className="control has-icons-left has-icons-right">
                <input
                    name="name"
                    className="input is-medium"
                    type="text"
                    placeholder="Name"
                    onChange={props.handleFieldChange}
                />
                <span className="icon is-small is-left">
                    <FontAwesomeIcon icon="user" />
                </span>
                {/* <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle" />
                    </span> */}
            </div>
        </div>
    );
};

export default Name;