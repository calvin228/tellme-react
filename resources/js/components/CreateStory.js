import React, { Component } from "react";
import CurrentUser from "./subcomponents/CurrentUser";
import InputField from "./subcomponents/InputField";
import TextAreaField from "./subcomponents/TextAreaField";
import ButtonCreate from "./subcomponents/ButtonCreate";

export default class CreateStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        axios.get("/api/categories").then(response => {
            this.setState({
                categories: response.data
            });
        });
    }

    render() {
        return (
            <div
                className={`modal${
                    this.props.isActiveStory ? " is-active" : ""
                }`}
            >
                <div
                    className="modal-background"
                    onClick={this.props.toggleModal}
                />
                <div className="modal-content">
                    <div className="box">
                        <CurrentUser user={this.props.user} />
                        <hr />
                        <form onSubmit={this.props.createStory}>
                            <InputField
                                type="text"
                                name="title"
                                label="Title"
                                onChange={this.props.fieldChange}
                                value={this.props.title}
                                placeholder="What is your title?"
                                required={true}
                            />
                            <TextAreaField
                                label="Body"
                                name="body"
                                placeholder="Write your story here..."
                                onChange={this.props.fieldChange}
                                value={this.props.body}
                                required={true}
                            />
                            <ButtonCreate 
                                type="submit"
                                isLoading={this.props.isLoading}
                                name="Post Story!"
                                color="is-primary"
                            />
                        </form>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    onClick={this.props.toggleModal}
                    aria-label="close"
                />
            </div>
        );
    }
}
