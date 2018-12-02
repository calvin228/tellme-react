import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import Name from "./form-components/Name";
import Email from "./form-components/Email";
import Password from "./form-components/Password";
import ConfirmPassword from "./form-components/ConfirmPassword";

export default class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            img_name: ""
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleImageUpload(event) {
        this.profile_img = event.target.files[0];
        this.setState({
            img_name:
                this.profile_img.size < 2000000
                    ? this.profile_img.name
                    : "File size too large"
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleRegister(event) {
        event.preventDefault();
        const { name, email, password, password_confirmation } = this.state;
        console.log(this.profile_img);
        let data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        data.append("password_confirmation", password_confirmation);
        data.append("profile_image", this.profile_img);

        axios
            .post("/api/register", data)
            .then(response => {
                this.props.history.push("/login");
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <AuthWrapper>
                <h1 className="title">Register</h1>
                <h2 className="subtitle">Create a new Account</h2>
                <div className="box">
                    <form
                        encType="multipart/form-data"
                        onSubmit={this.handleRegister}
                    >
                        <Name handleFieldChange={this.handleFieldChange} />
                        <Email handleFieldChange={this.handleFieldChange} />
                        <Password handleFieldChange={this.handleFieldChange} />
                        <ConfirmPassword handleFieldChange={this.handleFieldChange} />
                        <div className="file has-name is-boxed">
                            <label className="file-label">
                                <input
                                    className="file-input"
                                    type="file"
                                    name="profile_image"
                                    onChange={this.handleImageUpload}
                                    accept="image/*"
                                />
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <FontAwesomeIcon icon="upload" />
                                    </span>
                                    <span className="file-label">
                                        Choose a picture...
                                    </span>
                                </span>
                                <span className="file-name has-text-centered">
                                    {this.state.img_name
                                        ? this.state.img_name
                                        : "Image directory..."}
                                </span>
                            </label>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button
                                    className="button is-fullwidth is-primary"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <p>
                    You have an account?{" "}
                    <strong>
                        <Link to="/login">Login Here</Link>
                    </strong>
                </p>
            </AuthWrapper>
        );
    }
}
