import React, { Component, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            user: {}
        };
    }

    checkAuthentication() {
        if (sessionStorage.getItem("jwtToken")) {
            axios
                .get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwtToken"
                        )}`
                    }
                })
                .then(response => {
                    this.setState({
                        isAuthenticated: true,
                        user: response.data.user
                    });
                });
        }
    }
    componentDidMount() {
        this.checkAuthentication();
    }

    render() {
        return (
            <Fragment>
                <nav
                    className="navbar is-primary"
                    role="navigation"
                    aria-label="main navigation"
                >
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io" />
                        <a
                            role="button"
                            className="navbar-burger burger"
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <NavLink exact to="/" className="navbar-item">
                                Story
                            </NavLink>
                            <NavLink to="/forum" className="navbar-item">
                                Forum
                            </NavLink>
                            <a className="navbar-item">About</a>
                        </div>
                        {/* change this below when user logged in */}
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <span style={{"display":'flex'}}>
                                    <FontAwesomeIcon
                                        icon="search"
                                        size="2x"
                                        className="mg-right-2"
                                    />
                                    <div className="field">
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Search..."
                                            />
                                        </div>
                                    </div>
                                </span>
                            </div>

                            <div className="navbar-item">
                                {this.state.isAuthenticated ? (
                                    <Link
                                        to={`/profile/${this.state.user.slug}`}
                                    >
                                        <img
                                            className="img-rounded"
                                            src={`/api/image/profile/${
                                                this.state.user.profile_image
                                            }`}
                                        />
                                    </Link>
                                ) : (
                                    <div className="buttons">
                                        <a className="button is-primary">
                                            <strong>Sign up</strong>
                                        </a>
                                        <a className="button is-light">
                                            Log in
                                        </a>
                                    </div>
                                )}
                            </div>
                            {/* <div className="navbar-item">
                                
                            </div> */}
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }
}
