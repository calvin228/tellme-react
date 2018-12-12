import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const ProfileListItem = ({label, content}) => {

    return (
        <div className="media remove-border-top">
            <div className="media-content padding-small-05">
                <p>
                    <strong className="has-text-primary">{label} : </strong>
                </p>
                <p>{content}</p>
            </div>
        </div>
    );
};
export default class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            currentUser: {}
        };
    }

    fetchUser(){
        axios
        .get(`/api/user/${this.props.match.params.slug}`)
        .then(response => {
            this.setState({
                user: response.data.user
            });
            document.title = this.state.user.name + " - TellMe";
        })
        .catch(error => {
            console.log(error);
        });
    }
    fetchCurrentUser(){
        axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                    "jwtToken"
                )}`
            }
        })
        .then(response => {

            this.setState({
                currentUser: response.data.user
            })
        })
    }
    componentDidMount() {
        this.fetchUser();
        this.fetchCurrentUser();    
    }

    render() {
        const { user, currentUser } = this.state;

        return (
            <Fragment>
                <Navbar hideSearch={true}/>
                <section className="section is-paddingless-horizontal">
                    <div className="container grid">
                        <div className="columns">
                            <div className="column">
                                <figure className="image is-square center">
                                    <img
                                        className="is-rounded avatar"
                                        src={
                                            user.profile_image
                                                ? `/api/image/profile/${
                                                      user.profile_image
                                                  }`
                                                : "https://bulma.io/images/placeholders/128x128.png"
                                        }
                                    />
                                </figure>
                                {currentUser.id === user.id ? <Link
                                    className="button is-primary is-fullwidth mg-top-4"
                                    to="/me/edit"
                                >
                                    Edit Profile
                                </Link> : null}
                                
                            </div>
                            <div className="column is-four-fifths">
                                <h1 className="has-text-centered is-3 title">My Profile</h1>
                                <div className="box">
                                    <ProfileListItem label="Name" content={user.name}/>
                                    <ProfileListItem label="Email" content={user.email}/>
                                    <ProfileListItem label="Short Bio" content={user.description}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}
