import React from "react";

const InputField = props => {
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{props.label} :</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={props.name}
                            placeholder={props.placeholder}
                            onChange={props.onChange}
                            value={props.value}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputField;
