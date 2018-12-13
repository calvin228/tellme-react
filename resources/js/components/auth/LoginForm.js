import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import Email from "./form-components/Email";
import Password from "./form-components/Password";
import RememberMe from "./form-components/RememberMe";
import PageTitle from "../PageTitle";

const LoginButton = props => {
    return (
        <div className="field">
            <div className="control">
                <button
                    className={`button is-fullwidth is-primary ${
                        props.isLoading ? `is-loading` : ""
                    }`}
                    type="submit"
                    disabled={props.isLoading}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember_me: false,
            redirectToReferrer: false,
            isLoading: false,
            error: ""
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleToggleLoading = this.handleToggleLoading.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleToggleLoading(){
        this.setState({
            isLoading: !this.state.isLoading
        })
    }
    handleLogin(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.handleToggleLoading()
        axios
            .post("/api/login", { email, password })
            .then(response => {
                this.handleToggleLoading()
                sessionStorage.setItem("jwtToken", response.data.token);
                window.location.replace("/");
                // this.setState({
                //     error:"",
                //     redirectToReferrer: true
                // });
                
            })
            .catch(error => {
                this.handleToggleLoading()
                if (error.response.status === 401){
                    this.setState({
                        error: "Invalid username / password!"
                    })
                }
            });
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <AuthWrapper>
                <PageTitle title="Login - TellMe"/>
                <h1 className="title">Login</h1>
                <h2 className="subtitle">Please login to proceed</h2>
                
                <div className="box">
                <p className="has-text-danger">{this.state.error}</p>    
                <br/>
                    <form onSubmit={this.handleLogin}>
                        <Email handleFieldChange={this.handleFieldChange} />
                        <Password handleFieldChange={this.handleFieldChange} />
                        {/* <RememberMe
                            value={this.state.remember_me}
                            handleFieldChange={this.state.handleFieldChange}
                        /> */}
                        <LoginButton isLoading={this.state.isLoading} />
                    </form>
                </div>

                <p>
                    Don't have account?{" "}
                    <strong>
                        <Link to="/register">Register now</Link>
                    </strong>
                </p>
                <br />
                <p>
                    <a href="/password/reset">Forgot password</a>
                </p>
            </AuthWrapper>
        );
    }
}
