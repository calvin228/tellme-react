import React from "react";

const RememberMe = props => {
    return (
        <div className="field">
            <label className="checkbox">
                <input
                    type="checkbox"
                    name="remember_me"
                    defaultChecked={props.value}
                    onChange={props.handleFieldChange}
                />
                Remember me
            </label>
        </div>
    );
};

export default RememberMe