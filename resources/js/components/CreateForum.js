import React, { Component } from "react";
import CurrentUser from "./subcomponents/CurrentUser";
import InputField from "./subcomponents/InputField";
import TextAreaField from "./subcomponents/TextAreaField";
import ButtonCreate from "./subcomponents/ButtonCreate";

export default class CreateForum extends Component {
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
                    this.props.isActiveForum ? " is-active" : ""
                }`}
            >
                <div
                    className="modal-background"
                    onClick={this.props.toggleModal}
                />
                <div className="modal-content">
                    <div className="box">
                        {/* Create new component for this one*/}
                        <CurrentUser user={this.props.user} />
                        {/* <div class="media-right">
                        <button class="delete" />
                    </div> */}
                        <hr />
                        <form onSubmit={this.props.createForum}>
                            <InputField
                                type="text"
                                name="subject"
                                label="Subject"
                                onChange={this.props.fieldChange}
                                value={this.props.subject}
                                placeholder="What is your subject?"
                                required={true}
                            />
                            <TextAreaField 
                                label="Content"
                                name="content"
                                placeholder="Write here..."
                                onChange={this.props.fieldChange}
                                value={this.props.content}
                                required={true}
                            />
                            <ButtonCreate 
                                type="submit"
                                isLoading={this.props.isLoading}
                                name="Post Topic!"
                                color="is-secondary"
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
