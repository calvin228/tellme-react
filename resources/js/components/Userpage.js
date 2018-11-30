import React, { Component } from "react";

export default class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.slug}`).then(response => {
			this.setState({
                user: response.data.user
            })
		}).catch(error => {
			console.log(error);
		})
    }

    render() {
        const { user } = this.state;
        return (
            <section className="section is-paddingless-horizontal">
                <div className="container grid">
                    <div className="columns">
                        <div className="column">
                            <figure class="image is-128x128">
                                <img
                                    className="is-rounded"
                                    src={user.profile_image ? `/api/image/profile/${user.profile_image}` : "https://bulma.io/images/placeholders/128x128.png"}
                                />
                            </figure>
                        </div>
                        <div className="column is-four-fifths">
                            <h1 className="title is-3">{user.name}</h1>
                            <h2 className="subtitle is-5 has-text-grey-light">
                                {user.description}
                            </h2>
                        </div>
                    </div>

                    <div className="content">
                        <div className="border-bottom margin-bottom">
                            <h3>Published articles</h3>
                        </div>
                        <ul className="list-group">
                            <li>
                                <a className="panel-block">
                                    How to dance like crazy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}
