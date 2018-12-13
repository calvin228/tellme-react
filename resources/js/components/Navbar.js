import React, { Component, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import logo from "../../../public/img/tellmelogo.png";

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            user: {}
        };
        this.handleLogout = this.handleLogout.bind(this);
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

    handleLogout() {
        axios
            .get("/api/logout", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                    )}`
                }
            })
            .then(() => {
                sessionStorage.removeItem("jwtToken");
                window.location.reload();
            });
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
                    <a className="navbar-item no-hover" href="/">
                        <img src={logo} width="80" height="50"/>
                    </a>
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
                            <NavLink to="/about" className="navbar-item">
                                About
                            </NavLink>
                        </div>
                        {/* change this below when user logged in */}
                        <div className="navbar-end">
                            {this.props.hideSearch ? (
                                ""
                            ) : (
                                <SearchBar
                                    handleSearchResult={
                                        this.props.handleSearchResult
                                    }
                                />
                            )}

                            {this.state.isAuthenticated ? (
                                <Fragment>
                                    <div className="navbar-item">
                                        <Link
                                            to={`/profile/${
                                                this.state.user.slug
                                            }`}
                                        >
                                            <img
                                                className="img-rounded"
                                                src={`/api/image/profile/${
                                                    this.state.user
                                                        .profile_image
                                                }`}
                                            />
                                        </Link>
                                    </div>
                                    <div
                                        className="navbar-item pointer"
                                        onClick={this.handleLogout}
                                    >
                                        <a className="has-text-white">Logout</a>
                                    </div>
                                </Fragment>
                            ) : (
                                <div className="navbar-item">
                                    <div className="buttons">
                                        <a className="button is-primary">
                                            <strong>Sign up</strong>
                                        </a>
                                        <a className="button is-light">
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }
}
