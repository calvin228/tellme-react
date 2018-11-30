import React from "react";

const Categories = props => {
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{props.label} :</label>
            </div>
            <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select
                                name={props.name}
                                onChange={props.onChange}
                            >
                                {props.options.map(option => {
                                    return (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;