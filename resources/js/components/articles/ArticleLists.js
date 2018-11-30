import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const ArticleList = props => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-3by1">
                    <img
                        src={`/api/image/cover/${props.article.cover_image}`}
                    />
                </figure>
            </div>
            <div className="card-content">
                <p className="title">
                    <NavLink
                        to={`/articles/${props.article.slug}`}
                        className="remove-default"
                    >
                        {props.article.title}
                    </NavLink>
                </p>
                <p className="subtitle">Read more ...</p>
            </div>
        </div>
    );
};

export default class ArticleLists extends Component {
    constructor() {
        super();
        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        axios.get("/api/articles").then(response => {
            this.setState({
                articles: response.data
            });
        });
    }
    render() {
        return (
            <div>
                {this.state.articles.map(article => {
                    return <ArticleList article={article} />;
                })}
            </div>
        );
    }
}
