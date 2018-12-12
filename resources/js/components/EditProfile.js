import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import InputField from "./subcomponents/InputField";
import TextAreaField from "./subcomponents/TextAreaField";
import SubmitButton from "./subcomponents/ButtonCreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = props => {
    return (
        <div
            className={`modal ${
                props.isActive ? " is-active" : ""
            } modal-fx-fadeInScale`}
        >
            <div className="modal-background" onClick={props.toggleModal} />
            <div className="modal-content">
                <div className="card is-small-radius">
                    <header className="card-header">
                        <p className="card-header-title is-centered">
                            Upload Profile Picture
                        </p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <form encType="multipart/form-data">
                                <div className="is-centered file is-boxed">
                                    <label className="file-label">
                                        <input
                                            className="file-input"
                                            type="file"
                                            name="resume"
                                            onChange={props.imageUpload}
                                            accept="image/*"
                                        />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <FontAwesomeIcon icon="upload" />
                                            </span>
                                            <span className="file-label">
                                                Choose a picture
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={props.toggleModal}
                className="modal-close is-large"
                aria-label="close"
            />
        </div>
    );
};

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            name: "",
            email: "",
            description: "",
            isLoading: false,
            isActive: false
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
        this.handleToggleLoading = this.handleToggleLoading.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleUpdateImageProfile = this.handleUpdateImageProfile.bind(this);
    }
    handleUpdateImageProfile(event) {
        this.profile_img = event.target.files[0];
        const data = new FormData();
        data.append("profile_image", this.profile_img);
        data.append("_method", "PUT");

        axios
            .post("/api/user/update/image", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(() => {
                this.fetchCurrentUserData();
                this.handleToggleModal();
            })
            .catch(error => console.log(error));
    }
    componentDidMount() {
        this.fetchCurrentUserData();
    }
    handleToggleModal() {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    handleToggleLoading() {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }
    fetchCurrentUserData() {
        axios
            .get("/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(response => {
                const { user } = response.data;
                this.setState({
                    user: user,
                    name: user.name,
                    email: user.email,
                    description: user.description
                });
            })
            .catch(error => console.log(error));
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleUpdateProfile(event) {
        event.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            description: this.state.description,
            _method: "PUT"
        };
        this.handleToggleLoading();
        axios
            .post("/api/user/update", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(() => {
                this.handleToggleLoading();
                this.props.history.push(`/profile/${this.state.user.slug}`);
            })
            .catch(error => {
                this.handleToggleLoading();
                console.log(error);
            });
    }
    render() {
        const { name, email, description } = this.state;
        return (
            <Fragment>
                <Navbar hideSearch={true}/>
                <section className="">
                    <Modal
                        toggleModal={this.handleToggleModal}
                        isActive={this.state.isActive}
                        imageUpload={this.handleUpdateImageProfile}
                    />
                    <div className="container">
                        <div className="columns">
                            <div className="column mg-top-6 is-7 is-offset-one-quarter is-centered">
                                <figure className="center image is-128x128">
                                    <img
                                        onClick={this.handleToggleModal}
                                        className="is-rounded avatar pointer"
                                        src={
                                            this.state.user.hasOwnProperty(
                                                "profile_image"
                                            )
                                                ? `/api/image/profile/${
                                                      this.state.user
                                                          .profile_image
                                                  }`
                                                : "https://bulma.io/images/placeholders/128x128.png"
                                        }
                                    />
                                </figure>

                                <div className="box mg-top-6">
                                    <h1 className="has-text-centered is-4 title">
                                        Edit Profile
                                    </h1>
                                    <form onSubmit={this.handleUpdateProfile}>
                                        <InputField
                                            type="text"
                                            name="name"
                                            label="Name"
                                            onChange={this.handleFieldChange}
                                            value={name}
                                            placeholder="Name"
                                        />
                                        <InputField
                                            type="email"
                                            name="email"
                                            label="E-mail"
                                            onChange={this.handleFieldChange}
                                            value={email}
                                            placeholder="E-mail"
                                        />
                                        <TextAreaField
                                            label="Short Bio"
                                            name="description"
                                            placeholder="What is your occupation?"
                                            onChange={this.handleFieldChange}
                                            value={description}
                                        />
                                        <SubmitButton
                                            color="is-primary"
                                            name="Save changes!"
                                            isLoading={this.state.isLoading}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}
