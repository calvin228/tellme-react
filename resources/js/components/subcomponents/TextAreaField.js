import React from "react";

const TextAreaField = props => {
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{props.label} :</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        {/* <div className="editor-wrap">
                                <Editor
                                    
                                    editorState={
                                        this.props.body
                                    }
                                    onChange={
                                        this.props.onchange
                                    }
                                />
                            </div> */}
                        <textarea
                            name={props.name}
                            className="textarea"
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

export default TextAreaField;
