import React, { Component } from "react";
import { Link } from "react-router-dom";

const ArticleContent = props => {
    return (
        <section key={props.article.slug} className="section">
            <div className="container">
                {/* This edit button only for author */}
                <Link to={`${props.pathname}/edit`} className="button is-info">
                    Edit
                </Link>
                <article className="media center">
                    <figure className="media-left">
                        <span className="image is-64x64">
                            <img
                                className="is-rounded"
                                src={`/api/image/profile/${
                                    props.article.user.profile_image
                                }`}
                            />
                        </span>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{props.article.user.name}</strong>
                                <br />
                                <span className="has-text-grey">
                                    Self-taught, inspired to learn
                                    <br />
                                    <time dateTime="2018-04-20">Apr 20</time> ·
                                    20 min read
                                </span>
                            </p>
                        </div>
                    </div>
                </article>
                <h1 className="title is-2">{props.article.title}</h1>
                <h2 className="subtitle is-4 has-text-grey-light">
                    Thank you!
                </h2>

                <div className="columns is-centered">
                    <div className="column is-half">
                        <figure className="image">
                            <img
                                src={`/api/image/cover/${
                                    props.article.cover_image
                                }`}
                            />
                        </figure>
                    </div>
                </div>
                <div className="content">{props.article.body}</div>
            </div>
        </section>
    );
};

export default class SingleArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: []
        };
    }
    componentDidMount() {
        axios
            .get(`/api/articles/${this.props.match.params.slug}`)
            .then(response => {
                this.setState({
                    article: response.data
                });
            });
    }
    render() {
        return (
            <div>
                {this.state.article.length > 0
                    ? this.state.article.map(article => {
                          return (
                              <ArticleContent
                                  article={article}
                                  pathname={this.props.location.pathname}
                              />
                          );
                      })
                    : ""}
            </div>
        );
    }
}
